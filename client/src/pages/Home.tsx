import { useTranslation } from "@/lib/i18n";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactMessageSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";

// Extended schema with validation
const contactFormSchema = insertContactMessageSchema.extend({
  email: z.string().email({ message: "invalidEmail" }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const Home = () => {
  const { t } = useTranslation();
  const { toast } = useToast();

  const researchAreas = [
    {
      image: "https://images.unsplash.com/photo-1617791160505-6f00504e3519?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      title: "advancedMaterials",
      description: "advancedMaterialsDesc",
    },
    {
      image: "https://images.unsplash.com/photo-1611469642497-fe66375c850c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      title: "electrochemicalCatalysis",
      description: "electrochemicalCatalysisDesc",
    },
    {
      image: "https://images.unsplash.com/photo-1518384401463-d3876163c195?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      title: "environmentalTech",
      description: "environmentalTechDesc",
    },
  ];

  const teamMembers = [
    {
      image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      name: "Prof. Marie Laurent",
      role: "directorRole",
      description: "marieLaurentDesc",
    },
    {
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      name: "Dr. Thomas Moreau",
      role: "piRole",
      description: "thomasMoreauDesc",
    },
    {
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      name: "Dr. Sophie Bernard",
      role: "seniorResearcherRole",
      description: "sophieBernardDesc",
    },
    {
      image: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      name: "Dr. Alex Dubois",
      role: "projectLeaderRole",
      description: "alexDuboisDesc",
    },
  ];

  const publications = [
    {
      title: "publication1Title",
      authors: "Laurent M., Moreau T., Bernard S.",
      journal: "Journal of Electrochemical Science, 2023",
      description: "publication1Desc",
    },
    {
      title: "publication2Title",
      authors: "Dubois A., Bernard S.",
      journal: "Advanced Materials Interfaces, 2022",
      description: "publication2Desc",
    },
    {
      title: "publication3Title",
      authors: "Bernard S., Moreau T., Laurent M.",
      journal: "Environmental Science & Technology, 2022",
      description: "publication3Desc",
    },
  ];

  const labImages = [
    "https://images.unsplash.com/photo-1581093806997-124204d9fa9d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1629118648464-a35a688b2466?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1518152006812-edab29b069ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
  ];

  // Form for contact
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      createdAt: new Date().toISOString(),
    },
  });

  // Mutation for sending contact form
  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormValues) => {
      const res = await apiRequest("POST", "/api/contact", data);
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: t("messageSent"),
        variant: "default",
        className: "bg-green-100 text-green-800 border-green-200",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: t("messageError"),
        description: error instanceof Error ? error.message : String(error),
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    contactMutation.mutate(data);
  };

  // Smooth scrolling for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      
      if (anchor) {
        e.preventDefault();
        const targetId = anchor.getAttribute('href')?.substring(1);
        
        if (targetId) {
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: 'smooth'
            });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return (
    <main>
      {/* Hero Section */}
      <section id="accueil" className="relative bg-gradient-to-br from-primary-blue to-primary-green dark:from-dark-surface dark:to-dark-bg py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-3xl md:text-5xl font-poppins font-bold mb-4 text-white dark:text-primary-yellow">
                {t("heroTitle")}
              </h1>
              <p className="text-xl text-white dark:text-dark-text mb-8">
                {t("heroSubtitle")}
              </p>
              <div className="flex space-x-4">
                <a 
                  href="#recherche" 
                  className="px-6 py-3 bg-primary-brown text-white rounded-lg hover:bg-opacity-90 transition-all shadow-md font-poppins"
                >
                  {t("ourResearch")}
                </a>
                <a 
                  href="#contact" 
                  className="px-6 py-3 bg-white text-primary-blue rounded-lg hover:bg-opacity-90 transition-all shadow-md font-poppins"
                >
                  {t("contactUs")}
                </a>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img 
                src="https://images.unsplash.com/photo-1579165466949-3180a3d056d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Laboratory equipment" 
                className="rounded-lg shadow-xl w-full max-w-md object-cover"
              />
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="block dark:hidden">
            <path fill="#ffffff" fillOpacity="1" d="M0,160L48,170.7C96,181,192,203,288,202.7C384,203,480,181,576,165.3C672,149,768,139,864,149.3C960,160,1056,192,1152,197.3C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="hidden dark:block absolute bottom-0">
            <path fill="#121212" fillOpacity="1" d="M0,160L48,170.7C96,181,192,203,288,202.7C384,203,480,181,576,165.3C672,149,768,139,864,149.3C960,160,1056,192,1152,197.3C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* Research Areas Section */}
      <section id="recherche" className="py-16 bg-white dark:bg-dark-bg">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-poppins font-bold mb-4 text-primary-blue dark:text-primary-green">
              {t("researchAreas")}
            </h2>
            <p className="max-w-2xl mx-auto text-gray-600 dark:text-dark-text">
              {t("researchDescription")}
            </p>
          </div>

          {/* Research Areas Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {researchAreas.map((area, index) => (
              <div 
                key={index}
                className="bg-gray-50 dark:bg-dark-surface rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <img 
                  src={area.image}
                  alt={t(area.title)} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-poppins font-semibold mb-3 text-primary-brown dark:text-primary-yellow">
                    {t(area.title)}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    {t(area.description)}
                  </p>
                  <a href="#" className="text-primary-blue dark:text-primary-green font-semibold inline-flex items-center">
                    {t("learnMore")}
                    <i className="fas fa-arrow-right ml-2"></i>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section - Redesigned with centered photos and description below */}
      <section id="equipe" className="py-16 bg-gray-50 dark:bg-dark-surface">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-poppins font-bold mb-4" style={{ color: "#94B9AF" }}>
              {t("ourTeam") as string}
            </h2>
            <p className="max-w-2xl mx-auto text-gray-600 dark:text-dark-text">
              {t("teamDescription") as string}
            </p>
          </div>

          {/* Team Members Grid - centralized layout with photo and description structure */}
          <div className="flex flex-wrap justify-center gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={index}
                className="w-full sm:w-[45%] lg:w-[30%] xl:w-[22%] flex flex-col items-center bg-white dark:bg-dark-bg/50 rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                style={{ 
                  borderTop: `4px solid ${index % 2 === 0 ? "#94B9AF" : "#DFB89B"}`,
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  backdropFilter: "blur(8px)"
                }}
              >
                {/* Centered circular photo */}
                <div className="flex justify-center w-full pt-8 pb-4">
                  <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-md" style={{ borderColor: "#f5f5f5" }}>
                    <img 
                      src={member.image}
                      alt={member.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                {/* Name and role centered */}
                <div className="w-full text-center px-6 pb-3">
                  <h3 className="text-xl font-poppins font-semibold" style={{ color: "#94B9AF" }}>
                    {member.name}
                  </h3>
                  <p style={{ color: "#DFB89B" }} className="font-medium">
                    {t(member.role) as string}
                  </p>
                </div>
                
                {/* Description in dedicated section below */}
                <div className="w-full px-6 py-5 mt-auto bg-gray-50 dark:bg-dark-surface/70 border-t border-gray-100 dark:border-gray-700">
                  <p className="text-gray-700 dark:text-gray-300 text-sm text-center">
                    {t(member.description) as string}
                  </p>
                  <div className="flex justify-center space-x-3 mt-4">
                    <a href="#" className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" style={{ color: "#94B9AF" }}>
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                    <a href="#" className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" style={{ color: "#94B9AF" }}>
                      <i className="fas fa-envelope"></i>
                    </a>
                    <a href="#" className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" style={{ color: "#94B9AF" }}>
                      <i className="fas fa-globe"></i>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Publications Section - Updated with pastel color scheme */}
      <section id="publications" className="py-16 bg-white dark:bg-dark-bg">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-poppins font-bold mb-4" style={{ color: "#94B9AF" }}>
              {t("recentPublications") as string}
            </h2>
            <p className="max-w-2xl mx-auto text-gray-600 dark:text-dark-text">
              {t("publicationsDescription")}
            </p>
          </div>

          {/* Publications List - Redesigned with pastel colors */}
          <div className="rounded-2xl shadow-md overflow-hidden">
            {publications.map((publication, index) => (
              <div 
                key={index}
                className="p-6 bg-white dark:bg-dark-surface/70 border-b border-gray-100 dark:border-gray-700 last:border-0 hover:bg-gray-50/80 dark:hover:bg-dark-surface/90 transition-colors duration-300"
                style={{ borderLeft: `4px solid ${index % 2 === 0 ? "#94B9AF" : "#DFB89B"}` }}
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-9/12">
                    <h3 className="text-xl font-poppins font-semibold mb-2" style={{ color: "#94B9AF" }}>
                      {t(publication.title)}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">
                      {publication.authors}, <em>{publication.journal}</em>
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      {t(publication.description)}
                    </p>
                  </div>
                  <div className="md:w-3/12 mt-4 md:mt-0 flex justify-end items-start">
                    <a 
                      href="#" 
                      className="px-4 py-2 rounded-full hover:shadow-md inline-flex items-center text-sm transition-all transform hover:scale-105"
                      style={{ 
                        backgroundColor: "#DFB89B", 
                        color: "white"
                      }}
                    >
                      <i className="fas fa-file-pdf mr-2"></i>
                      {t("pdf")}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <a 
              href="#" 
              className="inline-flex items-center px-6 py-3 rounded-full hover:shadow-lg transition-all transform hover:scale-105"
              style={{ 
                backgroundColor: "#94B9AF", 
                color: "white"
              }}
            >
              {t("viewAllPublications")}
              <i className="fas fa-arrow-right ml-2"></i>
            </a>
          </div>
        </div>
      </section>

      {/* Lab Gallery Section - Updated with pastel colors */}
      <section className="py-16 bg-gray-50 dark:bg-dark-surface">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-poppins font-bold mb-4" style={{ color: "#94B9AF" }}>
              {t("ourLaboratory") as string}
            </h2>
            <p className="max-w-2xl mx-auto text-gray-600 dark:text-dark-text">
              {t("laboratoryDescription") as string}
            </p>
          </div>

          {/* Gallery Grid - Enhanced with subtle shadows and hover effects */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {labImages.map((image, index) => (
              <div 
                key={index}
                className="relative overflow-hidden rounded-xl shadow-md aspect-square group transform hover:-translate-y-1 transition-all duration-300"
                style={{ 
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.03)"
                }}
              >
                <img 
                  src={image}
                  alt={`Lab image ${index + 1}`} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div 
                  className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end"
                >
                  <div className="p-3">
                    <span className="inline-block px-3 py-1 rounded-full text-white text-xs backdrop-blur-sm bg-white/10" style={{ backgroundColor: index % 2 === 0 ? "#94B9AF80" : "#DFB89B80" }}>
                      {index % 2 === 0 ? "LRM2E Lab" : "Research Equipment"} {index + 1}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - Updated with pastel colors */}
      <section id="contact" className="py-16 bg-white dark:bg-dark-bg">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-poppins font-bold mb-4" style={{ color: "#94B9AF" }}>
              {t("contact") as string}
            </h2>
            <p className="max-w-2xl mx-auto text-gray-600 dark:text-dark-text">
              {t("contactUs") as string}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Form - Redesigned with pastel colors */}
            <div className="bg-white dark:bg-dark-surface/90 rounded-2xl shadow-md p-8 border-t-4" style={{ borderColor: "#94B9AF" }}>
              <h3 className="text-xl font-poppins font-semibold mb-6" style={{ color: "#94B9AF" }}>
                {t("contactForm") as string}
              </h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel style={{ color: "#94B9AF" }}>{t("name") as string} *</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 dark:bg-dark-surface/50 dark:border-gray-700 focus:ring-[#94B9AF]" 
                            style={{ borderColor: "#E1E1E1",  }}
                          />
                        </FormControl>
                        <FormMessage>{t(form.formState.errors.name?.message || "")}</FormMessage>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel style={{ color: "#94B9AF" }}>{t("email") as string} *</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            type="email"
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 dark:bg-dark-surface/50 dark:border-gray-700 focus:ring-[#94B9AF]" 
                            style={{ borderColor: "#E1E1E1",  }}
                          />
                        </FormControl>
                        <FormMessage>{t(form.formState.errors.email?.message || "")}</FormMessage>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel style={{ color: "#94B9AF" }}>{t("subject") as string} *</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 dark:bg-dark-surface/50 dark:border-gray-700 focus:ring-[#94B9AF]" 
                            style={{ borderColor: "#E1E1E1",  }}
                          />
                        </FormControl>
                        <FormMessage>{t(form.formState.errors.subject?.message || "")}</FormMessage>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel style={{ color: "#94B9AF" }}>{t("message") as string} *</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field} 
                            rows={4}
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 dark:bg-dark-surface/50 dark:border-gray-700 focus:ring-[#94B9AF]" 
                            style={{ borderColor: "#E1E1E1",  }}
                          />
                        </FormControl>
                        <FormMessage>{t(form.formState.errors.message?.message || "")}</FormMessage>
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full px-6 py-3 text-white rounded-full hover:shadow-lg transition-all font-semibold transform hover:scale-[1.02]"
                    style={{ backgroundColor: "#DFB89B" }}
                    disabled={contactMutation.isPending}
                  >
                    {contactMutation.isPending ? (
                      <i className="fas fa-spinner fa-spin mr-2"></i>
                    ) : null}
                    {t("send") as string}
                  </Button>
                </form>
              </Form>
            </div>

            {/* Contact Information - Redesigned with pastel colors */}
            <div>
              <div className="bg-white dark:bg-dark-surface/90 rounded-2xl shadow-md p-8 mb-6 border-t-4" style={{ borderColor: "#DFB89B" }}>
                <h3 className="text-xl font-poppins font-semibold mb-6" style={{ color: "#DFB89B" }}>
                  {t("contactInfo") as string}
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="p-3 rounded-full mr-4" style={{ backgroundColor: "#F5F5F5" }}>
                      <i className="fas fa-map-marker-alt" style={{ color: "#DFB89B" }}></i>
                    </div>
                    <div>
                      <p className="font-semibold mb-1" style={{ color: "#94B9AF" }}>
                        {t("address") as string}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">123 Avenue de la Recherche, 75001 Paris, France</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="p-3 rounded-full mr-4" style={{ backgroundColor: "#F5F5F5" }}>
                      <i className="fas fa-phone" style={{ color: "#DFB89B" }}></i>
                    </div>
                    <div>
                      <p className="font-semibold mb-1" style={{ color: "#94B9AF" }}>
                        {t("phone") as string}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">+33 1 23 45 67 89</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="p-3 rounded-full mr-4" style={{ backgroundColor: "#F5F5F5" }}>
                      <i className="fas fa-envelope" style={{ color: "#DFB89B" }}></i>
                    </div>
                    <div>
                      <p className="font-semibold mb-1" style={{ color: "#94B9AF" }}>
                        {t("email") as string}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">contact@lrm2e.fr</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map - Redesigned */}
              <div className="bg-white dark:bg-dark-surface/90 rounded-2xl shadow-md p-4 h-64 relative overflow-hidden">
                <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  {/* This would be a real map in production */}
                  <div className="text-center">
                    <div className="h-16 w-16 rounded-full mx-auto flex items-center justify-center mb-4" style={{ backgroundColor: "#F5F5F5" }}>
                      <i className="fas fa-map-marked-alt text-2xl" style={{ color: "#94B9AF" }}></i>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 font-medium">
                      {t("interactiveMap") as string}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
