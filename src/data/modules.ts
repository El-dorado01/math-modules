import { formatSubscript } from "@/lib/format";

export interface Title {
  id: number;
  type: "heading-1" | "heading-2" | "heading-3" | "heading-table" | "heading-solution";
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
      table_name?: string;
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
        text: "Example 1",
      },
      {
        id: 7,
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
          { id: 4, type: "heading-table", text_content: "Table 1.1" },
          { id: 5, type: "table", table_name: "table_1.1" },
          { id: 6, type: "heading-table", text_content: "Table 1.2 Base 2" },
          { id: 7, type: "table", table_name: "table_1.2" },
          { id: 8, type: "heading-table", text_content: "Table 1.3 Base 3" },
          { id: 9, type: "table", table_name: "table_1.3" },
          { id: 10, type: "heading-1", text_content: "Example 1" },
          {
            id: 11,
            type: "text",
            text_content: `Convert 25 to a number in base 6.`,
          },
          // { id: 12, type: "image", img_path: "/chapters/solution1.png" },
          { id: 12, type: "heading-solution", text_content: "Solution" },
          { id: 13, type: "table", table_name: "table_solution_1" },
          {
            id: 14,
            type: "text",
            text_content: `The  remainders are then written down from the bottom up i.e. 41.`,
          },
          {
            id: 15,
            type: "text-solution",
            text_content: `∴ ${formatSubscript("25", "10")} = ${formatSubscript(
              "41",
              "6"
            )} `,
          },
          {
            id: 16,
            type: "text",
            text_content: `From this point on, the remainder will be replaced by R`,
          },
          { id: 17, type: "heading-1", text_content: "Example 2" },
          {
            id: 18,
            type: "text",
            text_content: `Convert ${formatSubscript("31", "10")} to base 2.`,
          },
          { id: 19, type: "heading-solution", text_content: "Solution" },
          { id: 20, type: "table", table_name: "table_solution_2" },
          {
            id: 21,
            type: "text-solution",
            text_content: `∴ ${formatSubscript(
              "31",
              "10"
            )} = ${formatSubscript("11 111", "2")} `,
          },
        ],
      },
    ],
  },
];
