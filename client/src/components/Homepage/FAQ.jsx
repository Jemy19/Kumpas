import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
  
  const FAQList = [
    {
      question: "What is E-Kumpas?",
      answer: "E-Kumpas is a text-to-sign language mobile app that helps individuals communicate with people who are deaf or hard of hearing by translating text into Filipino Sign Language (FSL). It also offers a platform for users to learn FSL, fostering better communication and inclusivity.",
      value: "item-1",
    },
    {
      question: "What makes Filipino Sign Language (FSL) unique?",
      answer:
        "FSL has its own grammar, syntax, and morphology. It’s not directly based on Filipino or English, so learning FSL is crucial for effectively communicating with those who use it.",
      value: "item-2",
    },
    {
      question:
        "How do I use the text-to-sign feature?",
      answer:
        "Simply type the text you want to convert into sign language, and the app will display animated signs in FSL for each word. This helps you understand and learn sign language in real-time.",
      value: "item-3",
    },
    {
      question: "Is E-Kumpas free to use?",
      answer: "Yes, E-Kumpas is free to download and use. We are dedicated to making learning and communication through FSL accessible to everyone.",
      value: "item-4",
    },
    {
      question:
        "Can I download the app on multiple devices?",
      answer:
        "Yes, you can download E-Kumpas on any supported device. Your app activity and progress can be synced if you use the same login credentials across devices.",
      value: "item-5",
    },
    {
      question:
        "How accurate are the FSL animations?",
      answer:
        "We work closely with FSL experts to ensure the animations are accurate and culturally appropriate, but we are continually improving based on user feedback.",
      value: "item-5",
    },
  ];
  
  export const FAQ = () => {
    return (
      <section id="faq" className="container py-24 sm:py-32">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Frequently Asked{" "}
          <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
            Questions
          </span>
        </h2>
  
        <Accordion type="single" collapsible className="w-full AccordionRoot">
          {FAQList.map(({ question, answer, value }) => (
            <AccordionItem key={value} value={value}>
              <AccordionTrigger className="text-left">{question}</AccordionTrigger>
              <AccordionContent>{answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
  
        <h3 className="font-medium mt-4">
          Still have questions?{" "}
          <a
            rel="noreferrer noopener"
            href="#"
            className="text-primary transition-all border-primary hover:border-b-2"
          >
            Contact us
          </a>
        </h3>
      </section>
    );
  };
  