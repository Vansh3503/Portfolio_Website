import PageHeader from "@/components/PageHeader/PageHeader";
import Timeline from "@/components/Timeline/Timeline";

export const metadata = {
  title: "Experience — Vansh Malhotra",
  description:
    "AI Engineering experience: founding the AI Studio at eInfoChips, multi-agent QA, RAG, and LLM evaluation.",
};

export default function ExperiencePage() {
  return (
    <>
      <PageHeader
        eyebrow="Experience"
        title="The"
        accent="résumé."
        lead="A short timeline of where I've worked and what I've shipped — written like a resume, not a highlight reel."
      />
      <Timeline />
    </>
  );
}
