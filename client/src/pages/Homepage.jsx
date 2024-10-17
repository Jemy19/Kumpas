import { About } from "@/components/Homepage/About";
import { FAQ } from "@/components/Homepage/FAQ";
import { Features } from "@/components/Homepage/Features";
import { Footer } from "@/components/Homepage/Footer";
import { Hero } from "@/components/Homepage/Hero";
import { HowItWorks } from "@/components/Homepage/HowItWorks";
import { Navbar } from "@/components/Homepage/Navbar";
import { ScrollToTop } from "@/components/Homepage/ScrollToTop";
import { Sponsors } from "@/components/Homepage/Sponsors";
import { Team } from "@/components/Homepage/Team";
import { ThemeProvider } from "@/components/Homepage/theme-provider";

export function Home() {
  return (
    <ThemeProvider>
      <Navbar />
      <Hero />
      <Sponsors />
      <About />
      <HowItWorks />
      <Features />
      <Team />
      <FAQ />
      <Footer />
      <ScrollToTop />
    </ThemeProvider>
  );
}

export default Home;
