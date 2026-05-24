import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import PageTransition from "@/components/PageTransition/PageTransition";
import Preloader from "@/components/Preloader/Preloader";
import SoundProvider from "@/components/SoundProvider/SoundProvider";
import Cursor from "@/components/Cursor/Cursor";
import GameDock from "@/components/GameDock/GameDock";
import ScrollProgress from "@/components/ScrollProgress/ScrollProgress";

export const metadata = {
  title: "Vansh Malhotra — AI Engineer",
  description:
    "Cinematic portfolio of Vansh Malhotra — AI Engineer building multi-agent systems, RAG pipelines, and LLM infrastructure.",
  metadataBase: new URL("https://vanshmalhotra.dev"),
  openGraph: {
    title: "Vansh Malhotra — AI Engineer",
    description:
      "Cinematic portfolio of Vansh Malhotra — AI Engineer building multi-agent systems, RAG pipelines, and LLM infrastructure.",
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0c",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <SoundProvider>
          <Preloader />
          <ScrollProgress />
          <Cursor />
          <Header />
          <PageTransition>{children}</PageTransition>
          <Footer />
          <GameDock />
        </SoundProvider>
      </body>
    </html>
  );
}
