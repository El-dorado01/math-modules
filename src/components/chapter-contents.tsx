// ChapterContents.tsx
import { Copy } from "lucide-react";
import Image from "next/image";
import React, { RefObject } from "react";

interface ChapterContentsProps {
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

const ChapterContents = ({ contents }: ChapterContentsProps) => {
  return contents.map((content, index) => (
    <div
      key={content.id}
      id={`content-section-${content.id}`} // Add ID for debugging
      className="flex flex-col items-start justify-center gap-2 min-h-[200px]" // Add min height
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
          <h1 key={body.id} className="font-bold text-xl mb-5">
            {body.text_content}
          </h1>
        ) : body.type === "image" ? (
          <Image
            key={body.id}
            src={body.img_path!}
            alt="Chapter Content Image"
            width={300}
            height={300}
            className="my-1 w-full md:max-w-[500px] rounded-md"
          />
        ) : null
      )}
    </div>
  ));
};

export default ChapterContents;
