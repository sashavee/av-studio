import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Gallery from "@/components/Gallery";
import Problem from "@/components/Problem";
import Process from "@/components/Process";
import Work from "@/components/Work";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";

export default function Home() {
  return (
    <>
      <Loader />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Problem />
        <Gallery />
        <Process />
        <Work />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
