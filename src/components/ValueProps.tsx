import { Card } from "@/components/ui/card";
import { GraduationCap, Target, Award } from "lucide-react";

const ValueProps = () => {
  const features = [
    {
      icon: GraduationCap,
      title: "Improve Your Grades",
      description:
        "Get the personalized help you need to excel in your math courses and boost your GPA.",
    },
    {
      icon: Target,
      title: "Master Key Concepts",
      description:
        "Build a strong foundation in mathematics with expert guidance and proven teaching methods.",
    },
    {
      icon: Award,
      title: "Achieve Your Goals",
      description:
        "Whether it's passing a test, preparing for college, or conquering math anxiety - we're here to help.",
    },
  ];

  return (
    <section className="py-16 bg-[#FDCB40]/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="text-center p-8 hover:shadow-lg transition-shadow"
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-[#010181]/10 rounded-full flex items-center justify-center">
                <feature.icon className="h-8 w-8 text-[#010181]" />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-4 text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProps;
