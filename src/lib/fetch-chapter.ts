interface IsActiveProps {
  activeUrl: string | string[];
  items: {
    title: string;
    url: string;
  }[];
}
import { moduleChapters, ModuleChapters } from "@/data/modules";

const chapters: ModuleChapters[] = moduleChapters;

export function getChapterByName(
  chapterName: string
): ModuleChapters | undefined {
  // Revert the chapterName back to its original format
  const originalChapterName = chapterName
    .split("-") // Split by hyphen
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
    .join(" "); // Join the words with a space

  // Find the chapter using the reverted chapterName
  return chapters.find(
    (chapter) => chapter.chapter_name === originalChapterName
  );
}

export function getAllModules(): {
  id: number;
  chapter_name: string;
  title: string;
  modified_chapter_name: string;
}[] {
  return moduleChapters.map(({ id, chapter_name, title }) => ({
    id,
    chapter_name,
    title,
    modified_chapter_name: chapter_name.toLowerCase().replace(/\s+/g, "-"),
  }));
}

export function modifyChapterName(chapter_name: string): string {
  return chapter_name.toLowerCase().replace(/\s+/g, "-");
}

export function isActive({ activeUrl, items }: IsActiveProps): string {
  for (const item of items) {
    if (item.title && modifyChapterName(item.title) === activeUrl) {
      return modifyChapterName(item.title);
    }
  }
  return "";
}
