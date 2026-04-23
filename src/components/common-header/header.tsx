import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { format, isAfter, isBefore, isFuture } from "date-fns";



import { Button } from "../ui/button";
import { CalendarIcon, ChevronDown, Plus, SearchIcon } from "lucide-react";
import { Link } from "react-router";
import { cn } from "@/lib/utils";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group";
import { Kbd } from "../ui/kbd";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";


type HeaderContextType = {
  title?: string;
};

const HeaderContext = createContext<HeaderContextType>({});

interface PageHeaderProps {
  title?: string;
  children?: ReactNode;
}

const PageHeader = ({ title, children }: PageHeaderProps) => {
  return (
    <HeaderContext.Provider value={{ title }}>
      <div className="flex sm:flex-row flex-col justify-between sm:items-center gap-2 mt-2 mb-4 w-full font-poppins">
        {children}
      </div>
    </HeaderContext.Provider>
  );
};

// Subcomponents

const Title = () => {
  const { title } = useContext(HeaderContext);
  if (!title) return null;
  return <h1 className="w-full font-semibold text-lg">{title}</h1>;
};

const Search = ({
  placeholder = "Search",
  onChange,
}: {
  placeholder?: string;
  onChange?: (value: string) => void;
}) => {
  const [active, setIsActive] = useState(false);
  return (
    <InputGroup
      data-active={active}
      className="relative ml-auto sm:data-[active=true]:max-w-64 sm:max-w-30 transition-all"
    >
      <InputGroupInput
        type="search"
        placeholder={placeholder || "Search.."}
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
        onChange={(e) => onChange?.(e.target.value)}
      />
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
    </InputGroup>
  );
};

const Action = ({ children }: { children: ReactNode }) => {
  return <div className="flex items-center gap-2">{children}</div>;
};

interface AddNewProps extends Omit<
  React.ComponentProps<typeof Button>,
  "onClick"
> {
  link?: string;
  onClick?: () => void;
  options?: ({
    label: string;
    icon?: React.ReactNode;
  } & ({ link: string } | { onClick: () => void }))[];
}

