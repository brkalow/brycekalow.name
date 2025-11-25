import { ExtendedRecordMap, type CodeBlock } from "notion-types";
import { getBlockTitle } from "notion-utils";
import { Theme } from "rehype-pretty-code";

import { addClassToHast, codeToHtml } from "shiki";

const SHIKI_THEMES: Record<string, Theme> = {
  dark: "vitesse-black",
  light: "vitesse-light",
};

async function ShikijiCode({
  code,
  language,
  theme,
}: {
  code: string;
  theme: Record<string, Theme>;
  language: string;
}) {
  let results: string[] = [];

  for (const [mode, themeValue] of Object.entries(theme)) {
    const html = await codeToHtml(code, {
      theme: themeValue,
      lang: language,
      transformers: [
        {
          code(node) {
            addClassToHast(node, language);
            node.properties["data-theme"] = mode;
            node.properties["data-language"] = language;
          },
          pre(node) {
            addClassToHast(node, language);
            node.properties["data-theme"] = mode;
            node.properties["data-language"] = language;
          },
          line(node) {
            if (node.children.length === 0) {
              node.children = [{ type: "text", value: " " }];
            }
          },
        },
      ],
    });

    results.push(html);
  }

  return <div dangerouslySetInnerHTML={{ __html: results.join("") }} />;
}

export async function Code({
  block,
  content,
  defaultLang = "typescript",
}: {
  recordId: string;
  block: CodeBlock;
  content?: ExtendedRecordMap;
  defaultLang?: string;
}) {
  // @ts-expect-error -- content may be undefined, that's okay if block is not a collection view
  const codeSource = getBlockTitle(block, content);
  let language = (
    block.properties?.language?.[0]?.[0] || defaultLang
  ).toLowerCase();

  // Ensure that JSX is properly highlighted
  if (language === "typescript") {
    language = "tsx";
  }

  return (
    <ShikijiCode code={codeSource} theme={SHIKI_THEMES} language={language} />
  );
}
