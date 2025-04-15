/**
 * translations.ts
 * 
 * Ce fichier contient toutes les traductions utilisées dans l'application.
 * L'objet translations est organisé par langue (fr/en) puis par sections
 * correspondant aux différentes parties de l'interface.
 * 
 * Les clés de traduction sont identiques pour chaque langue, ce qui permet
 * de basculer facilement entre les langues sans modifier le code des composants.
 */

export const translations = {
  fr: {
    // Navbar
    "home": "Accueil",
    "research": "Recherche",
    "team": "Équipe",
    "publications": "Publications",
    "contact": "Contact",
    "darkMode": "Mode sombre",
    "lightMode": "Mode clair",
    
    // Lab Info
    "labName": "Laboratoire de Recherche",
    "labFullName": "Matériaux, Électrochimie et Environnement",
    
    // Hero Section
    "heroTitle": "Innovation en Électrochimie",
    "heroSubtitle": "Recherche de pointe en matériaux, électrochimie et applications environnementales.",
    "ourResearch": "Nos Recherches",
    "contactUs": "Contactez-nous",
    
    // Research Section
    "researchAreas": "Domaines de Recherche",
    "researchDescription": "Notre laboratoire se concentre sur plusieurs axes de recherche innovants en électrochimie et science des matériaux.",
    "advancedMaterials": "Matériaux Avancés",
    "advancedMaterialsDesc": "Développement et caractérisation de nouveaux matériaux pour applications électrochimiques.",
    "electrochemicalCatalysis": "Catalyse Électrochimique",
    "electrochemicalCatalysisDesc": "Étude des catalyseurs pour les réactions électrochimiques et applications énergétiques.",
    "environmentalTech": "Technologies Environnementales",
    "environmentalTechDesc": "Solutions électrochimiques pour le traitement des eaux et la surveillance environnementale.",
    "learnMore": "En savoir plus",
    
    // Team Section
    "ourTeam": "Notre Équipe",
    "teamDescription": "Des chercheurs passionnés et dédiés à l'avancement des connaissances en électrochimie et science des matériaux.",
    "directorRole": "Directrice du Laboratoire",
    "piRole": "Chercheur Principal",
    "seniorResearcherRole": "Chercheuse Senior",
    "projectLeaderRole": "Chef de Projet",
    "marieLaurentDesc": "Spécialiste en électrochimie des matériaux avancés avec plus de 15 ans d'expérience.",
    "thomasMoreauDesc": "Expert en catalyse et développement de matériaux pour piles à combustible.",
    "sophieBernardDesc": "Spécialiste en traitements électrochimiques pour applications environnementales.",
    "alexDuboisDesc": "Spécialiste en caractérisation des matériaux et développement de capteurs.",
    
    // Publications Section
    "recentPublications": "Publications Récentes",
    "publicationsDescription": "Découvrez nos dernières contributions à la recherche en électrochimie et sciences des matériaux.",
    "publication1Title": "Nouveaux catalyseurs à base de Pd-Ni pour l'électro-oxydation du méthanol",
    "publication1Desc": "Cette étude présente le développement de nouveaux catalyseurs bimétalliques pour améliorer l'efficacité des piles à combustible à méthanol direct.",
    "publication2Title": "Électrodéposition de films minces pour le stockage d'énergie",
    "publication2Desc": "Une méthode innovante pour la déposition de films minces nanostructurés pour applications de stockage d'énergie.",
    "publication3Title": "Détection électrochimique des polluants dans les eaux usées industrielles",
    "publication3Desc": "Développement de capteurs électrochimiques sensibles pour la détection de traces de métaux lourds et autres polluants.",
    "viewAllPublications": "Voir toutes les publications",
    "pdf": "PDF",
    
    // Lab Gallery Section
    "ourLaboratory": "Notre Laboratoire",
    "laboratoryDescription": "Un aperçu de nos installations et équipements de recherche de pointe.",
    
    // Contact Section
    "contactForm": "Formulaire de Contact",
    "name": "Nom",
    "email": "Email",
    "subject": "Sujet",
    "message": "Message",
    "send": "Envoyer",
    "contactInfo": "Informations de Contact",
    "address": "Adresse",
    "phone": "Téléphone",
    "interactiveMap": "Carte interactive",
    
    // Footer
    "quickLinks": "Liens Rapides",
    "resources": "Ressources",
    "collaborations": "Collaborations",
    "jobOffers": "Offres d'emploi",
    "internships": "Stages",
    "news": "Actualités",
    "newsletter": "Newsletter",
    "subscribeText": "Abonnez-vous pour recevoir nos actualités",
    "copyright": "© 2023 Laboratoire de Recherche Matériaux, Électrochimie et Environnement. Tous droits réservés.",
    
    // Form validation
    "required": "Ce champ est obligatoire",
    "invalidEmail": "Veuillez entrer une adresse email valide",
    "messageSent": "Message envoyé avec succès!",
    "messageError": "Erreur lors de l'envoi du message. Veuillez réessayer."
  },
  en: {
    // Navbar
    "home": "Home",
    "research": "Research",
    "team": "Team",
    "publications": "Publications",
    "contact": "Contact",
    "darkMode": "Dark mode",
    "lightMode": "Light mode",
    
    // Lab Info
    "labName": "Research Laboratory",
    "labFullName": "Materials, Electrochemistry and Environment",
    
    // Hero Section
    "heroTitle": "Innovation in Electrochemistry",
    "heroSubtitle": "Cutting-edge research in materials, electrochemistry and environmental applications.",
    "ourResearch": "Our Research",
    "contactUs": "Contact Us",
    
    // Research Section
    "researchAreas": "Research Areas",
    "researchDescription": "Our laboratory focuses on several innovative research areas in electrochemistry and materials science.",
    "advancedMaterials": "Advanced Materials",
    "advancedMaterialsDesc": "Development and characterization of new materials for electrochemical applications.",
    "electrochemicalCatalysis": "Electrochemical Catalysis",
    "electrochemicalCatalysisDesc": "Study of catalysts for electrochemical reactions and energy applications.",
    "environmentalTech": "Environmental Technologies",
    "environmentalTechDesc": "Electrochemical solutions for water treatment and environmental monitoring.",
    "learnMore": "Learn more",
    
    // Team Section
    "ourTeam": "Our Team",
    "teamDescription": "Passionate researchers dedicated to advancing knowledge in electrochemistry and materials science.",
    "directorRole": "Laboratory Director",
    "piRole": "Principal Investigator",
    "seniorResearcherRole": "Senior Researcher",
    "projectLeaderRole": "Project Leader",
    "marieLaurentDesc": "Specialist in electrochemistry of advanced materials with over 15 years of experience.",
    "thomasMoreauDesc": "Expert in catalysis and materials development for fuel cells.",
    "sophieBernardDesc": "Specialist in electrochemical treatments for environmental applications.",
    "alexDuboisDesc": "Specialist in materials characterization and sensor development.",
    
    // Publications Section
    "recentPublications": "Recent Publications",
    "publicationsDescription": "Discover our latest contributions to research in electrochemistry and materials science.",
    "publication1Title": "Novel Pd-Ni based catalysts for methanol electro-oxidation",
    "publication1Desc": "This study presents the development of new bimetallic catalysts to improve the efficiency of direct methanol fuel cells.",
    "publication2Title": "Electrodeposition of thin films for energy storage",
    "publication2Desc": "An innovative method for depositing nanostructured thin films for energy storage applications.",
    "publication3Title": "Electrochemical detection of pollutants in industrial wastewater",
    "publication3Desc": "Development of sensitive electrochemical sensors for the detection of heavy metal traces and other pollutants.",
    "viewAllPublications": "View all publications",
    "pdf": "PDF",
    
    // Lab Gallery Section
    "ourLaboratory": "Our Laboratory",
    "laboratoryDescription": "A glimpse of our state-of-the-art research facilities and equipment.",
    
    // Contact Section
    "contactForm": "Contact Form",
    "name": "Name",
    "email": "Email",
    "subject": "Subject",
    "message": "Message",
    "send": "Send",
    "contactInfo": "Contact Information",
    "address": "Address",
    "phone": "Phone",
    "interactiveMap": "Interactive Map",
    
    // Footer
    "quickLinks": "Quick Links",
    "resources": "Resources",
    "collaborations": "Collaborations",
    "jobOffers": "Job Offers",
    "internships": "Internships",
    "news": "News",
    "newsletter": "Newsletter",
    "subscribeText": "Subscribe to receive our updates",
    "copyright": "© 2023 Research Laboratory for Materials, Electrochemistry and Environment. All rights reserved.",
    
    // Form validation
    "required": "This field is required",
    "invalidEmail": "Please enter a valid email address",
    "messageSent": "Message sent successfully!",
    "messageError": "Error sending message. Please try again."
  }
};
