import { useTranslation } from "@/lib/i18n";
import AnimatedLogo from "./AnimatedLogo";
import { useState } from "react";

const Footer = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This would be replaced with actual newsletter subscription logic
    alert('Newsletter subscription submitted!');
    setEmail("");
  };

  return (
    <footer className="bg-gray-800 dark:bg-dark-surface text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <AnimatedLogo className="w-10 h-10 mr-3" />
              <h3 className="text-lg font-poppins font-bold">LREE</h3>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              {t("labName")} {t("labFullName")}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-primary-blue transition-colors">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-white hover:text-primary-blue transition-colors">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" className="text-white hover:text-primary-blue transition-colors">
                <i className="fab fa-researchgate"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h3 className="font-poppins font-semibold text-lg mb-4 text-primary-yellow">
              {t("quickLinks")}
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#accueil" className="text-gray-300 hover:text-primary-blue transition-colors">
                  {t("home")}
                </a>
              </li>
              <li>
                <a href="#recherche" className="text-gray-300 hover:text-primary-blue transition-colors">
                  {t("research")}
                </a>
              </li>
              <li>
                <a href="#equipe" className="text-gray-300 hover:text-primary-blue transition-colors">
                  {t("team")}
                </a>
              </li>
              <li>
                <a href="#publications" className="text-gray-300 hover:text-primary-blue transition-colors">
                  {t("publications")}
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-300 hover:text-primary-blue transition-colors">
                  {t("contact")}
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="md:col-span-1">
            <h3 className="font-poppins font-semibold text-lg mb-4 text-primary-yellow">
              {t("resources")}
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-primary-blue transition-colors">
                  {t("collaborations")}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary-blue transition-colors">
                  {t("jobOffers")}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary-blue transition-colors">
                  {t("internships")}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary-blue transition-colors">
                  {t("news")}
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-1">
            <h3 className="font-poppins font-semibold text-lg mb-4 text-primary-yellow">
              {t("newsletter")}
            </h3>
            <p className="text-gray-300 text-sm mb-4">
              {t("subscribeText")}
            </p>
            <form className="mb-4" onSubmit={handleNewsletterSubmit}>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Email" 
                  className="px-4 py-2 rounded-l-md w-full focus:outline-none focus:ring-1 focus:ring-primary-blue dark:bg-dark-bg dark:border-gray-700"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button 
                  type="submit" 
                  className="bg-primary-blue text-white px-4 py-2 rounded-r-md hover:bg-opacity-90"
                >
                  <i className="fas fa-paper-plane"></i>
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>{t("copyright")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
