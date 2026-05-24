import PageHeader from "@/components/PageHeader/PageHeader";
import Contact from "@/components/Contact/Contact";

export const metadata = {
  title: "Contact — Vansh Malhotra",
  description:
    "Reach out about AI engineering roles, collabs, or just say hi.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's build"
        accent="something cinematic."
        lead="Open to AI engineering roles, agentic system collaborations, and anything where retrieval, evaluation, and great UX meet."
      />
      <Contact />
    </>
  );
}
