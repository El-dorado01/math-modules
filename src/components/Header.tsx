import { Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="border-b bg-background/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center min-w-10 mr-5">
            <Image src={"/logo.png"} alt="Logo" width={50} height={50} />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#"
              className="text-foreground hover:text-[#010181] transition-colors"
            >
              For Students
            </a>
            <a
              href="#"
              className="text-foreground hover:text-[#010181] transition-colors"
            >
              For Parents
            </a>
            <a
              href="#"
              className="text-foreground hover:text-[#010181] transition-colors"
            >
              For Schools
            </a>
            <a
              href="#"
              className="text-foreground hover:text-[#010181] transition-colors"
            >
              Subjects
            </a>
          </nav>

          {/* Search Bar (Desktop) */}
          <div className="hidden lg:flex items-center max-w-sm w-full mx-8">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="What math topic do you want to learn?"
                className="pr-10"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          {/* Auth Buttons & Mobile Menu Trigger */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild className="hidden sm:inline-flex">
              <Link href={"/login"}>Log In</Link>
            </Button>
            <Button
              asChild
              className="bg-[#010181] hover:bg-[#010181]/90 text-white"
            >
              <Link href={"/login"}>Join for Free</Link>
            </Button>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4">
                  <a
                    href="#"
                    className="text-foreground hover:text-[#010181] transition-colors text-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    For Students
                  </a>
                  <a
                    href="#"
                    className="text-foreground hover:text-[#010181] transition-colors text-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    For Parents
                  </a>
                  <a
                    href="#"
                    className="text-foreground hover:text-[#010181] transition-colors text-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    For Schools
                  </a>
                  <a
                    href="#"
                    className="text-foreground hover:text-[#010181] transition-colors text-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    Subjects
                  </a>
                  {/* Mobile Search Bar */}
                  <div className="relative w-full mt-4">
                    <Input
                      type="text"
                      placeholder="Search math topics..."
                      className="pr-10"
                    />
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                  {/* Mobile Auth Buttons */}
                  <div className="flex flex-col gap-2 mt-4">
                    <Button
                      variant="ghost"
                      asChild
                      onClick={() => setIsOpen(false)}
                    >
                      <Link href={"/login"}>Log In</Link>
                    </Button>
                    <Button
                      asChild
                      className="bg-[#010181] hover:bg-[#010181]/90 text-white"
                      onClick={() => setIsOpen(false)}
                    >
                      <Link href={"/login"}>Join for Free</Link>
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
