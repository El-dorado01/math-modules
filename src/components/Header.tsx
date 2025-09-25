import { Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <header className="border-b bg-background/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center min-w-10 mr-5">
            <Image src={'/logo.png'} alt="Logo" width={50} height={50} />
          </div>

          {/* Navigation */}
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

          {/* Search Bar */}
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

          {/* Auth Buttons */}
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
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
