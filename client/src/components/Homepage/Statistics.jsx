export const Statistics = () => {
    const stats = [
      {
        quantity: "2.7K+",
        description: "Users",
      },
      {
        quantity: "1.8K+",
        description: "Subscribers",
      },
      {
        quantity: "112",
        description: "Downloads",
      },
      {
        quantity: "65",
        description: "Animated Sign Languages",
      },
    ];
  
    return (
      <section id="statistics">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map(({ quantity, description }) => (
            <div key={description} className="space-y-2 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold">{quantity}</h2>
              <p className="text-xl text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>
      </section>
    );
  };
  