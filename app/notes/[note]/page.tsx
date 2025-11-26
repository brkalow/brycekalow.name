import { notFound } from "next/navigation";
import { getPageTitle } from "notion-utils";
import { fetchNoteContent, fetchNotes } from "./fetch";
import { Renderer } from "./renderer";

export async function generateMetadata({ params }) {
  const notesMap = await fetchNotes();
  const note = notesMap[params.note];
  const content = await fetchNoteContent(note.id);

  return {
    title: `Note: ${getPageTitle(content)}`,
  };
}

export async function generateStaticParams() {
  const notesMap = await fetchNotes();

  return Object.values(notesMap).map(({ slug }) => ({ note: slug }));
}

export default async function NotesPage({ params }) {
  "use cache";
  const notesMap = await fetchNotes();
  const note = notesMap[params.note];

  if (!note) {
    notFound();
  }

  return (
    <section data-post>
      <Renderer recordId={note.id} />
    </section>
  );
}
