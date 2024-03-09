export interface Book {
  id: number;
  title: string;
  author: string;
  publishedYear: number;
  genre: string;
  ISBN: string;
  pageCount: number;
  language: string;
  publisher?: string;
  summary?: string;
  image?: string;
  link?: string;
}
