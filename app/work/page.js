import PageHeader from "@/components/PageHeader/PageHeader";
import WorkGrid from "@/components/WorkGrid/WorkGrid";

export const metadata = {
  title: "Work — Vansh Malhotra",
  description:
    "Selected projects: agentic QA platforms, multimodal RAG, browser automation, and LLM evaluation systems.",
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="Work · 2024 – 2026"
        title="Things I've"
        accent="shipped."
        lead="Production AI platforms, agentic systems, and RAG infrastructure built across the AI Studio at eInfoChips and personal experiments."
        variant="warm"
      />
      <WorkGrid />
    </>
  );
}
