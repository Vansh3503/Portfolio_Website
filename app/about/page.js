import PageHeader from "@/components/PageHeader/PageHeader";
import AboutHero from "@/components/AboutHero/AboutHero";
import OffDuty from "@/components/OffDuty/OffDuty";

export const metadata = {
  title: "About — Vansh Malhotra",
  description:
    "AI Engineer who founded AI Studio (NomAIzo™), builds multi-agent LLM systems, RAG infrastructure, and adversarial security testing at eInfoChips.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="The story behind the"
        accent="pixels and the python."
        lead="Engineer, builder, and quiet motion-design nerd. Below: the work, the toolbox, and the off-duty life."
        variant="violet"
      />
      <AboutHero />
      <OffDuty />
    </>
  );
}
