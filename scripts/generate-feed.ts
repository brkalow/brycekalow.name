import { Feed } from "feed";
import path from "node:path";
import fs from "node:fs";
import { getPostList } from "../utilities/posts";

async function main() {
  const feed = new Feed({
    title: "Bryce Kalow",
    description: "Bryce's personal blog",
    id: "https://brycekalow.name",
    link: "https://brycekalow.name",
    feedLinks: {
      atom: "https://brycekalow.name/feed.xml",
    },
    copyright: "All rights reserved 2025, Bryce Kalow",
  });

  const posts = await getPostList();

  for (const post of posts) {
    feed.addItem({
      title: post.title,
      link: `https://brycekalow.name/blog/${post.slug}`,
      date: new Date(post.published),
      description: post.description,
    });
  }

  await fs.promises.writeFile(
    path.join(process.cwd(), "public", "feed.xml"),
    feed.rss2()
  );
}

main();
