import { Button } from "@/components/ui/button";

import { Checkbox } from "@radix-ui/react-checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@radix-ui/react-dialog";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@radix-ui/react-hover-card";

import Image from "@tiptap/extension-image";
import Italic from "@tiptap/extension-italic";
import Link from "@tiptap/extension-link";
import OrderedList from "@tiptap/extension-ordered-list";
import { Table } from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import TextAlign from "@tiptap/extension-text-align";
import { Color, TextStyle } from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import { Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Code2,
  Image as ImageIcon,
  Italic as ItalicIcon,
  Link as LinkIcon,
  List,
  ListIcon,
  ListOrdered,
  Loader2,
  Merge,
  Minus,
  Palette,
  Plus,
  Quote,
  Redo,
  Split,
  TableIcon,
  Trash2,
  Underline as UnderlineIcon,
  Undo,
  X,
} from "lucide-react";
import React, {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { DialogFooter, DialogHeader } from "../ui/dialog";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

export interface RichTextEditorProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  height?: string;
  className?: string;
  placeholder?: string;
}

interface MenuButtonProps {
  onClick: () => void;
  active?: boolean;
  children: React.ReactNode;
  disabled?: boolean;
}

interface ContextMenuProps {
  x: number;
  y: number;
  editor: Editor;
  onClose: () => void;
}

