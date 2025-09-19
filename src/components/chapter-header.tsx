import React from "react";

interface ChapterHeaderProps {
  id: number;
  chapter_name: string;
  title: string;
}

const ChapterHeader = ({ id, chapter_name, title }: ChapterHeaderProps) => {
  return (
    <div className="flex items-center justify-start mb-10 sticky top-0 bg-white z-10 backdrop-blur-md py-3">
      <div className="h-18 w-18 min-w-18 rounded-full flex items-center justify-center p-2 text-3xl font-extrabold mr-4 bg-sidebar-accent">
        {id}
      </div>
      <div className="flex flex-col gap-3 items-start justify-center">
        <span className="font-semibold text-lg">{title}</span>
        <span className="text-2xl font-bold">{chapter_name}</span>
      </div>
    </div>
  );
};

export default ChapterHeader;
