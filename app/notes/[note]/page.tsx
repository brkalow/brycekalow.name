import { notFound } from "next/navigation";
import { getPageTitle } from "notion-utils";
import { Suspense } from "react";
import { fetchNoteContent, fetchNotes } from "./fetch";
import { Renderer } from "./renderer";

export async function generateMetadata({ params }) {
  if (!process.env.NOTION_NOTES_COLLECTION_ID) {
    return { title: "Notes" };
  }
  const { note: noteSlug } = await params;
  const notesMap = await fetchNotes();
  const note = notesMap[noteSlug];
  if (!note) {
    return { title: "Note not found" };
  }
  const content = await fetchNoteContent(note.id);

  return {
    title: `Note: ${getPageTitle(content)}`,
  };
}

export async function generateStaticParams(): Promise<{ note: string }[]> {
  if (!process.env.NOTION_NOTES_COLLECTION_ID) {
    return [{ note: "_placeholder" }];
  }
  const notesMap = await fetchNotes();

  return Object.values(notesMap).map(({ slug }) => ({ note: slug }));
}

async function NoteContent({ noteSlug }: { noteSlug: string }) {
  const notesMap = await fetchNotes();
  const note = notesMap[noteSlug];

  if (!note) {
    notFound();
  }

  return <Renderer recordId={note.id} />;
}

export default async function NotesPage({ params }) {
  const { note: noteSlug } = await params;

  return (
    <section data-post>
      <Suspense fallback={<div>Loading...</div>}>
        <NoteContent noteSlug={noteSlug} />
      </Suspense>
    </section>
  );
}
