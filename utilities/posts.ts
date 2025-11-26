import fs from "fs";
import path from "path";
import grayMatter from "gray-matter";

interface PostWithMetadata {
  slug: string;
  title: string;
  published: string;
  description: string;
}

export async function readPostFromFile(
  filename: string
): Promise<PostWithMetadata> {
  "use cache";
  const contents = await fs.promises.readFile(
    path.join(process.cwd(), "content", filename),
    "utf-8"
  );
  return {
    slug: filename.split(".")[0],
    ...grayMatter(contents).data,
  } as PostWithMetadata;
}

export async function getPosts(): Promise<string[]> {
  "use cache";
  return (
    await fs.promises.readdir(path.join(process.cwd(), "content"), {
      withFileTypes: true,
    })
  )
    .filter((ent) => ent.isFile() && ent.name.endsWith(".mdx"))
    .map((ent) => ent.name);
}

export async function getPostList(): Promise<PostWithMetadata[]> {
  "use cache";
  const posts = await getPosts();

  return await Promise.all(posts.map(async (post) => readPostFromFile(post)));
}
