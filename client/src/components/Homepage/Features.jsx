import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Respo from "../../assets/respon-portrait.png";
import Intu from "../../assets/intu-portrait.png";
import Anim from "../../assets/animation-portrait.png";
const features = [
  {
    title: "Responsive Design",
    description:
      "E-Kumpas features a responsive design that adapts to all screen sizes, ensuring a seamless experience on any device.",
    image: Respo
  },
  {
    title: "Intuitive user interface",
    description:
      "The app boasts an intuitive interface that makes navigation simple and user-friendly for learners of all ages.",
    image: Intu
  },
  {
    title: "Text translation",
    description:
      "E-Kumpas provides text translation to Filipino Sign Language (FSL), allowing users to easily convert written content into animated sign gestures.",
    image: Anim
  },
];

const featureList = [
  "Dark/Light theme",
  "Feedback",
  "Text translation",
  "Favorites",
  "Contact form",
  "Our team",
  "Responsive design",
  "Newsletter",
  "Minimalist",
];

export const Features = () => {
  return (
    <section id="features" className="container py-24 sm:py-32 space-y-8">
      <h2 className="text-3xl lg:text-4xl font-bold md:text-center">
        Many{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Great Features
        </span>
      </h2>

      <div className="flex flex-wrap md:justify-center gap-4">
        {featureList.map((feature) => (
          <div key={feature}>
            <Badge variant="secondary" className="text-sm">
              {feature}
            </Badge>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map(({ title, description, image }) => (
          <Card key={title}>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>

            <CardContent>{description}</CardContent>

            <CardFooter>
              <img
                src={image}
                alt="About feature"
                className="w-[200px] lg:w-[300px] mx-auto"
              />
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};
