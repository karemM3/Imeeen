import { useState, useEffect } from "react";
import { useTranslation } from "@/lib/i18n";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import AnimatedLogo from "@/components/AnimatedLogo";

// Login form schema
const loginFormSchema = z.object({
  username: z.string().min(3, "usernameMinLength"),
  password: z.string().min(6, "passwordMinLength"),
});

// Registration form schema
const registerFormSchema = z.object({
  username: z.string().min(3, "usernameMinLength"),
  email: z.string().email("invalidEmail"),
  password: z.string().min(6, "passwordMinLength"),
  fullName: z.string().optional(),
  department: z.string().optional(),
  position: z.string().optional(),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;
type RegisterFormValues = z.infer<typeof registerFormSchema>;

const AuthPage = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { user, loginMutation, registerMutation } = useAuth();
  const [activeTab, setActiveTab] = useState<string>("login");
  const [_, setLocation] = useLocation();
  
  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        setLocation("/admin");
      } else if (user.role === "researcher") {
        setLocation("/researcher");
      } else {
        setLocation("/");
      }
    }
  }, [user, setLocation]);
  
  // Login form
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  
  // Register form
  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      fullName: "",
      department: "",
      position: "",
    },
  });
  
  // Handle login submission
  const onLoginSubmit = (data: LoginFormValues) => {
    loginMutation.mutate(data);
  };
  
  // Handle registration submission
  const onRegisterSubmit = (data: RegisterFormValues) => {
    registerMutation.mutate({
      ...data,
      role: "researcher", // Default role for new registrations through the form
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Auth form */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-8 bg-gray-50 dark:bg-dark-surface">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <AnimatedLogo className="mx-auto h-16 w-16 mb-4" />
            <h1 className="text-2xl font-bold" style={{ color: "#94B9AF" }}>
              {t("authTitle")}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {t("authSubtitle")}
            </p>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="login" style={{ color: activeTab === "login" ? "#94B9AF" : undefined }}>
                {t("login")}
              </TabsTrigger>
              <TabsTrigger value="register" style={{ color: activeTab === "register" ? "#94B9AF" : undefined }}>
                {t("register")}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <Card className="border-none shadow-md">
                <CardHeader>
                  <CardTitle style={{ color: "#94B9AF" }}>{t("loginTitle")}</CardTitle>
                  <CardDescription>{t("loginDescription")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium" style={{ color: "#94B9AF" }}>
                        {t("username")}
                      </label>
                      <Input
                        {...loginForm.register("username")}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#94B9AF]"
                        placeholder={t("usernamePlaceholder") as string}
                      />
                      {loginForm.formState.errors.username && (
                        <p className="text-red-500 text-xs">
                          {t(loginForm.formState.errors.username.message as any)}
                        </p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium" style={{ color: "#94B9AF" }}>
                        {t("password")}
                      </label>
                      <Input
                        {...loginForm.register("password")}
                        type="password"
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#94B9AF]"
                        placeholder={t("passwordPlaceholder") as string}
                      />
                      {loginForm.formState.errors.password && (
                        <p className="text-red-500 text-xs">
                          {t(loginForm.formState.errors.password.message as any)}
                        </p>
                      )}
                    </div>
                    
                    <Button
                      type="submit"
                      className="w-full p-3 rounded-lg text-white font-medium"
                      style={{ backgroundColor: "#94B9AF" }}
                      disabled={loginMutation.isPending}
                    >
                      {loginMutation.isPending ? (
                        <span className="flex items-center gap-2">
                          <i className="fas fa-spinner fa-spin"></i>
                          {t("loading")}
                        </span>
                      ) : (
                        t("login")
                      )}
                    </Button>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <a href="#" className="text-sm" style={{ color: "#DFB89B" }}>
                    {t("forgotPassword")}
                  </a>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="register">
              <Card className="border-none shadow-md">
                <CardHeader>
                  <CardTitle style={{ color: "#94B9AF" }}>{t("registerTitle")}</CardTitle>
                  <CardDescription>{t("registerDescription")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium" style={{ color: "#94B9AF" }}>
                        {t("username")} *
                      </label>
                      <Input
                        {...registerForm.register("username")}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#94B9AF]"
                        placeholder={t("usernamePlaceholder") as string}
                      />
                      {registerForm.formState.errors.username && (
                        <p className="text-red-500 text-xs">
                          {t(registerForm.formState.errors.username.message as any)}
                        </p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium" style={{ color: "#94B9AF" }}>
                        {t("email")} *
                      </label>
                      <Input
                        {...registerForm.register("email")}
                        type="email"
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#94B9AF]"
                        placeholder={t("emailPlaceholder") as string}
                      />
                      {registerForm.formState.errors.email && (
                        <p className="text-red-500 text-xs">
                          {t(registerForm.formState.errors.email.message as any)}
                        </p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium" style={{ color: "#94B9AF" }}>
                        {t("password")} *
                      </label>
                      <Input
                        {...registerForm.register("password")}
                        type="password"
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#94B9AF]"
                        placeholder={t("passwordPlaceholder") as string}
                      />
                      {registerForm.formState.errors.password && (
                        <p className="text-red-500 text-xs">
                          {t(registerForm.formState.errors.password.message as any)}
                        </p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium" style={{ color: "#94B9AF" }}>
                        {t("fullName")}
                      </label>
                      <Input
                        {...registerForm.register("fullName")}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#94B9AF]"
                        placeholder={t("fullNamePlaceholder") as string}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium" style={{ color: "#94B9AF" }}>
                        {t("department")}
                      </label>
                      <Input
                        {...registerForm.register("department")}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#94B9AF]"
                        placeholder={t("departmentPlaceholder") as string}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium" style={{ color: "#94B9AF" }}>
                        {t("position")}
                      </label>
                      <Input
                        {...registerForm.register("position")}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#94B9AF]"
                        placeholder={t("positionPlaceholder") as string}
                      />
                    </div>
                    
                    <Button
                      type="submit"
                      className="w-full p-3 rounded-lg text-white font-medium"
                      style={{ backgroundColor: "#DFB89B" }}
                      disabled={registerMutation.isPending}
                    >
                      {registerMutation.isPending ? (
                        <span className="flex items-center gap-2">
                          <i className="fas fa-spinner fa-spin"></i>
                          {t("loading")}
                        </span>
                      ) : (
                        t("register")
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* Right side - Hero image */}
      <div className="hidden md:flex flex-1 relative bg-gradient-to-br from-[#94B9AF]/70 to-[#DFB89B]/70">
        <div className="absolute inset-0 flex flex-col items-center justify-center p-10 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">{t("labName")}</h2>
          <p className="mb-6 max-w-md text-lg">
            {t("authHeroText")}
          </p>
          <div className="flex flex-col items-center space-y-3">
            <div className="flex items-center space-x-2">
              <i className="fas fa-flask text-white/80"></i>
              <span>{t("researchBenefit1")}</span>
            </div>
            <div className="flex items-center space-x-2">
              <i className="fas fa-users text-white/80"></i>
              <span>{t("researchBenefit2")}</span>
            </div>
            <div className="flex items-center space-x-2">
              <i className="fas fa-calendar-alt text-white/80"></i>
              <span>{t("researchBenefit3")}</span>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-black/10"></div>
      </div>
    </div>
  );
};

export default AuthPage;