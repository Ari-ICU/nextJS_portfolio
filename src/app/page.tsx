
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BadgeCertificateGenerator from "@/components/BadgeCertificateGenerator";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <About />
        <Projects />
        <BadgeCertificateGenerator />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}