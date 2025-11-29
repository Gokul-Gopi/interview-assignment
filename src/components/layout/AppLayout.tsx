import { cn } from "@/utils/helpers";
import dynamic from "next/dynamic";

const DarkMode = dynamic(() => import("./DarkMode"), { ssr: false });

interface IAppLayoutProps {
  header: string;
  children: React.ReactNode;
  className?: string;
}

const AppLayout = ({ header, children, className }: IAppLayoutProps) => {
  return (
    <>
      <header className="p-4 flex justify-between mb-12 shadow-xs">
        <h1 className="text-3xl font-medium">{header}</h1>

        <DarkMode />
      </header>

      <main className={cn("min-h-dvh px-4", className)}>{children}</main>
    </>
  );
};

export default AppLayout;
