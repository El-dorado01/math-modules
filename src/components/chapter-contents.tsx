
import { Lightbulb } from "lucide-react";
import Image from "next/image";
import React from "react";
import Table1 from "./table_1.1";
import Table2 from "./table_1.2";
import Table3 from "./table_1.3";
import { TableSolution1, TableSolution2 } from "./table_solutions";

interface ChapterContentsProps {
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
  titles: Title[]; // Add titles prop to map body elements to title IDs
}

interface Title {
  id: number;
  type:
    | "heading-1"
    | "heading-2"
    | "heading-3"
    | "heading-table"
    | "heading-solution";
  text: string;
}

const ChapterContents = ({ contents, titles }: ChapterContentsProps) => {
  // Create a mapping of body IDs to title IDs based on text_content or table_name
  const getTitleIdForBody = (body: {
    id: number;
    type: string;
    text_content?: string;
    table_name?: string;
  }) => {
    const matchingTitle = titles.find((title) => {
      if (body.type.includes("heading") && body.text_content) {
        return title.text === body.text_content;
      }
      if (body.type === "table" && body.table_name) {
        return (
          title.text ===
          body.table_name.replace("table_", "Table ").replace("_", ".")
        );
      }
      return false;
    });
    return matchingTitle ? matchingTitle.id : null;
  };

  return contents.map((content) => (
    <div
      key={content.id}
      id={`content-section-${content.id}`}
      className="flex flex-col items-start justify-center gap-2 min-h-[200px] w-full"
    >
      <h1 className="font-bold text-xl mb-5">{content.title}</h1>
      {content.body.map((body) => {
        const titleId = getTitleIdForBody(body);
        return (
          <div
            key={body.id}
            id={titleId ? `subsection-${titleId}` : undefined}
            className={`w-full ${titleId ? "scroll-mt-16" : ""}`} // Add margin for smooth scrolling
          >
            {body.type === "text" ? (
              <div className="text-[16px]">{body.text_content}</div>
            ) : body.type === "heading-2" ? (
              <h2 className="font-bold my-3">{body.text_content}</h2>
            ) : body.type === "heading-1" ? (
              <h1 className="font-bold text-xl my-5">{body.text_content}</h1>
            ) : body.type === "heading-table" ? (
              <h2 className="font-bold bg-blue-100 my-3 w-full p-2">
                {body.text_content}
              </h2>
            ) : body.type === "heading-solution" ? (
              <div className="font-bold bg-pink-100 my-3 w-full p-2 flex items-center justify-start">
                <Lightbulb className="mr-2 size-5" />
                <h2>{body.text_content}</h2>
              </div>
            ) : body.type === "text-solution" ? (
              <div className="pl-5 font-medium">{body.text_content}</div>
            ) : body.type === "table" ? (
              <div className="w-full overflow-x-auto max-w-[600px] p-3 border rounded-md my-3">
                {body.table_name === "table_1.1" ? (
                  <Table1 />
                ) : body.table_name === "table_1.2" ? (
                  <Table2 />
                ) : body.table_name === "table_1.3" ? (
                  <Table3 />
                ) : body.table_name === "table_solution_1" ? (
                  <TableSolution1 />
                ) : body.table_name === "table_solution_2" ? (
                  <TableSolution2 />
                ) : null}
              </div>
            ) : body.type === "image" ? (
              <Image
                src={body.img_path!}
                alt="Chapter Content Image"
                width={300}
                height={300}
                className="my-1 w-full md:max-w-[500px] rounded-md border border-red-500"
              />
            ) : null}
          </div>
        );
      })}
    </div>
  ));
};

export default ChapterContents;
