import { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Truck,
  Mail,
  Lock,
  User,
  ArrowLeft,
  Users,
  Eye,
  EyeOff,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const mode = searchParams.get("mode") || "login";
  const defaultRole = searchParams.get("role") || "client";

  const [activeTab, setActiveTab] = useState(
    mode === "signup" ? "signup" : "login"
  );
  const [role, setRole] = useState<"client" | "driver">(
    defaultRole as "client" | "driver"
  );
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    setActiveTab(mode === "signup" ? "signup" : "login");
  }, [mode]);

  // =================== DUMMY LOGIN ===================
  const handleLogin = (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  setTimeout(() => {
    setIsLoading(false);

    // 🔒 HIDDEN ADMIN CREDENTIALS
    const ADMIN = {
      email: "admin@ezytranship.com",
      password: "admin@123",
    };

    const CLIENT = {
      email: "client@test.com",
      password: "client123",
    };

    const DRIVER = {
      email: "driver@test.com",
      password: "driver123",
    };

    // 🛠 ADMIN LOGIN (SILENT)
    if (email === ADMIN.email && password === ADMIN.password) {
      localStorage.setItem("role", "admin");

      toast({
        title: "Login successful",
        description: "Welcome back 👋",
      });

      navigate("/admin");
      return;
    }

    // 👤 CLIENT LOGIN
    if (email === CLIENT.email && password === CLIENT.password) {
      localStorage.setItem("role", "client");

      toast({
        title: "Login successful",
        description: "Welcome back 👋",
      });

      navigate("/client-dashboard");
      return;
    }

    // 🚚 DRIVER LOGIN
    if (email === DRIVER.email && password === DRIVER.password) {
      localStorage.setItem("role", "driver");

      toast({
        title: "Login successful",
        description: "Welcome back 👋",
      });

      navigate("/driver-dashboard");
      return;
    }

    // ❌ INVALID
    toast({
      title: "Invalid credentials",
      description: "Email or password is incorrect",
      variant: "destructive",
    });
  }, 800);
};


  // =================== DUMMY SIGNUP ===================
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Account Created (Dummy)",
        description: `Signed up as ${role.toUpperCase()}`,
      });

      setActiveTab("login");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setName("");
    }, 1000);
  };

  const handleSocialLogin = (provider: string) => {
    toast({
      title: "Coming Soon",
      description: `${provider} login will be available soon.`,
    });
  };

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
      {/* Back Button */}
      <Link
        to="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>

      <div className="w-full max-w-md animate-slide-up">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-accent text-accent-foreground">
              <Truck className="h-6 w-6" />
            </div>
            <span className="text-2xl font-bold">
              Fleet<span className="text-accent">Go</span>
            </span>
          </Link>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome</CardTitle>
            <CardDescription>
              {activeTab === "login"
                ? "Sign in to your account"
                : "Create a new account"}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger value="login">Log In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              {/* LOGIN */}
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label>Email</Label>
                    <Input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="client@test.com / driver@test.com"
                      required
                    />
                  </div>

                  <div>
                    <Label>Password</Label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="client123 / driver123"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                      >
                        {showPassword ? <EyeOff /> : <Eye />}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    variant="accent"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </TabsContent>

              {/* SIGNUP */}
              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      type="button"
                      variant={role === "client" ? "accent" : "outline"}
                      onClick={() => setRole("client")}
                    >
                      <Users className="mr-2" /> Client
                    </Button>
                    <Button
                      type="button"
                      variant={role === "driver" ? "accent" : "outline"}
                      onClick={() => setRole("driver")}
                    >
                      <Truck className="mr-2" /> Driver
                    </Button>
                  </div>

                  <Input
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <Input
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />

                  <Button
                    type="submit"
                    className="w-full"
                    variant="accent"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating..." : "Create Account"}
                  </Button>
                </form>
              </TabsContent>

              {/* SOCIAL */}
              <div className="mt-6 text-center text-sm text-muted-foreground">
                Social login coming soon 🚧
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
