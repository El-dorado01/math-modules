import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import Image from "next/image";

const Footer = () => {
  const footerSections = [
    {
      title: "Subjects",
      links: [
        "Algebra",
        "Calculus",
        "Geometry",
        "Statistics",
        "Pre-Calculus",
        "Test Prep",
      ],
    },
    {
      title: "For Students",
      links: [
        "Find a Tutor",
        "How it Works",
        "Pricing",
        "Success Stories",
        "Study Resources",
        "Mobile App",
      ],
    },
    {
      title: "For Tutors",
      links: [
        "Become a Tutor",
        "Tutor Resources",
        "Teaching Tools",
        "Tutor Community",
        "Support Center",
      ],
    },
    {
      title: "Company",
      links: [
        "About Us",
        "Careers",
        "Press",
        "Blog",
        "Contact",
        "Privacy Policy",
      ],
    },
  ];

  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Logo and Description */}
          <div className="lg:col-span-1">
            <Image src={"/logo.png"} alt="Logo" width={50} height={50} />
            <p className="text-background/80 leading-relaxed">
              Empowering students to achieve mathematical excellence through
              personalized, expert tutoring.
            </p>
            <div className="flex space-x-4 mt-6">
              <Facebook className="h-5 w-5 text-background/60 hover:text-[#010181]/90 cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-background/60 hover:text-[#010181]/90 cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-background/60 hover:text-[#010181]/90 cursor-pointer transition-colors" />
              <Linkedin className="h-5 w-5 text-background/60 hover:text-[#010181]/90 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-heading font-semibold text-background mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href="#"
                      className="text-background/80 hover:text-background transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-background/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-background/60 text-sm">
              © 2024 MathTutor. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a
                href="#"
                className="text-background/60 hover:text-background transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-background/60 hover:text-background transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-background/60 hover:text-background transition-colors"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
