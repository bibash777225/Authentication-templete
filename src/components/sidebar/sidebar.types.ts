export interface ISideBarItem {
  icon?: React.ReactElement | string;
  label: string;
  link?: string;
  children?: ISideBarItem[];
}

export type SidebarData = ISideBarItem[];
