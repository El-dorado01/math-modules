import { modifyChapterName } from "@/lib/fetch-chapter";

interface SidebarItem {
  title: string;
  url: string;
  items?: SidebarItem[];
}

export interface NavbarItem {
  navMain: SidebarItem[];
}

export const sidebarData: NavbarItem = {
  navMain: [
    {
      title: "Getting Started",
      url: "#",
      items: [
        {
          title: "Installation",
          url: "#",
        },
        {
          title: "Modules",
          url: "/modules",
        },
      ],
    },
    {
      title: "Basic Topics",
      url: "#",
      items: [
        {
          title: "Number Base System",
          url: `/modules/` + modifyChapterName("Number Base System"),
        },
        {
          title: "Data Fetching",
          url: "#",
        },
      ],
    },
    {
      title: "Advanced Topics",
      url: "#",
      items: [
        {
          title: "Components",
          url: "#",
        },
      ],
    },
    {
      title: "Exercises",
      url: "#",
      items: [
        {
          title: "Accessibility",
          url: "#",
        },
      ],
    },
  ],
};