interface ContextMenuItem {
  label: string;
  action: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, editor, onClose }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ left: x, top: y });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  useLayoutEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;

    const { innerWidth, innerHeight } = window;
    const rect = menu.getBoundingClientRect();

    let newLeft = x;
    let newTop = y;

    if (x + rect.width > innerWidth) {
      newLeft = innerWidth - rect.width - 10;
    }

    if (y + rect.height > innerHeight) {
      newTop = innerHeight - rect.height - 10;
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPosition({ left: newLeft, top: newTop });
  }, [x, y]);
  const menuItems: ContextMenuItem[] = [
    {
      label: "Add Row Above",
      action: () => {
        editor.chain().focus().addRowBefore().run();
        onClose();
      },
      icon: <Plus className="w-4 h-4" />,
    },
    {
      label: "Add Row Below",
      action: () => {
        editor.chain().focus().addRowAfter().run();
        onClose();
      },
      icon: <Plus className="w-4 h-4" />,
    },
    {
      label: "Delete Row",
      action: () => {
        editor.chain().focus().deleteRow().run();
        onClose();
      },
      icon: <Trash2 className="w-4 h-4" />,
      disabled: !editor.can().deleteRow(),
    },
    {
      label: "Add Column Before",
      action: () => {
        editor.chain().focus().addColumnBefore().run();
        onClose();
      },
      icon: <Plus className="w-4 h-4" />,
    },
    {
      label: "Add Column After",
      action: () => {
        editor.chain().focus().addColumnAfter().run();
        onClose();
      },
      icon: <Plus className="w-4 h-4" />,
    },
    {
      label: "Delete Column",
      action: () => {
        editor.chain().focus().deleteColumn().run();
        onClose();
      },
      icon: <Trash2 className="w-4 h-4" />,
      disabled: !editor.can().deleteColumn(),
    },
    {
      label: "Merge Cells",
      action: () => {
        editor.chain().focus().mergeCells().run();
        onClose();
      },
      icon: <Merge className="w-4 h-4" />,
      disabled: !editor.can().mergeCells(),
    },
    {
      label: "Split Cell",
      action: () => {
        editor.chain().focus().splitCell().run();
        onClose();
      },
      icon: <Split className="w-4 h-4" />,
      disabled: !editor.can().splitCell(),
    },
    {
      label: "Delete Table",
      action: () => {
        editor.chain().focus().deleteTable().run();
        onClose();
      },
      icon: <Trash2 className="w-4 h-4" />,
      disabled: !editor.can().deleteTable(),
    },
  ];

  return (
    <div
      ref={menuRef}
      className="z-50 fixed bg-white shadow-lg py-1 border border-gray-200 rounded-md min-w-48"
      style={{ left: position.left, top: position.top }}
    >
      {menuItems.map((item, index) => (
        <button
          key={index}
          onClick={item.action}
          disabled={item.disabled}
          className={`w-full text-left px-3 py-2 hover:bg-gray-100 flex items-center space-x-2 text-sm ${
            item.disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          {item.icon}
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  );
};

const MenuButton: React.FC<MenuButtonProps> = ({
  onClick,
  active,
  children,
  disabled = false,
}) => {
  return (
    <button
      tabIndex={-1}
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`p-2 rounded hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
        active ? "text-blue-600 bg-blue-50" : "text-gray-700"
      }`}
    >
      {children}
    </button>
  );
};

interface MenuBarProps {
  editor: Editor;
}

const CustomOrderedList = OrderedList.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      type: {
        default: "1",
        parseHTML: (element) => element.getAttribute("type"),
        renderHTML: (attributes) => {
          if (!attributes.type) {
            return {};
          }
          return {
            type: attributes.type,
            style: `list-style-type:${
              attributes.type == "a" ? "lower-alpha" : "decimal"
            }`,
          };
        },
      },
    };
  },
});

const LinkComponent = ({ editor }: { editor: Editor }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [otherPage, setOtherPage] = useState(false);
  const isInLink = editor.isActive("link");

  const handleOpen = () => {
    let previousUrl = "";
    // let checked = false;
    const { state } = editor;
    const { from, to } = state.selection;

    state.doc.nodesBetween(from, to, (node) => {
      if (node.marks) {
        const linkMark = node.marks.find((mark) => mark.type.name === "link");
        if (linkMark) {
          previousUrl = linkMark.attrs.href;
          // checked = linkMark.attrs._target;
          return false;
        }
      }
    });
    setUrl(previousUrl);
    setIsPopupOpen(true);
  };

  const handleSave = () => {
    if (!url) {
      setIsPopupOpen(false);
      return;
    }
    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url, target: otherPage ? "_blank" : undefined })
      .run();
    setIsPopupOpen(false);
  };

  return (
    <div>
      <Dialog open={isPopupOpen} onOpenChange={setIsPopupOpen}>
        <DialogContent popoverTarget="body" className="sm:max-w-106.25">
          <DialogHeader>
            <DialogTitle>{isInLink ? "Edit Link" : "Insert Link"}</DialogTitle>
          </DialogHeader>
          <div className="gap-4 grid">
            <Input
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              type="url"
            />
          </div>
          <label className="flex items-center gap-2">
            <Checkbox
              checked={otherPage}
              onCheckedChange={(e) => setOtherPage(!!e)}
            />
            Open in same page
          </label>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {isInLink ? (
        <HoverCard openDelay={0} closeDelay={0.6}>
          <HoverCardTrigger className="bg-blue-50 text-blue-600">
            <LinkIcon />
          </HoverCardTrigger>
          <HoverCardContent className="w-max">
            <div className="flex gap-4">
              <button type="button" onClick={handleOpen}>
                Edit
              </button>
              <button
                onClick={() => {
                  editor.chain().focus().unsetLink().run();
                }}
                type="button"
              >
                Delete
              </button>
            </div>
          </HoverCardContent>
        </HoverCard>
      ) : (
        <Button type="button" variant="ghost" size="icon" onClick={handleOpen}>
          <LinkIcon />
        </Button>
      )}
    </div>
  );
};

const MenuBar: React.FC<MenuBarProps> = ({ editor }) => {
  const uniqueId = useId();
  const [mathInput, setMathInput] = useState("");
  const [showMathInput, setShowMathInput] = useState(false);
  const [imageInsertLoading, setImageInsertLoading] = useState(false);
  const toggleOrderedListWithType = (listType: string) => {
    if (editor.isActive("orderedList", { type: listType })) {
      editor.chain().focus().toggleOrderedList().run();
      return;
    }
    if (editor.isActive("orderedList")) {
      editor
        .chain()
        .focus()
        .updateAttributes("orderedList", {
          type: listType,
        })
        .run();
    } else {
      editor.chain().focus().toggleOrderedList().run();
      setTimeout(() => {
        editor
          .chain()
          .focus()
          .updateAttributes("orderedList", {
            type: listType,
          })
          .run();
      }, 0);
    }
  };

  const colors = [
    "#000000",
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFA500",
    "#800080",
    "#FF69B4",
    "#32CD32",
    "#FFD700",
    "#8A2BE2",
  ];

  const insertMath = () => {
    if (mathInput.trim()) {
      editor.chain().focus().insertContent(`$${mathInput}$`).run();
      setMathInput("");
      setShowMathInput(false);
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });
  };

  const insertImage = async (image?: File | null) => {
    if (!image) return;
    setImageInsertLoading(true);

    try {
      editor
        .chain()
        .focus()
        .setImage({ src: await fileToBase64(image) })
        .run();
    } catch (e) {
      // console.error(e)
      alert(e || "upload failed");
    } finally {
      setImageInsertLoading(false);
    }
    // const reader = new FileReader();
    // reader.onload = () => {
    //   const base64 = reader.result as string;
    //   editor.chain().focus().setImage({ src: base64 }).run();
    //   setImageInsertLoading(false);
    // };
    // reader.readAsDataURL(image);
  };

  return (
    <div className="flex flex-wrap gap-1 bg-body p-2 border-gray-200 border-b">
      {/* Undo/Redo */}
      <div className="flex items-center space-x-1 mr-4">
        <MenuButton
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          <Undo className="w-5 h-5" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          <Redo className="w-5 h-5" />
        </MenuButton>
      </div>

      {/* Text Formatting */}
      <div className="flex items-center space-x-1 mr-4">
        <MenuButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
        >
          <Bold className="w-5 h-5" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
        >
          <ItalicIcon className="w-5 h-5" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={editor.isActive("underline")}
        >
          <UnderlineIcon className="w-5 h-5" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleCode().run()}
          active={editor.isActive("code")}
        >
          <Code className="w-5 h-5" />
        </MenuButton>
      </div>

      {/* Headings */}
      <div className="flex items-center space-x-1 mr-4">
        <select
          tabIndex={-1}
          className="px-2 py-1 border border-gray-300 rounded text-sm"
          onChange={(e) => {
            const level = parseInt(e.target.value);
            if (level === 0) {
              editor.chain().focus().setParagraph().run();
            } else {
              editor
                .chain()
                .focus()
                .toggleHeading({ level: level as 1 | 2 | 3 | 4 | 5 | 6 })
                .run();
            }
          }}
          value={
            editor.isActive("heading", { level: 1 })
              ? 1
              : editor.isActive("heading", { level: 2 })
                ? 2
                : editor.isActive("heading", { level: 3 })
                  ? 3
                  : editor.isActive("heading", { level: 4 })
                    ? 4
                    : editor.isActive("heading", { level: 5 })
                      ? 5
                      : editor.isActive("heading", { level: 6 })
                        ? 6
                        : 0
          }
        >
          <option value={0}>Normal</option>
          <option value={1}>H1</option>
          <option value={2}>H2</option>
          <option value={3}>H3</option>
          <option value={4}>H4</option>
          <option value={5}>H5</option>
          <option value={6}>H6</option>
        </select>
      </div>

      {/* Text Alignment */}
      <div className="flex items-center space-x-1 mr-4">
        <MenuButton
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          active={editor.isActive({ textAlign: "left" })}
        >
          <AlignLeft className="w-5 h-5" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          active={editor.isActive({ textAlign: "center" })}
        >
          <AlignCenter className="w-5 h-5" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          active={editor.isActive({ textAlign: "right" })}
        >
          <AlignRight className="w-5 h-5" />
        </MenuButton>
      </div>

      {/* Lists */}
      <div className="flex items-center space-x-1 mr-4">
        <MenuButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
        >
          <List className="w-5 h-5" />
        </MenuButton>
        <MenuButton
          onClick={() => toggleOrderedListWithType("1")}
          active={editor.isActive("orderedList", { type: "1" })}
        >
          <ListOrdered className="w-5 h-5" />
        </MenuButton>
        <MenuButton
          onClick={() => toggleOrderedListWithType("a")}
          active={editor.isActive("orderedList", { type: "a" })}
        >
          <ListIcon />
        </MenuButton>
      </div>

      {/* Blockquote and Code Block */}
      <div className="flex items-center space-x-1 mr-4">
        <LinkComponent editor={editor} />
        <MenuButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive("blockquote")}
        >
          <Quote className="w-5 h-5" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          active={editor.isActive("codeBlock")}
        >
          <Code2 className="w-5 h-5" />
        </MenuButton>
        <div className="group relative">
          <HoverCard openDelay={0} closeDelay={0.6}>
            <HoverCardTrigger>
              <TableIcon />
            </HoverCardTrigger>
            <HoverCardContent className="w-max">
              <InsertTableForm
                onSubmit={(data) =>
                  editor
                    .chain()
                    .focus()
                    .insertTable({ ...data, withHeaderRow: false })
                    .run()
                }
              />
            </HoverCardContent>
          </HoverCard>
        </div>
      </div>

      {/* Horizontal Rule */}
      <div className="flex items-center space-x-1 mr-4">
        <MenuButton
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <Minus className="w-5 h-5" />
        </MenuButton>
      </div>

      {/* Image */}
      <div className="flex items-center space-x-1 mr-4">
        <label className="cursor-pointer" htmlFor={`rte-image-${uniqueId}`}>
          {imageInsertLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <ImageIcon className="w-5 h-5" />
          )}

          <input
            onChange={(e) => insertImage(e?.target?.files?.[0])}
            id={`rte-image-${uniqueId}`}
            type="file"
            accept="image/*"
            disabled={imageInsertLoading}
            className="hidden"
          />
        </label>
      </div>

      {/* Color Picker */}
      <div className="group relative flex items-center space-x-1 mr-4">
        <MenuButton onClick={() => {}} active={false}>
          <Palette className="w-5 h-5" />
        </MenuButton>
        <div className="hidden top-[90%] left-0 z-50 absolute group-hover:flex flex-wrap gap-1 bg-white shadow-lg mt-1 p-2 rounded-md w-48">
          {colors.map((color) => (
            <button
              type="button"
              key={color}
              className="border-2 border-gray-200 hover:border-primary rounded-full w-6 h-6"
              style={{ backgroundColor: color }}
              onClick={() => editor.chain().focus().setColor(color).run()}
            />
          ))}
          <button
            type="button"
            className="flex justify-center items-center bg-white border-2 border-gray-200 hover:border-primary rounded-full w-6 h-6 text-xs"
            onClick={() => editor.chain().focus().unsetColor().run()}
            title="Remove color"
          >
            <X className="size-4" />
          </button>
        </div>
      </div>

      {/* Math Equation */}
      <div className="relative flex items-center space-x-1">
        <MenuButton
          onClick={() => setShowMathInput(!showMathInput)}
          active={showMathInput}
        >
          <span className="font-bold text-lg">∑</span>
        </MenuButton>
        {showMathInput && (
          <div className="top-full left-0 z-50 absolute bg-white shadow-lg mt-1 border rounded-md">
            <div className="p-3 min-w-64">
              <div className="mb-2">
                <label className="block mb-1 font-medium text-gray-700 text-sm">
                  LaTeX Math Expression:
                </label>
                <input
                  type="text"
                  value={mathInput}
                  onChange={(e) => setMathInput(e.target.value)}
                  placeholder="e.g., x^2 + y^2 = z^2"
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      insertMath();
                    }
                  }}
                  autoFocus
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowMathInput(false)}
                  className="px-3 py-1 text-gray-600 hover:text-gray-800 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={insertMath}
                  className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white text-sm"
                >
                  Insert
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const InsertTableForm: React.FC<{
  onSubmit: (data: { rows: number; cols: number }) => void;
}> = ({ onSubmit }) => {
  const [data, setData] = useState<{ rows: number; cols: number }>({
    rows: 3,
    cols: 3,
  });
  return (
    <div className="flex flex-col space-y-2 w-max">
      <div className="flex gap-6">
        <label className="flex flex-col w-min">
          <p className="w-max">Rows:</p>
          <input
            onChange={(e) =>
              setData((p) => ({ ...p, rows: Number(e.target.value) }))
            }
            value={data.rows || ""}
            className="px-0.5 w-min no-spinner"
            type="number"
            autoFocus
          />
        </label>
        <label className="flex flex-col w-max">
          Cols:
          <input
            onChange={(e) =>
              setData((p) => ({ ...p, cols: Number(e.target.value) }))
            }
            value={data.cols || ""}
            type="number"
            className="px-0.5 w-full no-spinner"
          />
        </label>
      </div>
      <Button
        onClick={() => {
          onSubmit(data);
        }}
        type="button"
        className="bg-orange-600 hover:bg-orange-700 ml-auto px-4 py-2 focus-visible:ring-orange-500 h-10 text-white"
      >
        Ok
      </Button>
    </div>
  );
};

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder,
  label,
  error,
  className,
}) => {
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const editorRef = useRef<HTMLDivElement>(null);

  const CustomItalic = Italic.extend({
    addInputRules() {
      // Return only the *-based rule, not _
      const parentRules = this.parent?.();
      if (!parentRules) return [];
      return parentRules.filter((rule) => {
        const finder = rule.find;
        if (!finder) return false;
        if (typeof finder === "function") {
          // InputRuleFinder function returns a match or null
          try {
            return Boolean(finder("*text*"));
          } catch {
            return false;
          }
        }
        // assume RegExp
        return (finder as RegExp).test("*text*");
      });
    },
  });

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        orderedList: false, // Disable the default OrderedList
        italic: false,
      }),
      CustomOrderedList,
      Underline,
      TextAlign.configure({
        types: ["paragraph", "heading"],
      }),
      TextStyle,
      Color,
      // MathExtension.configure({ evaluation: false }),
      Image,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Link.configure({
        linkOnPaste: true,
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
        protocols: ["http", "https"],
        HTMLAttributes: {
          target: "_blank",
          rel: "noopener noreferrer",
        },
      }),
      CustomItalic,
    ],
    content: placeholder,
    editorProps: {
      attributes: {
        class: "mx-auto focus:outline-none p-4",
      },
    },
    onUpdate({ editor }) {
      if (onChange) {
        onChange(editor.getHTML());
      }
    },
  });

  const handleContextMenu = useCallback(
    (e: React.MouseEvent) => {
      if (!editor) return;

      // Check if the right-click is on a table cell
      const { state } = editor;
      const { selection } = state;
      const { $from } = selection;

      // Check if cursor is inside a table
      const isInTable =
        $from.node(-1)?.type.name === "table" ||
        $from.node(-2)?.type.name === "table" ||
        $from.node(-3)?.type.name === "table";

      if (isInTable) {
        e.preventDefault();
        setContextMenu({
          x: e.clientX,
          y: e.clientY,
        });
      }
    },
    [editor],
  );

  const closeContextMenu = useCallback(() => {
    setContextMenu(null);
  }, []);

  useEffect(() => {
    if (editor && value && value == editor.getHTML()) {
      return;
    } else {
      editor?.commands.setContent(value);
    }
  }, [value, editor]);

  if (!editor) {
    return null;
  }

  return (
    <>
      {label && (
        <label className="block mb-1.5 font-medium text-gray-700 text-sm">
          {label}
        </label>
      )}
      <div
        ref={editorRef}
        // onResize={() => console.log("first")}
        className={cn(
          "p-3 border focus:border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 w-full resize-y",
          error ? "border-red-500" : "",
        )}
        onContextMenu={handleContextMenu}
      >
        <div className="bg-white/70 backdrop-blur-sm">
          {/* <div className="top-0 z-10 sticky bg-white/70 backdrop-blur-sm"> */}
          <MenuBar editor={editor} />
        </div>
        <EditorContent
          editor={editor}
          className={cn(
            "p-0 prose-td:border prose-th:border max-w-none min-h-20 prose-a:text-blue-500 prose",
            className,
          )}
        />
      </div>
      {error && <p className="mt-1 text-red-600 text-sm">{error}</p>}

      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          editor={editor}
          onClose={closeContextMenu}
        />
      )}
    </>
  );
};
export default RichTextEditor;
