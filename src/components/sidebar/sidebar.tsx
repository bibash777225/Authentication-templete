
import { ROUTES } from "@/routes/routes";
import { ChevronDown, ChevronRight, LogOutIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { Button } from "../ui/button";
import sidebarData from "./sidebar-data";

import { useAuth } from "@/context/auth-provider";
import type { ISideBarItem } from "./sidebar.types";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const activeItemRef = useRef<HTMLAnchorElement>(null);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    logout();
    navigate(ROUTES.login);
  };

  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    {},
  );

  useEffect(() => {
    const expandParents = (items: ISideBarItem[], path: string) => {
      const expanded: Record<string, boolean> = {};

      const search = (list: ISideBarItem[], parents: string[]) => {
        for (const item of list) {
          if (item.link && path.startsWith(item.link)) {
            parents.forEach((p) => (expanded[p] = true));
          }
          if (item.children) {
            search(item.children, [...parents, item.label]);
          }
        }
      };

      search(items, []);
      return expanded;
    };

    const expandedMap = expandParents(sidebarData, pathname);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setExpandedItems(expandedMap);
  }, [pathname]);

  useEffect(() => {
    activeItemRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, []);

  const toggleItem = (label: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const renderSidebarItem = (item: ISideBarItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isActive =
      item.link &&
      (pathname === item.link || // exact match
        (pathname.startsWith(item.link + "/") &&
          pathname.split("/").length === item.link.split("/").length + 1));

    const isExpanded = expandedItems[item.label] || false;

    const baseClasses =
      "flex items-center w-full py-2 text-sm font-medium rounded-md transition ease-in-out duration-150";

    const activeClasses = "bg-amber-500 text-zinc-900";
    const inactiveClasses = "text-zinc-400 hover:bg-szinc-800 hover:text-zinc-100";

    return (
      <div key={item.label} className="w-full h-full">
        {item.link ? (
          <Link
            to={item.link}
            ref={isActive ? activeItemRef : undefined}
            className={cn(
              baseClasses,
              isActive ? activeClasses : inactiveClasses,
            )}
            style={{ paddingLeft: `${16 + level * 16}px` }}
            onClick={(e) => {
              if (hasChildren) {
                e.preventDefault();
                toggleItem(item.label);
              }
            }}
          >
            {item.icon && (
              <span className="flex items-center mr-2">{item.icon}</span>
            )}
            <span className="flex-1 capitalize">{item.label}</span>
            {hasChildren && (
              <span className="ml-auto">
                {isExpanded ? (
                  <ChevronDown size={16} />
                ) : (
                  <ChevronRight size={16} />
                )}
              </span>
            )}
          </Link>
        ) : (
          <div
            className={cn(baseClasses, inactiveClasses, "cursor-pointer")}
            style={{ paddingLeft: `${16 + level * 16}px` }}
            onClick={() => toggleItem(item.label)}
          >
            {item.icon && (
              <span className="flex items-center mr-2">{item.icon}</span>
            )}
            <span className="flex-1 capitalize">{item.label}</span>
            {hasChildren && (
              <span className="ml-auto">
                {isExpanded ? (
                  <ChevronDown size={16} />
                ) : (
                  <ChevronRight size={16} />
                )}
              </span>
            )}
          </div>
        )}

        {hasChildren && isExpanded && (
          <div className="space-y-1 mt-1 ml-2 border-zinc-700 border-l">
            {item.children?.map((child) => renderSidebarItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <nav className="hidden lg:block z-30 bg-stone-900 px-5 py-2.5 w-67.5 h-full overflow-y-auto">
      <div className="flex flex-col gap-y-2 py-2 pr-1">
        {/* shows menu only when user can get some route */}
        {sidebarData.map((item) => renderSidebarItem(item))}

        {/* <ConfirmationModal
        title="Are you sure you want to Logout?"
        onConfirm={handleLogout}
      > */}
        <Button
          onClick={handleLogout}
          className="bg-zinc-800 text-zinc-400 hover:bg-red-500 hover:text-white text-left"
          variant={"ghost"}
        >
          Logout <LogOutIcon />
        </Button>
        {/* </ConfirmationModal> */}
      </div>
    </nav>
  );
};

export default Sidebar;
