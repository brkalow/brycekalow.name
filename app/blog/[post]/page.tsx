import fs from "fs";
import path from "path";
import dynamic from "next/dynamic";
import { compileMDX, MDXRemoteProps } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import { getPosts, readPostFromFile } from "../../../utilities/posts";
import Link from "next/link";
import { FormattedDate } from "../../../components/formatted-date";
import { Metadata } from "next";
import { cn } from "lib/cn";

const MDX_COMPONENTS = {
  Console: dynamic(() => import("../../../components/console")),
};

const mdxRemoteOptions: MDXRemoteProps["options"] = {
  mdxOptions: {
    rehypePlugins: [
      [
        // @ts-ignore
        rehypePrettyCode,
        {
          theme: { dark: "vitesse-black", light: "vitesse-light" },
          keepBackground: false,
          // Callback hooks to add custom logic to nodes when visiting them.
          onVisitLine(node) {
            // Prevent lines from collapsing in `display: grid` mode, and
            // allow empty lines to be copy/pasted
            if (node.children.length === 0) {
              node.children = [{ type: "text", value: " " }];
            }
          },
        },
      ],
    ],
  },
  parseFrontmatter: true,
};

export async function generateStaticParams() {
  return (await getPosts()).map((ent) => ({
    post: ent.name.split(".")[0],
  }));
}

export async function generateMetadata({ params }): Promise<Metadata> {
  const { post: postSlug } = await params;
  const post = await readPostFromFile(`${postSlug}.mdx`);

  return {
    title: post.title,
    description: post.description,
  };
}

async function PostContent({ postSlug }: { postSlug: string }) {
  const rawMDX = await fs.promises.readFile(
    path.join(process.cwd(), "content", `${postSlug}.mdx`),
    "utf-8"
  );

  const { content, frontmatter } = await compileMDX<{
    title?: string;
    published?: string;
  }>({
    source: rawMDX,
    options: mdxRemoteOptions,
    components: MDX_COMPONENTS,
  });

  return (
    <>
      <header className="mb-8">
        <h1
          className={cn(
            "text-2xl mt-0 font-normal flex gap-4 flex-row tracking-wide font-mono items-center justify-between"
          )}
        >
          <div className="flex flex-col gap-1">
            <Link
              href="/blog"
              className="font-normal font-sans tracking-widest inline-block text-xs uppercase text-black/30 dark:text-white/30 transition-colors hover:text-black/60 dark:hover:text-white/60"
            >
              writing/
            </Link>
            <span className="font-semibold">{frontmatter?.title}</span>
          </div>
        </h1>
        <p
          className={cn("text-xs mt-3", "text-black/30", "dark:text-white/30")}
        >
          <FormattedDate date={frontmatter?.published} />
        </p>
      </header>
      <section data-post>{content}</section>
      <div className="mt-12">
        <Link
          href="/blog"
          className="text-sm text-black/40 dark:text-white/40 transition-colors hover:text-black/60 dark:hover:text-white/60"
        >
          ← Back to posts
        </Link>
      </div>
    </>
  );
}

export default async function Post({ params }) {
  "use cache";
  const { post: postSlug } = await params;

  return <PostContent postSlug={postSlug} />;
}
