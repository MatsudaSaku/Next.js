import { Article } from "./types";

export const fetchArticles = async (): Promise<Article[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/home`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch articles");
  }

  const data = await response.json();
  return data.articles;
};
