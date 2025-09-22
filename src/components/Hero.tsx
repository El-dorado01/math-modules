import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Play } from "lucide-react";
import heroImage from "@/assets/hero-math-tutoring.jpg";

const Hero = () => {
  return (
    <section className="py-12 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Hero Card */}
          <Card
            style={{
              background:
                "linear-gradient(to bottom right, hsl(240 99% 25%), hsl(45 98% 62%))",
            }}
            className="text-white p-8 lg:p-12 border-0 shadow-2xl"
          >
            <div className="space-y-6">
              <div className="inline-block bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium">
                Limited Time
              </div>
              <h1 className="text-4xl lg:text-5xl font-heading font-bold leading-tight">
                Master Mathematics with Expert Tutors
              </h1>
              <p className="text-xl text-white/90 leading-relaxed">
                Get personalized 1-on-1 math tutoring from certified experts.
                Improve your grades and build confidence in algebra, calculus,
                geometry, and more.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-white text-[#010181] hover:bg-white/90 font-semibold"
                >
                  Start Learning Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white bg-white/10 hover:bg-white/20"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </Button>
              </div>
            </div>
          </Card>

          {/* Right Hero Card */}
          <Card
            style={{
              background:
                "linear-gradient(to bottom right, hsl(240 99% 25%), hsl(240 99% 40%))",
            }}
            className="text-white p-8 lg:p-12 border-0 shadow-2xl"
          >
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-heading font-bold">
                Build Your Math Skills with Confidence
              </h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-lg">1-on-1 personalized sessions</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-lg">Certified math experts</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-lg">All grade levels & subjects</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-lg">Flexible scheduling</span>
                </div>
              </div>
              <Button
                size="lg"
                className="bg-white text-[#010181] hover:bg-white/90 font-semibold w-full sm:w-auto"
              >
                Find Your Tutor
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Hero;
