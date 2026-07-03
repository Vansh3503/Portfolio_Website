import PageHeader from "@/components/PageHeader/PageHeader";
import WorkGrid from "@/components/WorkGrid/WorkGrid";

export const metadata = {
  title: "Work — Vansh Malhotra",
  description:
    "Selected projects: AI Studio (NomAIzo™), CyberStudio compliance platform, and Assessment Studio.",
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="Work · 2023 – 2026"
        title="Things I've"
        accent="shipped."
        lead="Production AI platforms, multi-agent compliance systems, and RAG infrastructure built at eInfoChips (NomAIzo™ AI Studio) and personal experiments."
        variant="warm"
      />
      <WorkGrid />
    </>
  );
}