const AddNew: React.FC<AddNewProps> = ({
  children,
  className,
  link,
  onClick,
  options,
  ...props
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Shortcut key "N"
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target !== document.body) return;
      if (
        e.key.toLowerCase() === "n" &&
        !e.ctrlKey &&
        !e.altKey &&
        !e.metaKey
      ) {
        e.preventDefault();
        buttonRef.current?.click();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const ButtonContent = (
    <div className="flex items-center gap-1">
      <Plus />
      <span>{children || "Add New"}</span>
      <Kbd className="hidden lg:block bg-amber-50/30 text-white">N</Kbd>
    </div>
  );

  const BaseButton = link ? (
    <Link to={link}>
      <Button
        ref={buttonRef}
        className={cn("flex items-center rounded-r-none", className)}
        // variant=""
        {...props}
      >
        {ButtonContent}
      </Button>
    </Link>
  ) : (
    <Button
      ref={buttonRef}
      onClick={onClick}
      className={cn("flex items-center rounded-r-none", className)}
      // variant="destructive"
      {...props}
    >
      {ButtonContent}
    </Button>
  );

  if (!options || options.length === 0) {
    // No options - show regular button with rounded corners
    return link ? (
      <Link to={link}>
        <Button
          ref={buttonRef}
          className={cn("flex items-center", className)}
          // variant="destructive"
          {...props}
        >
          {ButtonContent}
        </Button>
      </Link>
    ) : (
      <Button
        ref={buttonRef}
        onClick={onClick}
        className={cn("flex items-center", className)}
        // variant="destructive"
        {...props}
      >
        {ButtonContent}
      </Button>
    );
  }

  return (
    <div className="flex items-center">
      {BaseButton}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="destructive"
            className={cn(
              "px-2 border-white/20 border-l rounded-l-none",
              className,
            )}
          >
            <ChevronDown className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {options.map((opt, idx) => {
            if ("link" in opt) {
              return (
                <DropdownMenuItem asChild key={idx}>
                  <Link to={opt.link} className="flex items-center gap-2">
                    {opt.icon && <span>{opt.icon}</span>}
                    {opt.label}
                  </Link>
                </DropdownMenuItem>
              );
            } else {
              return (
                <DropdownMenuItem
                  key={idx}
                  onSelect={opt.onClick}
                  className="flex items-center gap-2"
                >
                  {opt.icon && <span>{opt.icon}</span>}
                  {opt.label}
                </DropdownMenuItem>
              );
            }
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const DateRange = ({
  value,
  onChange,
}: {
  value?: { startDate?: string; endDate?: string };
  onChange?: (dateRange?: { startDate?: string; endDate?: string }) => void;
}) => {
  const [dateRange, setDateRange] = useState<{
    startDate?: Date;
    endDate?: Date;
  }>({ startDate: undefined, endDate: undefined });
  const hasFilters = Boolean(dateRange.startDate || dateRange.endDate);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (value)
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDateRange((d) => ({
        startDate: value?.startDate ? new Date(value.startDate) : d.startDate,
        endDate: value.endDate ? new Date(value.endDate) : d.endDate,
      }));
  }, [value]);

  const handleSubmit = () => {
    onChange?.({
      startDate:
        dateRange.startDate && format(dateRange.startDate, "yyyy-MM-dd"),
      endDate: dateRange.endDate && format(dateRange.endDate, "yyyy-MM-dd"),
    });
    setOpen(false);
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="inline-block" asChild>
        <Button className="relative" variant={"ghost"}>
          <CalendarIcon />
          {hasFilters && (
            <div className="top-1 right-1 absolute bg-primary rounded-full size-2 animate-pulse" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="lg:mr-4 lg:w-max h-full overflow-x-auto">
        {/* Mobile devices */}
        <div className="lg:hidden">
          <Calendar
            mode="range"
            captionLayout="dropdown"
            defaultMonth={dateRange?.endDate}
            selected={{ from: dateRange.startDate, to: dateRange.endDate }}
            onSelect={(d) =>
              setDateRange((p) => ({
                ...p,
                startDate: d?.from,
                endDate: d?.to,
              }))
            }
            numberOfMonths={1}
          />
          <div className="flex justify-end gap-2 pt-3">
            {hasFilters && (
              <Button variant={"ghost"} onClick={handleSubmit}>
                Clear
              </Button>
            )}
            <Button
              disabled={!dateRange.startDate && !dateRange.endDate}
              onClick={() => {
                onChange?.({
                  startDate: dateRange.startDate?.toISOString().split("T")[0],
                  endDate: dateRange.endDate?.toISOString().split("T")[0],
                });
                setOpen(false);
              }}
            >
              OK
            </Button>
          </div>
        </div>
        {/* bigger Screens */}
        <div className="hidden lg:block">
          <div className="flex justify-center items-center gap-2 mb-2 text-sm">
            {dateRange.startDate && (
              <div className="px-3 py-1 border rounded-sm">
                {format(dateRange.startDate, "yyyy / MM / dd")}
              </div>
            )}
            {dateRange.startDate && (
              <>
                -
                <div className="px-3 py-1 border rounded-sm">
                  {format(dateRange.endDate || new Date(), "yyyy / MM / dd")}
                </div>
              </>
            )}
          </div>
          <div className="flex lg:flex-row flex-col lg:divide-x">
            <div>
              <p className="pb-2 pl-2 border-b"> From:</p>
              <Calendar
                mode="single"
                // defaultMonth={dateRange?.from}
                selected={dateRange.startDate}
                onSelect={(d) => setDateRange((p) => ({ ...p, startDate: d }))}
                captionLayout="dropdown"
                modifiers={{
                  range_start: dateRange.startDate,
                  range_middle: {
                    from: dateRange.startDate,
                    to: dateRange.endDate,
                  },
                  range_end: dateRange.endDate,
                  selected: dateRange.startDate,
                }}
                numberOfMonths={1}
                disabled={(d) =>
                  dateRange.endDate ? isBefore(dateRange.endDate, d) : false
                }
                className=""
                showOutsideDays={false}
              />
            </div>
            <div>
              <p className="pb-2 pl-2 border-b"> To:</p>
              <Calendar
                mode="single"
                selected={dateRange.endDate}
                onSelect={(d) =>
                  setDateRange((p) => ({
                    ...p,
                    endDate: d,
                  }))
                }
                modifiers={{
                  range_start: dateRange.endDate,
                  range_middle: {
                    from: dateRange.startDate,
                    to: dateRange.endDate,
                  },
                  range_end: dateRange.endDate,
                  selected: dateRange.endDate,
                }}
                captionLayout="dropdown"
                numberOfMonths={1}
                disabled={(d) =>
                  dateRange.startDate
                    ? isAfter(dateRange.startDate, d) || isFuture(d)
                    : false
                }
                className=""
                showOutsideDays={false}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-3">
            {hasFilters && (
              <Button
                variant={"ghost"}
                onClick={() => {
                  onChange?.({
                    startDate: undefined,
                    endDate: undefined,
                  });
                  setDateRange({ startDate: undefined, endDate: undefined });
                  setOpen(false);
                }}
              >
                Clear
              </Button>
            )}
            <Button
              disabled={!dateRange.startDate && !dateRange.endDate}
              onClick={handleSubmit}
            >
              OK
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
PageHeader.AddNew = AddNew;
PageHeader.Title = Title;
PageHeader.Search = Search;
PageHeader.Action = Action;
PageHeader.DateRange = DateRange;

export default PageHeader;
