
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Menu, Bell } from "lucide-react";

interface HeaderProps {
  onToggleSidebar: () => void;
}

export const Header = ({ onToggleSidebar }: HeaderProps) => {
  return (
    <header className="h-16 bg-card/80 backdrop-blur-xl border-b border-primary/20 flex items-center justify-between px-6 shadow-lg">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleSidebar}
          className="h-8 w-8 p-0 hover:bg-primary/10"
        >
          <Menu className="h-4 w-4 text-primary" />
        </Button>
        <div className="text-sm text-muted-foreground">
          Bem-vindo ao Dashboard <span className="control-x-text-gradient font-semibold">Control X</span>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 hover:bg-accent/10 relative"
        >
          <Bell className="h-4 w-4 text-accent" />
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-destructive rounded-full text-xs"></span>
        </Button>
        
        <ThemeToggle />
        
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 control-x-gradient rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white text-sm font-bold">AD</span>
          </div>
          <div className="hidden sm:block">
            <span className="text-sm font-medium">Admin</span>
            <p className="text-xs text-muted-foreground">Administrador</p>
          </div>
        </div>
      </div>
    </header>
  );
};
