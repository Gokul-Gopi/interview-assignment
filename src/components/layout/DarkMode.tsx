import { Button } from "@/components/ui/Button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const DarkMode = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      variant="outline"
    >
      {theme === "light" ? <Moon /> : <Sun />}
    </Button>
  );
};

export default DarkMode;
