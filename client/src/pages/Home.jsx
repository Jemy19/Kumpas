import { About } from "@/components/Homepage/About";
import { Cta } from "@/components/Homepage/Cta";
import { FAQ } from "@/components/Homepage/FAQ";
import { Features } from "@/components/Homepage/Features";
import { Footer } from "@/components/Homepage/Footer";
import { Hero } from "@/components/Homepage/Hero";
import { HowItWorks } from "@/components/Homepage/HowItWorks";
import { Navbar } from "@/components/Homepage/Navbar";
import { Newsletter } from "@/components/Homepage/Newsletter";
import { Pricing } from "@/components/Homepage/Pricing";
import { ScrollToTop } from "@/components/Homepage/ScrollToTop";
import { Services } from "@/components/Homepage/Services";
import { Sponsors } from "@/components/Homepage/Sponsors";
import { Team } from "@/components/Homepage/Team";
import { Testimonials } from "@/components/Homepage/Testimonials";
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
      <Services />
      <Cta />
      <Testimonials />
      <Team />
      <Pricing />
      <Newsletter />
      <FAQ />
      <Footer />
      <ScrollToTop />
    </ThemeProvider>
  );
}

export default Home;
