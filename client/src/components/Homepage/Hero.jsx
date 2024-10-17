import Spline from '@splinetool/react-spline';
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";


export const Hero = () => {
  return (
    <section className="relative w-full h-screen">
      {/* Spline Background */}
      <Spline 
        scene="https://prod.spline.design/FVZWbQH2B6ndj9UU/scene.splinecode" 
        className="ml-60 absolute inset-0 w-full h-full object-cover z-0 hidden md:table-cell"
      />
      
      {/* Content over the Spline background */}
      <div className="container relative z-10 grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10 h-full flex items-center justify-center -mt-20">
        <div className="text-center lg:text-start space-y-6">
          <main className="text-5xl md:text-6xl font-bold">
            <h1 className="inline">
              <span className="inline bg-gradient-to-r from-[#3ffb4d] to-[#14572c] text-transparent bg-clip-text">
                E-KUMPAS
              </span>{" "}
            </h1>{" "}
          </main>

          <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
            Translating text into <strong>Filipino Sign Language</strong> using animation.
          </p>

          <div className="space-y-4 md:space-y-0 md:space-x-4">
            <Button
              className="w-full md:w-1/3"
              onClick={() =>
                window.open(
                  'https://github.com/XjorLml/E-Kumpas_Mobile_App/releases/download/v1.0.0-beta/E-Kumpas-v1.0.0-beta.apk',
                  '_blank',
                  'noopener noreferrer'
                )
              }
            >
              Download App
            </Button>
            <a
              rel="noreferrer noopener"
              href="https://github.com/leoMirandaa/shadcn-landing-page.git"
              target="_blank"
              className={`w-full md:w-1/3 ${buttonVariants({ variant: "outline" })}`}
            >
              Github Repository
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
