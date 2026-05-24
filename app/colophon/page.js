import PageHeader from "@/components/PageHeader/PageHeader";
import Colophon from "@/components/Colophon/Colophon";

export const metadata = {
  title: "About this site — Vansh Malhotra",
  description:
    "How this cinematic portfolio was built — Next.js 14, Framer Motion, GSAP, CSS Modules, Web Audio, and a hand-rolled animation language.",
};

export default function ColophonPage() {
  return (
    <>
      <PageHeader
        eyebrow="About this site"
        title="The portfolio,"
        accent="reverse-engineered."
        lead="A short tour of how this site is built — the stack, the pipeline, and the small details that add up to a cinematic feel."
        variant="ember"
      />
      <Colophon />
    </>
  );
}
