import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Medal, Network, PackageCheck, PenTool } from 'lucide-react';
const features = [
  {
    icon: <Medal style={{ width: '50px', height: '50px' }} />,
    title: "Accessibility",
    description:
      "E-Kumpas is designed with accessibility in mind, ensuring that users can easily navigate and utilize its features, regardless of their hearing abilities.",
  },
  {
    icon: <Network style={{ width: '50px', height: '50px' }} />,
    title: "Community",
    description:
      "The app fosters a community where users can connect, share experiences, and learn from one another in their journey to understand FSL.",
  },
  {
    icon: <PackageCheck style={{ width: '50px', height: '50px' }} />,
    title: "Scalability",
    description:
      "E-Kumpas can accommodate a growing number of users and resources, making it a sustainable tool for learning and communication.",
  },
  {
    icon: <PenTool style={{ width: '50px', height: '50px' }} />,
    title: "Animation Feature",
    description:
      "E-Kumpas utilizes animated videos to demonstrate FSL signs, providing users with clear visual examples to enhance their understanding and learning process.",
  },
];

export const HowItWorks = () => {
  return (
    <section id="howItWorks" className="container text-center py-24 sm:py-32">
      <h2 className="text-3xl md:text-4xl font-bold ">
        How It{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Works{" "}
        </span>
        Step-by-Step Guide
      </h2>
      <p className="md:w-3/4 mx-auto mt-4 mb-8 text-xl text-muted-foreground">
        E-Kumpas streamlines the learning process for Filipino Sign Language (FSL) through a user-friendly interface. Follow these steps to make the most of your experience:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map(({ icon, title, description }) => (
          <Card key={title} className="bg-muted/50">
            <CardHeader>
              <CardTitle className="grid gap-4 place-items-center">
                {icon}
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent>{description}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
