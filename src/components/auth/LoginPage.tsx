
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Eye, EyeOff, Zap, Shield, Users } from "lucide-react";

interface LoginPageProps {
  onLogin: () => void;
}

export const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 control-x-gradient rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/30 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Theme toggle */}
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>

      {/* Login card */}
      <Card className="w-full max-w-md mx-4 bg-card/80 backdrop-blur-xl border-primary/20 shadow-2xl animate-fade-in">
        <CardHeader className="text-center pb-8">
          {/* Logo Control X */}
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="control-x-gradient p-4 rounded-2xl shadow-lg animate-glow">
                <div className="flex items-center space-x-2">
                  <Zap className="h-8 w-8 text-white" />
                  <span className="text-2xl font-bold text-white">Control</span>
                  <span className="text-2xl font-bold text-accent-foreground bg-accent px-2 py-1 rounded-lg">X</span>
                </div>
              </div>
            </div>
          </div>
          
          <CardTitle className="text-2xl font-bold control-x-text-gradient">
            Bem-vindo ao Control X
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Dashboard de Marketing WhatsApp Multi-Marca
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="seu.email@exemplo.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="form-input"
                required
              />
            </div>

            {/* Password field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Senha
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="form-input pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* Submit button */}
            <Button
              type="submit"
              className="w-full btn-primary h-11 text-base font-semibold"
            >
              Entrar no Dashboard
            </Button>
          </form>

          {/* Features showcase */}
          <div className="mt-8 pt-6 border-t border-border">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="space-y-2">
                <div className="control-x-gradient p-2 rounded-lg mx-auto w-fit">
                  <Users className="h-4 w-4 text-white" />
                </div>
                <p className="text-xs text-muted-foreground">Multi-Marca</p>
              </div>
              <div className="space-y-2">
                <div className="control-x-gradient p-2 rounded-lg mx-auto w-fit">
                  <Zap className="h-4 w-4 text-white" />
                </div>
                <p className="text-xs text-muted-foreground">Automação</p>
              </div>
              <div className="space-y-2">
                <div className="control-x-gradient p-2 rounded-lg mx-auto w-fit">
                  <Shield className="h-4 w-4 text-white" />
                </div>
                <p className="text-xs text-muted-foreground">Seguro</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
