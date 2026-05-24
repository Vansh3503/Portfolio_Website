import VideoIntro from "@/components/VideoIntro/VideoIntro";
import Highlights from "@/components/Highlights/Highlights";
import Marquee from "@/components/Marquee/Marquee";
import FeaturedWork from "@/components/FeaturedWork/FeaturedWork";

export default function HomePage() {
  return (
    <>
      <VideoIntro />
      <Marquee />
      <Highlights />
      <FeaturedWork />
    </>
  );
}
