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
        // {
        //   title: "Installation",
        //   url: "#",
        // },
        {
          title: "Modules",
          url: "/modules",
        },
      ],
    },
    {
      title: "Topics",
      url: "#",
      items: [
        {
          title: "Number Base System",
          url: `/modules/` + modifyChapterName("Number Base System"),
        },
      ],
    },
    // {
    //   title: "Advanced Topics",
    //   url: "#",
    //   items: [
    //     {
    //       title: "Components",
    //       url: "#",
    //     },
    //   ],
    // },
    {
      title: "Number Base Calculator",
      url: "#",
      items: [
        {
          title: "Number Base Calculator",
          url: "/number-base-calculator",
        },
      ],
    },
  ],
};
