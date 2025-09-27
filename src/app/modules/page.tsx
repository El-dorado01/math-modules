import React from "react";
import AppHeader from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Link from "next/link";
import { getAllModules } from "@/lib/fetch-chapter";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

const ModulesPage = () => {
  const modules = getAllModules();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader title="Chapters" />
        <div className="py-7 px-5 flex flex-col items-start justify-start">
          <div className="w-full flex flex-row flex-wrap gap-4 items-start justify-start">
            {modules.map((module) => (
              <Link
                key={module.id}
                href={`/modules/${module.modified_chapter_name}`}
                className="hover:scale-[1.02] transition-transform w-full md:flex-1 md:min-w-[250px]"
              >
                <Card>
                  <CardContent>
                    <div className="flex items-center justify-start">
                      <div className="h-15 w-15 min-w-[60px] rounded-full flex items-center justify-center p-2 text-2xl font-extrabold mr-4 bg-sidebar-accent">
                        {module.id}
                      </div>
                      <div className="flex flex-col gap-2 items-start justify-center">
                        <span className="font-semibold text-lg line-clamp-1">
                          {module.title}
                        </span>
                        <span className="text-xl font-bold line-clamp-1">
                          {module.chapter_name}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
        {/* <div className=""></div> */}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default ModulesPage;
