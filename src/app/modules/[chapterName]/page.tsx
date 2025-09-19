import AppHeader from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import ClientChapterWrapper from "@/components/chapter-client-wrapper";
import ChapterContents from "@/components/chapter-contents";
import ChapterHeader from "@/components/chapter-header";
import ChapterObjectives from "@/components/chapter-objectives";
import MathEditor from "@/components/math-editor";
import OnThisPage from "@/components/on-this-page";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getChapterByName } from "@/lib/fetch-chapter";
import { ArrowBigRightDash, Copy, List } from "lucide-react";

interface PageProps {
  params: Promise<{
    chapterName: string;
  }>;
}

const ChapterPage = async ({ params }: PageProps) => {
  const { chapterName } = await params;

  const chapter = getChapterByName(chapterName);
  if (!chapter) {
    return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <AppHeader title="Modules" />
          <div>Chapter not found</div>
        </SidebarInset>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader title="Dashboard" />
        <div className="flex flex-col-reverse lg:flex-row flex-1 gap-8 py-8 pt-10 px-4 text-sm">
          <ClientChapterWrapper
            header={{
              id: chapter.id,
              chapter_name: chapter.chapter_name,
              title: chapter.title,
            }}
            objectives={chapter.objectives}
            titles={chapter.titles}
            contents={chapter.contents}
            chapterName={chapterName}
          />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default ChapterPage;
