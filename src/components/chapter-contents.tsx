import { Copy } from "lucide-react";
import Image from "next/image";
import React, { RefObject } from "react";
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
}

const ChapterContents = ({ contents }: ChapterContentsProps) => {
  return contents.map((content, index) => (
    <div
      key={content.id}
      id={`content-section-${content.id}`} // Add ID for debugging
      className="flex flex-col items-start justify-center gap-2 min-h-[200px] w-full" // Keep w-full for full width
    >
      <h1 className="font-bold text-xl mb-5">{content.title}</h1>
      {content.body.map((body) =>
        body.type === "text" ? (
          <div key={body.id}>{body.text_content}</div>
        ) : body.type === "heading-2" ? (
          <h2 key={body.id} className="font-bold my-3">
            {body.text_content}
          </h2>
        ) : body.type === "heading-1" ? (
          <h1 key={body.id} className="font-bold text-xl my-5">
            {body.text_content}
          </h1>
        ) : body.type === "heading-table" ? (
          <h2 key={body.id} className="font-bold bg-blue-100 my-3 w-full p-2">
            {body.text_content}
          </h2>
        ) : body.type === "heading-solution" ? (
          <h2 key={body.id} className="font-bold bg-pink-100 my-3 w-full p-2">
            {body.text_content}
          </h2>
        ) : body.type === "text-solution" ? (
          <div key={body.id} className="pl-5 font-medium">
            {body.text_content}
          </div>
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
            key={body.id}
            src={body.img_path!}
            alt="Chapter Content Image"
            width={300}
            height={300}
            className="my-1 w-full md:max-w-[500px] rounded-md border border-red-500"
          />
        ) : null
      )}
    </div>
  ));
};

export default ChapterContents;
