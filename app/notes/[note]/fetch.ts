import { notion } from "lib/notion";
import { getPageProperty } from "notion-utils";
import { cache } from "react";

export const fetchNoteContent = cache(async function fetchNoteContent(
  recordId: string
) {
  const recordMap = await notion.getPage(recordId);

  return recordMap;
});

export const fetchNotes = cache(async function fetchNotesCollection() {
  if (!process.env.NOTION_NOTES_COLLECTION_ID) {
    return {};
  }
  const collection = await fetchNoteContent(
    process.env.NOTION_NOTES_COLLECTION_ID
  );

  const notes: Record<
    string,
    { id: string; slug: string; published: boolean }
  > = Object.fromEntries(
    Object.values(collection.block)
      .filter((e) => e.value.type === "page")
      .map(({ value }) => {
        const { id } = value;

        const slug = getPageProperty("slug", value, collection);

        return [
          slug,
          {
            id,
            slug,
            published: getPageProperty("published", value, collection),
          },
        ] as const;
      })
      .filter(([_id, { published }]) => published)
  );

  return notes;
});
