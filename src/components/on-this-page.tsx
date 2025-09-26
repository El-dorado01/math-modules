"use client";

import { Title } from "@/data/modules";
import { List } from "lucide-react";
import React, { useEffect, useState } from "react";
import { ScrollArea } from "./ui/scroll-area";

interface OnThisPageProps {
  titles: Title[];
}

const OnThisPage = ({ titles }: OnThisPageProps) => {
  const [activeTitleId, setActiveTitleId] = useState<number | null>(null);

  // Set up Intersection Observer to detect when subsections are in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id; // e.g., subsection-2
            const titleId = parseInt(sectionId.replace("subsection-", ""), 10);
            setActiveTitleId(titleId);
          }
        });
      },
      {
        root: null, // Use viewport as root
        rootMargin: "-100px 0px 0px 0px", // Adjust for header offset
        threshold: 0.1, // Trigger when 10% of subsection is visible
      }
    );

    // Observe all subsections corresponding to titles
    titles.forEach((title) => {
      const section = document.getElementById(`subsection-${title.id}`);
      if (section) {
        observer.observe(section);
      }
    });

    // Clean up observer on unmount
    return () => {
      titles.forEach((title) => {
        const section = document.getElementById(`subsection-${title.id}`);
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, [titles]);

  // Handle clicking a title to scroll to its subsection
  const scrollToSection = (titleId: number) => {
    const section = document.getElementById(`subsection-${titleId}`);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setActiveTitleId(titleId);
    }
  };

  return (
    <div className="flex-1 lg:flex-1/4">
      <div className="lg:sticky lg:top-0 flex flex-col items-start justify-center py-3">
        <div className="flex items-center justify-start mb-3">
          <List className="mr-2 size-5" />
          <span>On This Page</span>
        </div>
        <ScrollArea className="h-[calc(100vh-4rem)] md:h-auto">
          <div className="border-l py-1">
            {titles.map((title) => (
              <div
                key={title.id}
                className={`border-l-2 px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                  activeTitleId === title.id
                    ? "border-l-blue-400"
                    : "border-l-transparent"
                }`}
                onClick={() => scrollToSection(title.id)}
              >
                {title.text}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default OnThisPage;
