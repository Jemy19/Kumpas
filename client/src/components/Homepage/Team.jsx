import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Facebook, Instagram, Linkedin, Github  } from "lucide-react";
import  Mohad from '../../assets/mohad.jpg';
import  Jeremy from '../../assets/jeremy.jpg';
import  Lemnuel from '../../assets/lemnuel.jpg';
import  Joseph from '../../assets/joseph.jpg';
const teamList = [
  {
    imageUrl: Joseph,
    name: "Joseph Azaula",
    position: "Product Manager",
    socialNetworks: [
      {
        name: "Linkedin",
        url: "https://www.linkedin.com/",
      },
      {
        name: "Facebook",
        url: "https://www.facebook.com/joooeevino",
      },
      {
        name: "Github",
        url: "https://www.Github.com/",
      },
    ],
    description: "Joseph leads product development, ensuring E-Kumpas delivers value to users."
  },
  {
    imageUrl: Jeremy,
    name: "Jeremy Gellido",
    position: "Full-stack Web Developer",
    socialNetworks: [
      {
        name: "Linkedin",
        url: "https://www.linkedin.com/in/ajbg19/",
      },
      {
        name: "Facebook",
        url: "https://www.facebook.com/jeremy.gellido/",
      },
      {
        name: "Github",
        url: "https://github.com/Jemy19",
      },
    ],
    description: "Jeremy builds and maintains the web functionality of E-Kumpas for a smooth user experience."
  },
  {
    imageUrl: Mohad,
    name: "Mohad Matanog",
    position: "Mobile Developer",
    socialNetworks: [
      {
        name: "Linkedin",
        url: "https://www.linkedin.com/in/mohad-matanog-a47516257/",
      },
      {
        name: "Facebook",
        url: "https://www.facebook.com/had.mo.56",
      },
      {
        name: "Github",
        url: "https://github.com/Grimmmm0",
      },
    ],
    description: "Mohad focuses on delivering an intuitive mobile experience for E-Kumpas users."
  },
  {
    imageUrl: Lemnuel,
    name: "Lemnuel Lumaban",
    position: "Mobile Developer",
    socialNetworks: [
      {
        name: "Linkedin",
        url: "https://www.linkedin.com/in/lemnuel-lumaban-046212253/",
      },
      {
        name: "Facebook",
        url: "https://www.facebook.com/lemnuel.lumaban",
      },
      {
        name: "Github",
        url: "https://github.com/XjorLml",
      },
    ],
    description: "Lemnuel enhances the mobile app, making E-Kumpas accessible on all devices."
  },
];

export const Team = () => {
  const socialIcon = (iconName) => {
    switch (iconName) {
      case "Linkedin":
        return <Linkedin size="20" />;

      case "Facebook":
        return <Facebook size="20" />;

      case "Instagram":
        return <Instagram size="20" />;
      
      case "Github":
        return <Github size="20" />;  
      default:
        return null; // Add a default case to handle unexpected values
    }
  };

  return (
    <section id="team" className="container py-24 sm:py-32">
      <h2 className="text-3xl md:text-4xl font-bold">
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Our Dedicated{" "}
        </span>
        Crew
      </h2>

      <p className="mt-4 mb-10 text-xl text-muted-foreground">
        Passionate and skilled, our team is committed to delivering innovative solutions that make communication accessible for everyone.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 gap-y-10">
        {teamList.map(({ imageUrl, name, position, socialNetworks, description }) => (
          <Card
            key={name}
            className="bg-muted/50 relative mt-8 flex flex-col justify-center items-center"
          >
            <CardHeader className="mt-8 flex justify-center items-center pb-2">
              <img
                src={imageUrl}
                alt={`${name} ${position}`}
                className="absolute -top-12 rounded-full w-24 h-24 aspect-square object-cover"
              />
              <CardTitle className="text-center">{name}</CardTitle>
              <CardDescription className="text-primary">
                {position}
              </CardDescription>
            </CardHeader>

            <CardContent className="text-center pb-2">
              <p>{description}</p>
            </CardContent>

            <CardFooter>
              {socialNetworks.map(({ name, url }) => (
                <div key={name}>
                  <a
                    rel="noreferrer noopener"
                    href={url}
                    target="_blank"
                    className={buttonVariants({
                      variant: "ghost",
                      size: "sm",
                    })}
                  >
                    <span className="sr-only">{name} icon</span>
                    {socialIcon(name)}
                  </a>
                </div>
              ))}
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};
