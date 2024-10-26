import { Statistics } from "./Statistics";
import Logo from '@/assets/LOGOKUMPAS.svg'
export const About = () => {
  return (
    <section
      id="about"
      className="container py-24 sm:py-32"
    >
      <div className="bg-muted/50 border rounded-lg py-12">
        <div className="px-6 flex flex-col-reverse md:flex-row gap-8 md:gap-12">
          <img
            src={Logo}
            alt="Logo"
            className="w-[900px] object-contain rounded-lg bg-white p-4 select-none pointer-events-none"
          />
          <div className="bg-green-0 flex flex-col justify-between">
            <div className="pb-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                ABOUT{" "}
                </span>
                US
              </h2>
              <p className="text-xl text-muted-foreground mt-4">
                Our About Us page aims to shed light on the diversity and challenges faced by individuals with hearing difficulties.
                While terms like "hard-of-hearing" and "deaf" are commonly known, they only scratch the surface. According to the WHO, 
                over 1.5 billion people globally live with some form of hearing loss. In the Philippines alone, there are an estimated 
                1,784,690 individuals with hearing difficulties.
              </p>
            </div>
            <Statistics />
          </div>
        </div>
      </div>
    </section>
  );
};