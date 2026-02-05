import SequenceScroll from "@/components/SequenceScroll";
import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Bento from "@/components/Bento";
import Stats from "@/components/Stats";
import Testimonial from "@/components/Testimonial";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-[#0a0a0a]">
      <Navbar />
      <SequenceScroll />
      <div className="-mt-[100vh] relative z-10 bg-[#0a0a0a]">
        <About />
        <Bento />
        <Stats />
        <Testimonial />
        <CTA />
        <Footer />
      </div>
    </main>
  );
}
