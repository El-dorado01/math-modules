import { ArrowBigRightDash } from "lucide-react";
import React from "react";

interface ChapterObjectivesProps {
  objectives: {
    id: number;
    text: string;
  }[];
}

const ChapterObjectives = ({ objectives }: ChapterObjectivesProps) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <h1 className="font-bold text-lg">In this chapter...</h1>
        <span>Here are the topics we&apos;ll cover</span>
      </div>
      <div className="border rounded-md bg-sidebar-accent mt-4 flex flex-col p-2">
        {objectives.map((obj, index) => (
          <div
            key={obj.id}
            className={`px-3 py-2 flex items-start justify-start font-bold ${
              index !== objectives.length - 1 ? "border-b" : ""
            }`}
          >
            <ArrowBigRightDash className="mr-2 size-5 min-w-5" />
            <span>{obj.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChapterObjectives;
