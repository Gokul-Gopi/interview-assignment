import { cn } from "@/utils/helpers";
import { Button } from "@/components/ui/Button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

interface IAppLayoutProps {
  header: string;
  children: React.ReactNode;
  className?: string;
}

const AppLayout = ({ header, children, className }: IAppLayoutProps) => {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <header className="p-4 flex justify-between mb-12 shadow-xs">
        <h1 className="text-3xl font-medium">{header}</h1>

        <Button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          variant="outline"
        >
          {theme === "light" ? <Moon /> : <Sun />}
        </Button>
      </header>

      <main className={cn("min-h-dvh px-4", className)}>{children}</main>
    </>
  );
};

export default AppLayout;
