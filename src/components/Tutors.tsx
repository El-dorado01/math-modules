import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Clock } from "lucide-react";
import Image from "next/image";

const Tutors = () => {
  const tutors = [
    {
      name: "Dr. Sarah Chen",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      subject: "Calculus & Advanced Math",
      rating: 4.9,
      reviews: 342,
      experience: "8 years",
      education: "PhD Mathematics, MIT",
      location: "Boston, MA",
      price: "$65/hr",
      specialties: ["AP Calculus", "Multivariable Calculus", "Linear Algebra"],
    },
    {
      name: "Michael Rodriguez",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      subject: "Algebra & Geometry",
      rating: 4.8,
      reviews: 189,
      experience: "5 years",
      education: "MS Mathematics, Stanford",
      location: "San Francisco, CA",
      price: "$45/hr",
      specialties: ["Algebra I & II", "Geometry", "Trigonometry"],
    },
    {
      name: "Prof. Lisa Wang",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face",
      subject: "Statistics & Data Science",
      rating: 5.0,
      reviews: 156,
      experience: "12 years",
      education: "PhD Statistics, Harvard",
      location: "Cambridge, MA",
      price: "$75/hr",
      specialties: ["AP Statistics", "Probability", "Data Analysis"],
    },
  ];

  return (
    <section className="py-16 bg-[#FDCB40]/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-4">
            Meet Our Expert Math Tutors
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Learn from certified mathematics experts with proven track records
            of helping students succeed
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {tutors.map((tutor, index) => (
            <Card
              key={index}
              className="overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    <Image
                      src={tutor.image}
                      alt={tutor.name}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg text-foreground">
                      {tutor.name}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {tutor.subject}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 mb-3">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{tutor.rating}</span>
                  </div>
                  <span className="text-muted-foreground text-sm">
                    ({tutor.reviews} reviews)
                  </span>
                </div>

                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{tutor.experience} experience</span>
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{tutor.location}</span>
                  </div>
                  <p className="text-muted-foreground">{tutor.education}</p>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {tutor.specialties.map((specialty, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-[#010181]">
                    {tutor.price}
                  </span>
                  <Button className="bg-[#010181] hover:bg-[#010181]/90 text-white">
                    Book Session
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            variant="outline"
            size="lg"
            className="border-[#010181] text-[#010181] hover:bg-[#010181] hover:text-white"
          >
            View All Tutors
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Tutors;
