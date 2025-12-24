import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  BookOpen, 
  FileText, 
  Users, 
  Settings, 
  LogOut, 
  Home,
  Heart,
  Download,
  Video,
  MessageSquare
} from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const UserDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Get user info from localStorage
  const userEmail = localStorage.getItem("userEmail") || "user@example.com";
  const userName = localStorage.getItem("userName") || "User";
  const userInitials = userName.split(" ").map(n => n[0]).join("").toUpperCase();

  useState(() => {
    document.title = `Dashboard | BookHub`;
  });

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
    navigate("/");
  };

  const stats = [
    { label: "Books Read", value: "12", icon: BookOpen, color: "text-primary" },
    { label: "Documents", value: "8", icon: FileText, color: "text-accent" },
    { label: "Community Posts", value: "24", icon: MessageSquare, color: "text-blue-500" },
    { label: "Favorites", value: "15", icon: Heart, color: "text-destructive" },
  ];

  const recentActivity = [
    { title: "Downloaded Documentation", time: "2 hours ago", type: "download" },
    { title: "Joined Community Discussion", time: "5 hours ago", type: "community" },
    { title: "Watched Featured Video", time: "1 day ago", type: "video" },
    { title: "Registered Interest", time: "2 days ago", type: "registration" },
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-primary">
              <AvatarFallback className="bg-primary text-primary-foreground font-display font-semibold text-lg">
                {userInitials}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
                Welcome back, {userName}
              </h1>
              <p className="text-sm text-muted-foreground">{userEmail}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Link to="/">
              <Button variant="outline" size="sm" className="gap-1.5">
                <Home className="h-4 w-4" />
                Home
              </Button>
            </Link>
            <Button variant="ghost" size="sm" className="gap-1.5" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <Card key={stat.label} className="border border-border/50 bg-card hover:border-border hover:shadow-md transition-all duration-200">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  <span className="font-display text-2xl font-semibold text-foreground">
                    {stat.value}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Quick Actions */}
          <Card className="border border-border/50 bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="font-display text-lg">Quick Actions</CardTitle>
              <CardDescription className="text-xs">
                Access your favorite features
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link to="/details">
                <Button variant="outline" className="w-full justify-start gap-2 h-9 text-xs">
                  <FileText className="h-3.5 w-3.5" />
                  View Documentation
                </Button>
              </Link>
              <Button variant="outline" className="w-full justify-start gap-2 h-9 text-xs">
                <Download className="h-3.5 w-3.5" />
                Download Resources
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2 h-9 text-xs">
                <Users className="h-3.5 w-3.5" />
                Join Community
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2 h-9 text-xs">
                <Settings className="h-3.5 w-3.5" />
                Account Settings
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="border border-border/50 bg-card md:col-span-2 lg:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle className="font-display text-lg">Recent Activity</CardTitle>
              <CardDescription className="text-xs">
                Your latest actions and updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg border border-border/30 bg-muted/20 hover:bg-muted/40 transition-colors"
                  >
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      {activity.type === "download" && <Download className="h-4 w-4 text-primary" />}
                      {activity.type === "community" && <Users className="h-4 w-4 text-primary" />}
                      {activity.type === "video" && <Video className="h-4 w-4 text-primary" />}
                      {activity.type === "registration" && <Heart className="h-4 w-4 text-primary" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Profile Status */}
          <Card className="border border-border/50 bg-card md:col-span-2 lg:col-span-3">
            <CardHeader className="pb-3">
              <CardTitle className="font-display text-lg">Profile Status</CardTitle>
              <CardDescription className="text-xs">
                Complete your profile to unlock more features
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span className="text-sm text-foreground">Email Verified</span>
                  </div>
                  <Badge variant="outline" className="text-xs">Complete</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span className="text-sm text-foreground">Account Created</span>
                  </div>
                  <Badge variant="outline" className="text-xs">Complete</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-yellow-500" />
                    <span className="text-sm text-foreground">Community Member</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">In Progress</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-muted-foreground/30" />
                    <span className="text-sm text-muted-foreground">Profile Picture</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">Pending</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
