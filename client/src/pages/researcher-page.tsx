import { useState } from "react";
import { useTranslation } from "@/lib/i18n";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

// Schema for publication form
const publicationSchema = z.object({
  title: z.string().min(1, "titleRequired"),
  authors: z.string().min(1, "authorsRequired"),
  journal: z.string().min(1, "journalRequired"),
  year: z.string().min(1, "yearRequired"),
  abstract: z.string().optional(),
  doi: z.string().optional(),
  url: z.string().optional(),
});

type PublicationFormValues = z.infer<typeof publicationSchema>;

// Schema for experiment form
const experimentSchema = z.object({
  title: z.string().min(1, "titleRequired"),
  description: z.string().min(1, "descriptionRequired"),
  startDate: z.string().min(1, "startDateRequired"),
  endDate: z.string().optional(),
  status: z.string().min(1, "statusRequired"),
  equipment: z.string().optional(),
  notes: z.string().optional(),
});

type ExperimentFormValues = z.infer<typeof experimentSchema>;

const ResearcherPage = () => {
  const { t } = useTranslation();
  const { user, logoutMutation } = useAuth();
  const [_, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<string>("dashboard");

  // Redirect if not researcher or admin
  if (user?.role !== "researcher" && user?.role !== "admin") {
    setLocation("/auth");
    return null;
  }

  // Publication form
  const publicationForm = useForm<PublicationFormValues>({
    resolver: zodResolver(publicationSchema),
    defaultValues: {
      title: "",
      authors: "",
      journal: "",
      year: new Date().getFullYear().toString(),
      abstract: "",
      doi: "",
      url: "",
    },
  });

  // Experiment form
  const experimentForm = useForm<ExperimentFormValues>({
    resolver: zodResolver(experimentSchema),
    defaultValues: {
      title: "",
      description: "",
      startDate: new Date().toISOString().split("T")[0],
      endDate: "",
      status: "planned",
      equipment: "",
      notes: "",
    },
  });

  // Mock queries for publications
  const { data: publications, isLoading: publicationsLoading } = useQuery({
    queryKey: ["/api/researcher/publications"],
    queryFn: async () => {
      // This would be a real API call in production
      return [];
    },
  });

  // Mock queries for experiments
  const { data: experiments, isLoading: experimentsLoading } = useQuery({
    queryKey: ["/api/researcher/experiments"],
    queryFn: async () => {
      // This would be a real API call in production
      return [];
    },
  });

  // Mock queries for equipment
  const { data: equipment, isLoading: equipmentLoading } = useQuery({
    queryKey: ["/api/equipment"],
    queryFn: async () => {
      // This would be a real API call in production
      return [];
    },
  });

  // Mutation to add a new publication
  const addPublicationMutation = useMutation({
    mutationFn: async (data: PublicationFormValues) => {
      // This would be a real API call in production
      // const res = await apiRequest("POST", "/api/researcher/publications", data);
      // return res.json();
      return { success: true };
    },
    onSuccess: () => {
      toast({
        title: t("publicationAdded") as string,
        variant: "default",
        className: "bg-green-100 text-green-800",
      });
      publicationForm.reset();
      // queryClient.invalidateQueries({ queryKey: ["/api/researcher/publications"] });
    },
    onError: (error) => {
      toast({
        title: t("errorAddingPublication") as string,
        description: error instanceof Error ? error.message : String(error),
        variant: "destructive",
      });
    },
  });

  // Mutation to add a new experiment
  const addExperimentMutation = useMutation({
    mutationFn: async (data: ExperimentFormValues) => {
      // This would be a real API call in production
      // const res = await apiRequest("POST", "/api/researcher/experiments", data);
      // return res.json();
      return { success: true };
    },
    onSuccess: () => {
      toast({
        title: t("experimentAdded") as string,
        variant: "default",
        className: "bg-green-100 text-green-800",
      });
      experimentForm.reset();
      // queryClient.invalidateQueries({ queryKey: ["/api/researcher/experiments"] });
    },
    onError: (error) => {
      toast({
        title: t("errorAddingExperiment") as string,
        description: error instanceof Error ? error.message : String(error),
        variant: "destructive",
      });
    },
  });

  // Handle publication form submission
  const onPublicationSubmit = (data: PublicationFormValues) => {
    addPublicationMutation.mutate(data);
  };

  // Handle experiment form submission
  const onExperimentSubmit = (data: ExperimentFormValues) => {
    addExperimentMutation.mutate(data);
  };

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        setLocation("/auth");
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-surface">
      {/* Researcher Header */}
      <header className="bg-white dark:bg-dark-bg shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: "#94B9AF" }}>
              {t("researcherDashboard")}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {t("welcomeResearcher")} {user?.fullName || user?.username}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={() => setLocation("/")}
              className="border-[#94B9AF] text-[#94B9AF]"
            >
              <i className="fas fa-home mr-2"></i>
              {t("backToSite")}
            </Button>
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="border-[#DFB89B] text-[#DFB89B]"
            >
              <i className="fas fa-sign-out-alt mr-2"></i>
              {t("logout")}
            </Button>
          </div>
        </div>
      </header>

      {/* Researcher Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start mb-6 bg-white dark:bg-dark-bg p-1 rounded-lg">
            <TabsTrigger 
              value="dashboard" 
              className="flex items-center"
              style={{ color: activeTab === "dashboard" ? "#94B9AF" : undefined }}
            >
              <i className="fas fa-chart-line mr-2"></i>
              {t("dashboard")}
            </TabsTrigger>
            <TabsTrigger 
              value="publications" 
              className="flex items-center"
              style={{ color: activeTab === "publications" ? "#94B9AF" : undefined }}
            >
              <i className="fas fa-book mr-2"></i>
              {t("publications")}
            </TabsTrigger>
            <TabsTrigger 
              value="experiments" 
              className="flex items-center"
              style={{ color: activeTab === "experiments" ? "#94B9AF" : undefined }}
            >
              <i className="fas fa-flask mr-2"></i>
              {t("experiments")}
            </TabsTrigger>
            <TabsTrigger 
              value="equipment" 
              className="flex items-center"
              style={{ color: activeTab === "equipment" ? "#94B9AF" : undefined }}
            >
              <i className="fas fa-microscope mr-2"></i>
              {t("equipment")}
            </TabsTrigger>
            <TabsTrigger 
              value="profile" 
              className="flex items-center"
              style={{ color: activeTab === "profile" ? "#94B9AF" : undefined }}
            >
              <i className="fas fa-user mr-2"></i>
              {t("profile")}
            </TabsTrigger>
          </TabsList>
          
          {/* Dashboard Tab */}
          <TabsContent value="dashboard">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg" style={{ color: "#94B9AF" }}>
                    <i className="fas fa-book mr-2"></i>
                    {t("publications")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold" style={{ color: "#94B9AF" }}>
                    0
                  </div>
                  <p className="text-sm text-gray-500">
                    {t("totalPublications")}
                  </p>
                  <Button 
                    variant="ghost" 
                    className="w-full mt-4 text-sm border-t pt-2"
                    onClick={() => setActiveTab("publications")}
                    style={{ color: "#94B9AF" }}
                  >
                    <i className="fas fa-plus mr-2"></i>
                    {t("addPublication")}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg" style={{ color: "#94B9AF" }}>
                    <i className="fas fa-flask mr-2"></i>
                    {t("experiments")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold" style={{ color: "#94B9AF" }}>
                    0
                  </div>
                  <p className="text-sm text-gray-500">
                    {t("activeExperiments")}
                  </p>
                  <Button 
                    variant="ghost" 
                    className="w-full mt-4 text-sm border-t pt-2"
                    onClick={() => setActiveTab("experiments")}
                    style={{ color: "#94B9AF" }}
                  >
                    <i className="fas fa-plus mr-2"></i>
                    {t("addExperiment")}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg" style={{ color: "#94B9AF" }}>
                    <i className="fas fa-microscope mr-2"></i>
                    {t("equipment")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold" style={{ color: "#94B9AF" }}>
                    0
                  </div>
                  <p className="text-sm text-gray-500">
                    {t("availableEquipment")}
                  </p>
                  <Button 
                    variant="ghost" 
                    className="w-full mt-4 text-sm border-t pt-2"
                    onClick={() => setActiveTab("equipment")}
                    style={{ color: "#94B9AF" }}
                  >
                    <i className="fas fa-calendar-alt mr-2"></i>
                    {t("reserveEquipment")}
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle style={{ color: "#94B9AF" }}>
                  {t("recentActivity")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <i className="fas fa-chart-line text-4xl mb-2" style={{ color: "#DFB89B" }}></i>
                  <p>{t("noRecentActivity")}</p>
                  <p className="text-sm mt-2">
                    {t("startByAddingContent")}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Publications Tab */}
          <TabsContent value="publications">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle style={{ color: "#94B9AF" }}>
                      {t("myPublications")}
                    </CardTitle>
                    <CardDescription>
                      {t("publicationsDescription")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-gray-500">
                      <i className="fas fa-book text-4xl mb-2" style={{ color: "#DFB89B" }}></i>
                      <p>{t("noPublicationsYet")}</p>
                      <p className="text-sm mt-2">
                        {t("addYourFirstPublication")}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle style={{ color: "#94B9AF" }}>
                      {t("addPublication")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={publicationForm.handleSubmit(onPublicationSubmit)} className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium" style={{ color: "#94B9AF" }}>
                          {t("title")} *
                        </label>
                        <Input
                          {...publicationForm.register("title")}
                          className="w-full border rounded-md"
                        />
                        {publicationForm.formState.errors.title && (
                          <p className="text-red-500 text-xs">
                            {t(publicationForm.formState.errors.title.message as any)}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium" style={{ color: "#94B9AF" }}>
                          {t("authors")} *
                        </label>
                        <Input
                          {...publicationForm.register("authors")}
                          className="w-full border rounded-md"
                          placeholder={t("authorsPlaceholder") as string}
                        />
                        {publicationForm.formState.errors.authors && (
                          <p className="text-red-500 text-xs">
                            {t(publicationForm.formState.errors.authors.message as any)}
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium" style={{ color: "#94B9AF" }}>
                            {t("journal")} *
                          </label>
                          <Input
                            {...publicationForm.register("journal")}
                            className="w-full border rounded-md"
                          />
                          {publicationForm.formState.errors.journal && (
                            <p className="text-red-500 text-xs">
                              {t(publicationForm.formState.errors.journal.message as any)}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium" style={{ color: "#94B9AF" }}>
                            {t("year")} *
                          </label>
                          <Input
                            {...publicationForm.register("year")}
                            className="w-full border rounded-md"
                            type="number"
                            min="1900"
                            max="2100"
                          />
                          {publicationForm.formState.errors.year && (
                            <p className="text-red-500 text-xs">
                              {t(publicationForm.formState.errors.year.message as any)}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium" style={{ color: "#94B9AF" }}>
                          {t("abstract")}
                        </label>
                        <Textarea
                          {...publicationForm.register("abstract")}
                          className="w-full border rounded-md"
                          rows={4}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium" style={{ color: "#94B9AF" }}>
                            {t("doi")}
                          </label>
                          <Input
                            {...publicationForm.register("doi")}
                            className="w-full border rounded-md"
                            placeholder="10.xxxx/xxxxx"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium" style={{ color: "#94B9AF" }}>
                            {t("url")}
                          </label>
                          <Input
                            {...publicationForm.register("url")}
                            className="w-full border rounded-md"
                            type="url"
                            placeholder="https://"
                          />
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className="w-full"
                        style={{ backgroundColor: "#94B9AF", color: "white" }}
                        disabled={addPublicationMutation.isPending}
                      >
                        {addPublicationMutation.isPending ? (
                          <span className="flex items-center gap-2">
                            <i className="fas fa-spinner fa-spin"></i>
                            {t("saving")}
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <i className="fas fa-plus"></i>
                            {t("addPublication")}
                          </span>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          {/* Experiments Tab */}
          <TabsContent value="experiments">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle style={{ color: "#94B9AF" }}>
                      {t("myExperiments")}
                    </CardTitle>
                    <CardDescription>
                      {t("experimentsDescription")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-gray-500">
                      <i className="fas fa-flask text-4xl mb-2" style={{ color: "#DFB89B" }}></i>
                      <p>{t("noExperimentsYet")}</p>
                      <p className="text-sm mt-2">
                        {t("addYourFirstExperiment")}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle style={{ color: "#94B9AF" }}>
                      {t("addExperiment")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={experimentForm.handleSubmit(onExperimentSubmit)} className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium" style={{ color: "#94B9AF" }}>
                          {t("title")} *
                        </label>
                        <Input
                          {...experimentForm.register("title")}
                          className="w-full border rounded-md"
                        />
                        {experimentForm.formState.errors.title && (
                          <p className="text-red-500 text-xs">
                            {t(experimentForm.formState.errors.title.message as any)}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium" style={{ color: "#94B9AF" }}>
                          {t("description")} *
                        </label>
                        <Textarea
                          {...experimentForm.register("description")}
                          className="w-full border rounded-md"
                          rows={3}
                        />
                        {experimentForm.formState.errors.description && (
                          <p className="text-red-500 text-xs">
                            {t(experimentForm.formState.errors.description.message as any)}
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium" style={{ color: "#94B9AF" }}>
                            {t("startDate")} *
                          </label>
                          <Input
                            {...experimentForm.register("startDate")}
                            className="w-full border rounded-md"
                            type="date"
                          />
                          {experimentForm.formState.errors.startDate && (
                            <p className="text-red-500 text-xs">
                              {t(experimentForm.formState.errors.startDate.message as any)}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium" style={{ color: "#94B9AF" }}>
                            {t("endDate")}
                          </label>
                          <Input
                            {...experimentForm.register("endDate")}
                            className="w-full border rounded-md"
                            type="date"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium" style={{ color: "#94B9AF" }}>
                          {t("status")} *
                        </label>
                        <select
                          {...experimentForm.register("status")}
                          className="w-full p-2 border rounded-md"
                        >
                          <option value="planned">{t("statusPlanned")}</option>
                          <option value="in_progress">{t("statusInProgress")}</option>
                          <option value="completed">{t("statusCompleted")}</option>
                          <option value="cancelled">{t("statusCancelled")}</option>
                        </select>
                        {experimentForm.formState.errors.status && (
                          <p className="text-red-500 text-xs">
                            {t(experimentForm.formState.errors.status.message as any)}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium" style={{ color: "#94B9AF" }}>
                          {t("equipment")}
                        </label>
                        <Input
                          {...experimentForm.register("equipment")}
                          className="w-full border rounded-md"
                          placeholder={t("equipmentPlaceholder") as string}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium" style={{ color: "#94B9AF" }}>
                          {t("notes")}
                        </label>
                        <Textarea
                          {...experimentForm.register("notes")}
                          className="w-full border rounded-md"
                          rows={3}
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full"
                        style={{ backgroundColor: "#94B9AF", color: "white" }}
                        disabled={addExperimentMutation.isPending}
                      >
                        {addExperimentMutation.isPending ? (
                          <span className="flex items-center gap-2">
                            <i className="fas fa-spinner fa-spin"></i>
                            {t("saving")}
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <i className="fas fa-plus"></i>
                            {t("addExperiment")}
                          </span>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          {/* Equipment Tab */}
          <TabsContent value="equipment">
            <Card>
              <CardHeader>
                <CardTitle style={{ color: "#94B9AF" }}>
                  {t("laboratoryEquipment")}
                </CardTitle>
                <CardDescription>
                  {t("equipmentDescription")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Sample equipment cards */}
                  <div className="border rounded-lg p-4 bg-white dark:bg-dark-bg shadow-sm">
                    <div className="mb-2">
                      <h3 className="font-semibold" style={{ color: "#94B9AF" }}>
                        Scanning Electron Microscope
                      </h3>
                      <p className="text-xs text-gray-500">
                        <i className="fas fa-map-marker-alt mr-1"></i> Room 103
                      </p>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      High-resolution imaging for nanoscale materials analysis.
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                        Available
                      </span>
                      <Button 
                        size="sm"
                        className="text-xs" 
                        style={{ backgroundColor: "#DFB89B", color: "white" }}
                      >
                        {t("reserve")}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4 bg-white dark:bg-dark-bg shadow-sm">
                    <div className="mb-2">
                      <h3 className="font-semibold" style={{ color: "#94B9AF" }}>
                        X-ray Diffractometer
                      </h3>
                      <p className="text-xs text-gray-500">
                        <i className="fas fa-map-marker-alt mr-1"></i> Room 205
                      </p>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      Analysis of crystalline materials and thin films.
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="inline-block px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                        Reserved
                      </span>
                      <Button 
                        size="sm"
                        className="text-xs" 
                        style={{ backgroundColor: "#DFB89B", color: "white" }}
                        disabled
                      >
                        {t("viewSchedule")}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4 bg-white dark:bg-dark-bg shadow-sm">
                    <div className="mb-2">
                      <h3 className="font-semibold" style={{ color: "#94B9AF" }}>
                        Electrochemical Workstation
                      </h3>
                      <p className="text-xs text-gray-500">
                        <i className="fas fa-map-marker-alt mr-1"></i> Room 112
                      </p>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      For electrochemical analysis and battery testing.
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                        Available
                      </span>
                      <Button 
                        size="sm"
                        className="text-xs" 
                        style={{ backgroundColor: "#DFB89B", color: "white" }}
                      >
                        {t("reserve")}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle style={{ color: "#94B9AF" }}>
                  {t("myProfile")}
                </CardTitle>
                <CardDescription>
                  {t("profileDescription")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
                    <i className="fas fa-user text-4xl text-gray-400"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold" style={{ color: "#94B9AF" }}>
                      {user?.fullName || user?.username}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {user?.department ? <span>{user.department} • </span> : null}
                      {user?.position || t("researcher")}
                    </p>
                    <p className="text-sm mt-1">
                      <i className="fas fa-envelope mr-1 text-gray-400"></i> {user?.email}
                    </p>
                    <Button 
                      className="mt-3 text-sm" 
                      variant="outline"
                      style={{ borderColor: "#DFB89B", color: "#DFB89B" }}
                    >
                      <i className="fas fa-edit mr-1"></i> {t("editProfile")}
                    </Button>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-3" style={{ color: "#94B9AF" }}>
                    {t("accountSettings")}
                  </h3>
                  <div className="space-y-3">
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-left"
                    >
                      <i className="fas fa-key mr-2 w-6 text-gray-400"></i> {t("changePassword")}
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-left"
                    >
                      <i className="fas fa-bell mr-2 w-6 text-gray-400"></i> {t("notificationSettings")}
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-left"
                    >
                      <i className="fas fa-shield-alt mr-2 w-6 text-gray-400"></i> {t("privacySettings")}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default ResearcherPage;