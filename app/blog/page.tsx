import Link from "next/link";
import { Suspense } from "react";
import { FormattedDate } from "../../components/formatted-date";
import { getPostList } from "../../utilities/posts";
import { cn } from "lib/cn";

async function PostsList() {
  "use cache";
  const posts = (await getPostList()).sort(
    (a, b) => new Date(b.published).getTime() - new Date(a.published).getTime()
  );

  return (
    <>
      {posts.map((post) => (
        <div key={post.title} className={cn("block mb-6")}>
          <div className={cn("text-xs", "text-black/30", "dark:text-white/30")}>
            <FormattedDate date={post.published} />
          </div>
          <Link
            href={`/blog/${post.slug}`}
            className={cn(
              "text-xl font-semibold bg-clip-text tracking-wide hover:text-transparent hover:bg-text-gradient hover:animate-gradient bg-[size:400%_100%]"
            )}
          >
            {post.title}
          </Link>
        </div>
      ))}
    </>
  );
}

export default function BlogIndex() {
  return (
    <>
      <h1
        className={cn(
          "text-2xl mb-8 mt-0 font-normal flex gap-4 flex-row tracking-wide font-mono items-center justify-between"
        )}
      >
        <div className="flex flex-col gap-1">
          <Link
            href="/"
            className="font-normal font-sans tracking-widest inline-block text-xs uppercase text-black/30 dark:text-white/30 transition-colors hover:text-black/60 dark:hover:text-white/60"
          >
            bryce kalow/
          </Link>
          <span>Writing</span>
        </div>
      </h1>
      <PostsList />
    </>
  );
}

export const metadata = {
  title: "Posts",
};
