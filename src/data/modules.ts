export interface Title {
  id: number;
  type: "heading-1" | "heading-2" | "heading-3";
  text: string;
}

export interface ModuleChapters {
  id: number;
  chapter_name: string;
  title: string;
  objectives: { id: number; text: string }[];
  titles: Title[];
  contents: {
    id: number;
    title: string;
    body: {
      id: number;
      type: string;
      text_content?: string;
      img_path?: string;
    }[];
  }[];
}

export const moduleChapters: ModuleChapters[] = [
  {
    id: 1,
    chapter_name: "Number Base System",
    title: "Chapter 1",
    objectives: [
      { id: 1, text: "Convert numbers in base 10 to other bases." },
      { id: 2, text: "Convert numbers in other bases to base 10." },
      { id: 3, text: "Convert decimal fractions in other bases to base 10" },
      {
        id: 4,
        text: "Carry out operations involving addition, subtraction, multiplication and division of numbers in different number bases.",
      },
      {
        id: 5,
        text: "Solve equations involving number base system.",
      },
      {
        id: 6,
        text: "Apply the processes of the number base system in computer programming.",
      },
    ],
    titles: [
      {
        id: 1,
        type: "heading-1",
        text: "Conversion of numbers in base 10 to other bases",
      },
      {
        id: 2,
        type: "heading-2",
        text: "Activity 1.1",
      },
      {
        id: 3,
        type: "heading-3",
        text: "Table 1.1",
      },
      {
        id: 4,
        type: "heading-3",
        text: "Table 1.2",
      },
      {
        id: 5,
        type: "heading-3",
        text: "Table 1.3",
      },
      {
        id: 6,
        type: "heading-3",
        text: "Table 1.4",
      },
      {
        id: 7,
        type: "heading-3",
        text: "Example 1",
      },
      {
        id: 8,
        type: "heading-3",
        text: "Example 2",
      },
    ],
    contents: [
      {
        id: 1,
        title: "Conversion of numbers in base 10 to other bases",
        body: [
          {
            id: 1,
            type: "text",
            text_content:
              "A number base operation is an operation carried out in numerals other than base 10 (the decimal system). The different bases have specific digits.",
          },
          { id: 2, type: "heading-2", text_content: "Activity 1.1" },
          {
            id: 3,
            type: "text",
            text_content:
              "Consider arranging some balls in groups of say 3, 5, 6 and 8, as shown overleaf in Table 1.1.",
          },
          { id: 4, type: "image", img_path: "/chapters/table1.1.png" },
          { id: 5, type: "image", img_path: "/chapters/table1.2.png" },
          { id: 6, type: "image", img_path: "/chapters/table1.3.png" },
          { id: 7, type: "image", img_path: "/chapters/table1.4.png" },
          { id: 8, type: "heading-1", text_content: "Example 1" },
          {
            id: 9,
            type: "text",
            text_content: `
             The  remainders are then written down from the bottom up as indicated by the arrows i.e. 41.`,
          },
        ],
      },
    ],
  },
];
