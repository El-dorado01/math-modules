import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calculator,
  PieChart,
  Shapes,
  TrendingUp,
  FunctionSquare,
  Zap,
} from "lucide-react";

const Subjects = () => {
  const subjects = [
    {
      icon: Calculator,
      title: "Algebra",
      description:
        "Linear equations, polynomials, factoring, and algebraic expressions",
      level: "Middle & High School",
      color: "bg-blue-500",
    },
    {
      icon: FunctionSquare,
      title: "Calculus",
      description:
        "Derivatives, integrals, limits, and advanced calculus concepts",
      level: "High School & College",
      color: "bg-purple-500",
    },
    {
      icon: Shapes,
      title: "Geometry",
      description:
        "Shapes, angles, proofs, coordinate geometry, and trigonometry",
      level: "Middle & High School",
      color: "bg-green-500",
    },
    {
      icon: PieChart,
      title: "Statistics",
      description:
        "Data analysis, probability, distributions, and statistical inference",
      level: "High School & College",
      color: "bg-orange-500",
    },
    {
      icon: TrendingUp,
      title: "Pre-Calculus",
      description: "Functions, sequences, series, and preparation for calculus",
      level: "High School",
      color: "bg-red-500",
    },
    {
      icon: Zap,
      title: "Test Prep",
      description:
        "SAT Math, ACT Math, AP Calculus, and standardized test preparation",
      level: "High School",
      color: "bg-indigo-500",
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-4">
            Math Subjects We Cover
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From basic arithmetic to advanced calculus, our expert tutors cover
            all areas of mathematics
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {subjects.map((subject, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-lg transition-all hover:scale-105"
            >
              <div className="flex items-start space-x-4">
                <div
                  className={`p-3 rounded-lg ${subject.color} bg-opacity-10`}
                >
                  <subject.icon
                    className={`h-6 w-6 ${subject.color.replace(
                      "bg-",
                      "text-"
                    )}`}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                    {subject.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3 leading-relaxed">
                    {subject.description}
                  </p>
                  <div className="inline-block px-2 py-1 bg-[#FDCB40] rounded-full text-xs font-medium text-black">
                    {subject.level}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className="bg-[#010181] hover:bg-[#010181]/70 text-white"
          >
            View All Subjects
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Subjects;
