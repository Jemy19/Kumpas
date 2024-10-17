import Prid from "../../assets/Prid.jpg";

const sponsors = [
  {
    icon: <img src={Prid} alt="Description of the image" style={{ width: '200px', height: '200px' }} />,
    name: "Philippine Registry of Interpreters for the Deaf - PRID "
  },
];

export const Sponsors = () => {
  return (
    <section id="sponsors" className="container pt-24 sm:py-32">
      <h2 className="text-center text-md md:text-4xl font-bold mb-8 text-primary">
        Client and Validator
      </h2>

      <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
        {sponsors.map(({ icon, name }) => (
          <div key={name} className="flex flex-col items-center gap-1">
            <span>{icon}</span>
            <h2 className="text-3xl md:text-3xl mt-10">{name}</h2>
          </div>
        ))}
      </div>
    </section>
  );
};
