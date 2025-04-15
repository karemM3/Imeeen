import { useState } from "react";
import { useTranslation } from "@/lib/i18n";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

const AdminPage = () => {
  const { t } = useTranslation();
  const { user, logoutMutation } = useAuth();
  const [_, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<string>("users");

  // Redirect if not admin
  if (user?.role !== "admin") {
    setLocation("/auth");
    return null;
  }

  // Query to get all users
  const { data: users, isLoading: usersLoading } = useQuery({
    queryKey: ["/api/admin/users"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/admin/users");
      return res.json();
    },
  });

  // Query to get all contact messages
  const { data: contactMessages, isLoading: messagesLoading } = useQuery({
    queryKey: ["/api/contact"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/contact");
      return res.json();
    },
  });

  // Mutation to update user role
  const updateUserRoleMutation = useMutation({
    mutationFn: async ({ userId, role }: { userId: number; role: string }) => {
      const res = await apiRequest("PATCH", `/api/admin/users/${userId}`, { role });
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: t("userRoleUpdated") as string,
        variant: "default",
        className: "bg-green-100 text-green-800",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
    },
    onError: (error) => {
      toast({
        title: t("errorUpdatingUser") as string,
        description: error instanceof Error ? error.message : String(error),
        variant: "destructive",
      });
    },
  });

  // Mutation to delete a contact message
  const deleteMessageMutation = useMutation({
    mutationFn: async (messageId: number) => {
      const res = await apiRequest("DELETE", `/api/contact/${messageId}`);
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: t("messageDeleted") as string,
        variant: "default",
        className: "bg-green-100 text-green-800",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/contact"] });
    },
    onError: (error) => {
      toast({
        title: t("errorDeletingMessage") as string,
        description: error instanceof Error ? error.message : String(error),
        variant: "destructive",
      });
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        setLocation("/auth");
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-surface">
      {/* Admin Header */}
      <header className="bg-white dark:bg-dark-bg shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: "#94B9AF" }}>
              {t("adminDashboard")}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {t("welcomeAdmin")} {user?.fullName || user?.username}
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

      {/* Admin Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start mb-6 bg-white dark:bg-dark-bg p-1 rounded-lg">
            <TabsTrigger 
              value="users" 
              className="flex items-center"
              style={{ color: activeTab === "users" ? "#94B9AF" : undefined }}
            >
              <i className="fas fa-users mr-2"></i>
              {t("users")}
            </TabsTrigger>
            <TabsTrigger 
              value="messages" 
              className="flex items-center"
              style={{ color: activeTab === "messages" ? "#94B9AF" : undefined }}
            >
              <i className="fas fa-envelope mr-2"></i>
              {t("contactMessages")}
            </TabsTrigger>
            <TabsTrigger 
              value="settings" 
              className="flex items-center"
              style={{ color: activeTab === "settings" ? "#94B9AF" : undefined }}
            >
              <i className="fas fa-cog mr-2"></i>
              {t("settings")}
            </TabsTrigger>
          </TabsList>
          
          {/* Users Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle style={{ color: "#94B9AF" }}>
                  {t("manageUsers")}
                </CardTitle>
                <CardDescription>
                  {t("manageUsersDescription")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {usersLoading ? (
                  <div className="py-8 text-center">
                    <i className="fas fa-spinner fa-spin text-2xl" style={{ color: "#94B9AF" }}></i>
                    <p className="mt-2">{t("loading")}</p>
                  </div>
                ) : users?.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                          <th className="text-left p-3">{t("username")}</th>
                          <th className="text-left p-3">{t("email")}</th>
                          <th className="text-left p-3">{t("fullName")}</th>
                          <th className="text-left p-3">{t("department")}</th>
                          <th className="text-left p-3">{t("role")}</th>
                          <th className="text-left p-3">{t("actions")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user: any) => (
                          <tr 
                            key={user.id} 
                            className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-dark-surface"
                          >
                            <td className="p-3">{user.username}</td>
                            <td className="p-3">{user.email}</td>
                            <td className="p-3">{user.fullName || "-"}</td>
                            <td className="p-3">{user.department || "-"}</td>
                            <td className="p-3">
                              <select 
                                value={user.role}
                                onChange={(e) => updateUserRoleMutation.mutate({
                                  userId: user.id,
                                  role: e.target.value
                                })}
                                className="p-1 border rounded-md bg-white dark:bg-dark-surface"
                              >
                                <option value="admin">{t("roleAdmin")}</option>
                                <option value="researcher">{t("roleResearcher")}</option>
                                <option value="user">{t("roleUser")}</option>
                              </select>
                            </td>
                            <td className="p-3">
                              <Button 
                                variant="ghost" 
                                className="h-8 w-8 p-0 text-red-500"
                                title={t("resetPassword") as string}
                              >
                                <i className="fas fa-key"></i>
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="py-4 text-center text-gray-500">
                    {t("noUsersFound")}
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Messages Tab */}
          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <CardTitle style={{ color: "#94B9AF" }}>
                  {t("contactMessages")}
                </CardTitle>
                <CardDescription>
                  {t("contactMessagesDescription")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {messagesLoading ? (
                  <div className="py-8 text-center">
                    <i className="fas fa-spinner fa-spin text-2xl" style={{ color: "#94B9AF" }}></i>
                    <p className="mt-2">{t("loading")}</p>
                  </div>
                ) : contactMessages?.length > 0 ? (
                  <div className="space-y-4">
                    {contactMessages.map((message: any) => (
                      <div 
                        key={message.id} 
                        className="p-4 bg-white dark:bg-dark-bg border border-gray-100 dark:border-gray-800 rounded-lg"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold" style={{ color: "#94B9AF" }}>
                              {message.subject}
                            </h3>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {t("from")}: {message.name} &lt;{message.email}&gt;
                            </div>
                            <div className="text-xs text-gray-500">
                              {new Date(message.createdAt).toLocaleString()}
                            </div>
                          </div>
                          <Button 
                            variant="ghost" 
                            className="h-8 w-8 p-0 text-red-500"
                            onClick={() => deleteMessageMutation.mutate(message.id)}
                            title={t("delete") as string}
                          >
                            <i className="fas fa-trash"></i>
                          </Button>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-dark-surface p-3 rounded">
                          {message.message}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="py-4 text-center text-gray-500">
                    {t("noMessagesFound")}
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle style={{ color: "#94B9AF" }}>
                  {t("siteSettings")}
                </CardTitle>
                <CardDescription>
                  {t("siteSettingsDescription")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 py-4 text-center">
                  {t("settingsComingSoon")}
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminPage;