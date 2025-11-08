import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";

const Team = () => {
  const team = [
    {
      name: "Satyaprakash Bhat",
      role: "Founder, Strategy & Operations",
      description: "Leads business vision, strategy, and execution. Driving the integration of AI, recycled materials, and scalable manufacturing."
    },
    {
      name: "Rohan Chandavari",
      role: "Co-Founder, Material Innovation",
      description: "Leading material innovation, advanced polymer blends, and manufacturing research."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <p className="text-sm tracking-[0.3em] text-muted-foreground mb-4">
              OUR TEAM
            </p>
            <h1 className="text-5xl font-light text-foreground mb-6">
              The People Behind Bytras
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A young, impact-focused team building the next generation of sustainable furniture.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {team.map((member, index) => (
              <Card key={index} className="p-8 hover:shadow-lg transition-shadow">
                <h3 className="text-2xl font-medium text-foreground mb-2">
                  {member.name}
                </h3>
                <p className="text-accent font-medium mb-4">{member.role}</p>
                <p className="text-muted-foreground leading-relaxed">
                  {member.description}
                </p>
              </Card>
            ))}
          </div>

          <Card className="p-8 bg-muted">
            <h3 className="text-2xl font-medium text-foreground mb-4">
              Dr. Shivakumar Gouda — Advisor
            </h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• 21+ years of Teaching and Research experience</li>
              <li>• Professor & Head of Dept. of Aeronautical Engineering at Dayanand Sagar College of Engineering, Bengaluru</li>
              <li>• Editorial Board – J. Advances in Polymer Technology, Wiley Publications</li>
            </ul>
          </Card>

          <p className="text-center text-muted-foreground mt-12 text-lg">
            Supported by designers, engineers, AI developers, and craftsmen who bring every design to life.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Team;
