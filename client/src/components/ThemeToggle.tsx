import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n";

interface ThemeToggleProps {
  mobile?: boolean;
}

const ThemeToggle = ({ mobile = false }: ThemeToggleProps) => {
  const [isDark, setIsDark] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const darkMode = document.documentElement.classList.contains('dark');
    setIsDark(darkMode);
  }, []);

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
    const newDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(newDarkMode);
    localStorage.setItem('dark-mode', String(newDarkMode));
  };

  return (
    <Button 
      variant="ghost" 
      size={mobile ? "default" : "sm"}
      onClick={toggleDarkMode}
      className="p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-blue"
    >
      <div className="flex items-center">
        {isDark ? (
          <>
            <i className="fas fa-sun text-primary-yellow mr-2"></i>
            {mobile && <span>{t("lightMode")}</span>}
          </>
        ) : (
          <>
            <i className="fas fa-moon mr-2"></i>
            {mobile && <span>{t("darkMode")}</span>}
          </>
        )}
      </div>
    </Button>
  );
};

export default ThemeToggle;
