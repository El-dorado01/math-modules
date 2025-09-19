// @/types/chapter.ts
export interface Chapter {
  id: number;
  chapter_name: string;
  title: string;
  objectives: {
    id: number;
    text: string;
  }[];
  titles: {
    id: number;
    type: string;
    text: string;
  }[];
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

export interface Title {
  id: number;
  type: string;
  text: string;
}
