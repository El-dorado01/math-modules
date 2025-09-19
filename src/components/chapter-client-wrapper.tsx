// ClientChapterWrapper.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import { Title } from "@/data/modules";
import { modifyChapterName } from "@/lib/fetch-chapter";
import OnThisPage from "./on-this-page";
import ChapterContents from "./chapter-contents";
import ChapterHeader from "./chapter-header";
import ChapterObjectives from "./chapter-objectives";
import { Separator } from "./ui/separator";

interface ClientChapterWrapperProps {
  header: {
    id: number;
    chapter_name: string;
    title: string;
  };
  objectives: {
    id: number;
    text: string;
  }[];
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
  chapterName: string;
}

const ClientChapterWrapper = ({
  header,
  objectives,
  titles,
  contents,
  chapterName,
}: ClientChapterWrapperProps) => {

  return (
    <>
      <div className="flex-1 lg:flex-3/5 lg:p-2">
        {/* Chapter Header */}
        <ChapterHeader
          id={header.id}
          chapter_name={header.chapter_name}
          title={header.title}
        />

        {/* Chapter Objectives */}
        <ChapterObjectives objectives={objectives} />

        <Separator className="my-10" />
        <ChapterContents contents={contents} />
      </div>
      <OnThisPage titles={titles} />
    </>
  );
};

export default ClientChapterWrapper;
