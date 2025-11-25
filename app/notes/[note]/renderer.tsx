/**
 * Much of this logic was copied from https://github.com/NotionX/react-notion-x. Big thanks to @transitive_bs!
 * I've adjust the implementation a bit to work with server components and remove default styling.
 */
import { fetchNoteContent } from "./fetch";
import { Code } from "./notion-components/code";
import * as types from "notion-types";
import { type ReactNode, Fragment } from "react";
import { getPageTitle } from "notion-utils";
import { FormattedDate } from "components/formatted-date";

const GitHubIcon = () => (
  <svg viewBox="0 0 16 16" version="1.1" width="16" className="inline">
    <path
      fillRule="evenodd"
      d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"
    />
  </svg>
);

function decorateText(
  text: string,
  decorator: types.SubDecoration,
  content?: types.ExtendedRecordMap
) {
  switch (decorator[0]) {
    case "_": {
      return <span data-underline>{text}</span>;
    }
    case "a": {
      const [, link] = decorator;
      return (
        <a href={link} rel="noopener noreferrer" target="_blank">
          {text}
        </a>
      );
    }
    case "b": {
      return <b>{text}</b>;
    }
    case "c": {
      return <code>{text}</code>;
    }
    case "i": {
      return <i>{text}</i>;
    }
    case "eoi": {
      const [, blockId] = decorator;

      const externalBlock = content?.block?.[blockId]
        ?.value as types.ExternalObjectInstance;
      const { original_url, domain } = externalBlock?.format;

      switch (domain) {
        case "github.com": {
          const url = new URL(original_url);
          return (
            <a
              href={original_url}
              rel="noopener noreferrer"
              target="_blank"
              className="inline"
            >
              <GitHubIcon /> {url.pathname.substring(1)}
            </a>
          );
        }
        default: {
          console.log("Unsupported external object instance domain:", domain);
          return null;
        }
      }
      return text;
    }
    default: {
      console.log("unhandled decorator", decorator);
      return text;
    }
  }
}

function Text({
  value,
  block,
  content,
}: {
  value: types.Decoration[];
  block?: types.Block;
  content?: types.ExtendedRecordMap;
}) {
  return (
    <>
      {value.map(([text, decorations], index) => {
        if (!decorations) {
          return <Fragment key={index}>{text}</Fragment>;
        }

        return decorations.reduceRight(
          (prev, subDecoration) => decorateText(prev, subDecoration, content),
          text
        );
      })}
    </>
  );
}

function Block({
  content,
  block,
  children,
  level = 0,
}: {
  content: types.ExtendedRecordMap;
  block: types.Block;
  children: ReactNode;
  level?: number;
}) {
  switch (block.type) {
    case "page": {
      return (
        <article data-block-id={block.id}>
          <h1>{getPageTitle(content)}</h1>
          <p>
            Lasted updated:{" "}
            <FormattedDate date={new Date(block.last_edited_time)} />
          </p>
          {children}
        </article>
      );
    }
    case "header":
    case "sub_header":
    case "sub_sub_header": {
      if (!block.properties) return null;

      const isH1 = block.type === "header";
      const isH2 = block.type === "sub_header";

      const Element = isH1 ? "h1" : isH2 ? "h2" : "h3";

      return (
        <Element data-block-id={block.id}>
          <Text value={block.properties.title} block={block} />
        </Element>
      );
    }
    case "divider": {
      return <hr data-block-id={block.id} />;
    }
    case "text": {
      const Element = level === 1 ? "p" : "div";

      return (
        <Element data-block-id={block.id}>
          {block.properties?.title && (
            <Text
              value={block.properties?.title}
              block={block}
              content={content}
            />
          )}
          {children && <div data-notion-children>{children}</div>}
        </Element>
      );
    }
    case "bulleted_list":
    case "numbered_list": {
      // TODO: handle nested lists
      // TODO: each individual list item is rendered as a separate list. Track sequential list blocks and concat
      const Element = block.type === "bulleted_list" ? "ul" : "ol";
      const isTopLevel =
        block.type !== content.block[block.parent_id]?.value?.type;

      let output: React.ReactNode = null;

      if (block.content) {
        output = (
          <>
            {block.properties && (
              <li>
                <Text
                  value={block.properties.title}
                  block={block}
                  content={content}
                />
              </li>
            )}
            {children}
          </>
        );
      } else {
        output = block.properties ? (
          <li>
            <Text
              value={block.properties.title}
              block={block}
              content={content}
            />
          </li>
        ) : null;
      }

      return isTopLevel ? <Element>{output}</Element> : output;
    }
    case "code": {
      // @ts-expect-error -- Async component
      return <Code block={block} content={content} />;
    }
    default: {
      console.warn("unhandled block type:", block.type);
      return null;
    }
  }
}

async function BlockRenderer({ recordId, level = 0, blockId }) {
  const content = await fetchNoteContent(recordId);
  const id = blockId || Object.keys(content.block)[0];
  const block = content.block[id]?.value;

  if (!block) return null;

  return (
    <Block block={block} level={level} content={content}>
      {block.content?.map((contentBlockId) => (
        <BlockRenderer
          key={contentBlockId}
          blockId={contentBlockId}
          level={level + 1}
          recordId={recordId}
        />
      ))}
    </Block>
  );
}

export async function Renderer({ recordId }) {
  // @ts-expect-error - Async Component
  return <BlockRenderer recordId={recordId} />;
}
