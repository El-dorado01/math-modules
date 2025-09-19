// OnThisPage.tsx
import { Title } from "@/data/modules";
import { List } from "lucide-react";
import React from "react";
import { modifyChapterName } from "@/lib/fetch-chapter";
import { ScrollArea } from "./ui/scroll-area";

interface OnThisPageProps {
  titles: Title[];
}

const OnThisPage = ({ titles }: OnThisPageProps) => {
  return (
    <div className="flex-1 lg:flex-1/4">
      <div className="lg:sticky lg:top-0 flex flex-col items-start justify-center py-3">
        <div className="flex items-center justify-start mb-3">
          <List className="mr-2 size-5" />
          <span>On This Page</span>
        </div>
        <ScrollArea className="h-[calc(100vh-4rem)] md:h-auto">
          <div className="border-l py-1">
            {titles.map((title) => (
              <div
                key={title.id}
                className={`border-l-2 px-3 py-2`}
              >
                {title.text}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default OnThisPage;
