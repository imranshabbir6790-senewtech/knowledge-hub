import { useState, useEffect } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, ArrowRight, ChevronLeft, Heart, Users } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/i18n/LanguageContext";
import { cn } from "@/lib/utils";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialMode = searchParams.get("mode") === "register" ? "register" : "login";
  const [activeTab, setActiveTab] = useState(initialMode);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { t, isRTL } = useLanguage();

  // Form states
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [wantsToVolunteer, setWantsToVolunteer] = useState(false);
  const [registerInterest, setRegisterInterest] = useState(false);

  useEffect(() => {
    setActiveTab(initialMode);
    document.title = initialMode === "register" ? "Register | BookHub" : "Sign In | BookHub";
  }, [initialMode]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Dummy authentication - accepts any email/password
    setTimeout(() => {
      // Store auth state
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userEmail", loginEmail);
      localStorage.setItem("userName", loginEmail.split("@")[0]);
      
      toast({
        title: "Login successful",
        description: "Welcome back! Redirecting to your dashboard...",
      });
      
      setIsLoading(false);
      
      // Redirect to dashboard
      setTimeout(() => {
        navigate("/dashboard");
      }, 500);
    }, 1000);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (registerPassword !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Dummy registration - accepts any credentials
    setTimeout(() => {
      // Store auth state
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userEmail", registerEmail);
      localStorage.setItem("userName", registerName);
      
      toast({
        title: "Registration successful",
        description: "Welcome! Redirecting to your dashboard...",
      });
      
      setIsLoading(false);
      
      // Redirect to dashboard
      setTimeout(() => {
        navigate("/dashboard");
      }, 500);
    }, 1000);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-md mx-auto">
          <Link 
            to="/" 
            className={cn(
              "inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8",
              isRTL && "flex-row-reverse"
            )}
          >
            <ChevronLeft className={cn("h-4 w-4", isRTL && "rotate-180")} />
            {t("home")}
          </Link>

          <Card className="elevated-card">
            <CardHeader className="text-center pb-2">
              <div className="h-14 w-14 rounded-lg bg-primary flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-foreground font-display font-bold text-xl">B</span>
              </div>
              <CardTitle className="font-display text-2xl">Welcome to BookHub</CardTitle>
              <CardDescription>
                {t("authDesc")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login">{t("signIn")}</TabsTrigger>
                  <TabsTrigger value="register">{t("register")}</TabsTrigger>
                </TabsList>

                {/* Login Tab */}
                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">{t("email")}</Label>
                      <div className="relative">
                        <Mail className={cn("absolute top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground", isRTL ? "right-3" : "left-3")} />
                        <Input
                          id="login-email"
                          type="email"
                          placeholder="you@example.com"
                          className={cn(isRTL ? "pr-10" : "pl-10")}
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="login-password">{t("password")}</Label>
                      <div className="relative">
                        <Lock className={cn("absolute top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground", isRTL ? "right-3" : "left-3")} />
                        <Input
                          id="login-password"
                          type="password"
                          placeholder="••••••••"
                          className={cn(isRTL ? "pr-10" : "pl-10")}
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      variant="default" 
                      className="w-full gap-1.5"
                      disabled={isLoading}
                    >
                      {isLoading ? "..." : t("signIn")}
                      <ArrowRight className={cn("h-4 w-4", isRTL && "rotate-180")} />
                    </Button>
                  </form>
                </TabsContent>

                {/* Register Tab */}
                <TabsContent value="register">
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-name">{t("fullName")}</Label>
                      <div className="relative">
                        <User className={cn("absolute top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground", isRTL ? "right-3" : "left-3")} />
                        <Input
                          id="register-name"
                          type="text"
                          placeholder="John Doe"
                          className={cn(isRTL ? "pr-10" : "pl-10")}
                          value={registerName}
                          onChange={(e) => setRegisterName(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-email">{t("email")}</Label>
                      <div className="relative">
                        <Mail className={cn("absolute top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground", isRTL ? "right-3" : "left-3")} />
                        <Input
                          id="register-email"
                          type="email"
                          placeholder="you@example.com"
                          className={cn(isRTL ? "pr-10" : "pl-10")}
                          value={registerEmail}
                          onChange={(e) => setRegisterEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-password">{t("password")}</Label>
                      <div className="relative">
                        <Lock className={cn("absolute top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground", isRTL ? "right-3" : "left-3")} />
                        <Input
                          id="register-password"
                          type="password"
                          placeholder="••••••••"
                          className={cn(isRTL ? "pr-10" : "pl-10")}
                          value={registerPassword}
                          onChange={(e) => setRegisterPassword(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">{t("confirmPassword")}</Label>
                      <div className="relative">
                        <Lock className={cn("absolute top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground", isRTL ? "right-3" : "left-3")} />
                        <Input
                          id="confirm-password"
                          type="password"
                          placeholder="••••••••"
                          className={cn(isRTL ? "pr-10" : "pl-10")}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    {/* Interest/Volunteer Options */}
                    <div className="space-y-3 pt-2">
                      <div className={cn("flex items-center space-x-3", isRTL && "flex-row-reverse space-x-reverse")}>
                        <Checkbox
                          id="register-interest"
                          checked={registerInterest}
                          onCheckedChange={(checked) => setRegisterInterest(checked as boolean)}
                        />
                        <Label 
                          htmlFor="register-interest" 
                          className={cn("text-sm font-normal cursor-pointer flex items-center gap-2", isRTL && "flex-row-reverse")}
                        >
                          <Heart className="h-4 w-4 text-accent" />
                          {t("registerInterest")}
                        </Label>
                      </div>

                      <div className={cn("flex items-center space-x-3", isRTL && "flex-row-reverse space-x-reverse")}>
                        <Checkbox
                          id="volunteer"
                          checked={wantsToVolunteer}
                          onCheckedChange={(checked) => setWantsToVolunteer(checked as boolean)}
                        />
                        <Label 
                          htmlFor="volunteer" 
                          className={cn("text-sm font-normal cursor-pointer flex items-center gap-2", isRTL && "flex-row-reverse")}
                        >
                          <Users className="h-4 w-4 text-primary" />
                          {t("volunteerInterest")}
                        </Label>
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      variant="default" 
                      className="w-full gap-1.5"
                      disabled={isLoading}
                    >
                      {isLoading ? "..." : t("createAccount")}
                      <ArrowRight className={cn("h-4 w-4", isRTL && "rotate-180")} />
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Auth;
