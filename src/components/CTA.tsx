import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Card
          style={{
            background:
              "linear-gradient(to bottom right, hsl(240 99% 25%), hsl(45 98% 62%))",
          }}
          className="text-white p-12 lg:p-16 text-center border-0 shadow-2xl"
        >
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-4xl lg:text-5xl font-heading font-bold leading-tight">
              Ready to Excel in Mathematics?
            </h2>
            <p className="text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">
              Join thousands of students who have improved their math skills
              with our expert tutors. Get started with a free consultation
              today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-white text-[#010181] hover:bg-white/90 font-semibold text-lg px-8 py-4"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white bg-white/10 hover:bg-white/20 font-semibold text-lg px-8 py-4"
              >
                Find a Tutor
              </Button>
            </div>

            <div className="pt-6 text-white/80">
              <p className="text-sm">
                No credit card required • Free consultation • Expert tutors
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default CTA;
