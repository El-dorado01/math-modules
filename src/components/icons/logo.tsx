import { cn } from "@/lib/utils";
import Image from "next/image";

const Logo = ({ className }: { className?: string }) => {
  return (
    <Image
      src="/logo.png"
      alt="Logo"
      width={200}
      height={200}
      className={cn("", className)}
    />
  );
};

export { Logo };
