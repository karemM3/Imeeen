import { useLanguage } from "@/hooks/use-language";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n";

interface LanguageToggleProps {
  mobile?: boolean;
}

const LanguageToggle = ({ mobile = false }: LanguageToggleProps) => {
  const { language, toggleLanguage } = useLanguage();
  
  return (
    <Button 
      variant="ghost" 
      size={mobile ? "default" : "sm"}
      onClick={toggleLanguage}
      className="p-1 rounded focus:outline-none focus:ring-2 focus:ring-primary-blue"
    >
      <div className="flex items-center">
        {mobile && <i className="fas fa-language mr-2"></i>}
        {language === "fr" ? "EN" : "FR"}
      </div>
    </Button>
  );
};

export default LanguageToggle;
