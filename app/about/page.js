import PageHeader from "@/components/PageHeader/PageHeader";
import AboutHero from "@/components/AboutHero/AboutHero";
import OffDuty from "@/components/OffDuty/OffDuty";

export const metadata = {
  title: "About — Vansh Malhotra",
  description:
    "AI Engineer building agentic systems, RAG infrastructure, and LLM evaluation pipelines.",
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
