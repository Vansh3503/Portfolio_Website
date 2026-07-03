import PageHeader from "@/components/PageHeader/PageHeader";
import Timeline from "@/components/Timeline/Timeline";

export const metadata = {
  title: "Experience — Vansh Malhotra",
  description:
    "AI Engineering experience: founding AI Studio (NomAIzo™) at eInfoChips, multi-agent systems, CyberStudio compliance, and LLM security testing.",
};

export default function ExperiencePage() {
  return (
    <>
      <PageHeader
        eyebrow="Experience"
        title="The"
        accent="résumé."
        lead="A short timeline of where I've worked and what I've shipped — written like a resume, not a highlight reel."
        variant="cool"
      />
      <Timeline />
    </>
  );
}
