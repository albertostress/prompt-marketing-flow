
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Circle, 
  Settings, 
  Calendar, 
  Users, 
  List, 
  Search,
  ChevronDown,
  ChevronRight,
  Zap
} from "lucide-react";

interface SidebarProps {
  collapsed: boolean;
  onToggle: (collapsed: boolean) => void;
}

export const Sidebar = ({ collapsed, onToggle }: SidebarProps) => {
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState<string[]>(['campaigns', 'contacts', 'orders']);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const isActive = (path: string) => location.pathname === path;
  const isExpanded = (section: string) => expandedSections.includes(section);

  const menuItems = [
    { title: "Dashboard", path: "/", icon: Circle },
    { title: "Analytics", path: "/analytics", icon: Search },
    {
      title: "Campanhas",
      icon: Calendar,
      section: "campaigns",
      children: [
        { title: "Activas", path: "/campaigns" },
        { title: "Criar Nova", path: "/campaigns/create" }
      ]
    },
    {
      title: "Contactos",
      icon: Users,
      section: "contacts",
      children: [
        { title: "Lista Geral", path: "/contacts" },
        { title: "Importar", path: "/contacts/import" }
      ]
    },
    {
      title: "Pedidos",
      icon: List,
      section: "orders",
      children: [
        { title: "Todos os Pedidos", path: "/orders" }
      ]
    },
    { title: "Marcas", path: "/brands", icon: Circle },
    { title: "Configurações", path: "/settings", icon: Settings }
  ];

  return (
    <div className={cn(
      "fixed left-0 top-0 h-full bg-card/90 backdrop-blur-xl border-r border-primary/20 transition-all duration-300 z-50 shadow-2xl",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Logo Control X */}
      <div className="h-16 flex items-center justify-center border-b border-primary/20 control-x-gradient">
        {collapsed ? (
          <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg text-white text-sm font-bold flex items-center justify-center shadow-lg">
            <Zap className="h-4 w-4" />
          </div>
        ) : (
          <div className="flex items-center space-x-2 text-white">
            <Zap className="h-6 w-6" />
            <span className="font-bold text-lg">Control</span>
            <span className="font-bold text-lg bg-accent text-accent-foreground px-2 py-1 rounded-lg text-sm">X</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item, index) => (
          <div key={index}>
            {item.children ? (
              <>
                <button
                  onClick={() => toggleSection(item.section!)}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    "hover:bg-primary/10 hover:text-primary hover:shadow-lg",
                    "text-muted-foreground"
                  )}
                >
                  <div className="flex items-center">
                    <item.icon className="h-4 w-4 mr-3" />
                    {!collapsed && <span>{item.title}</span>}
                  </div>
                  {!collapsed && (
                    isExpanded(item.section!) ? 
                      <ChevronDown className="h-4 w-4 text-accent" /> : 
                      <ChevronRight className="h-4 w-4 text-primary" />
                  )}
                </button>
                {!collapsed && isExpanded(item.section!) && (
                  <div className="ml-6 space-y-1 animate-fade-in">
                    {item.children.map((child, childIndex) => (
                      <Link
                        key={childIndex}
                        to={child.path}
                        className={cn(
                          "block px-3 py-2 rounded-lg text-sm transition-all duration-200",
                          isActive(child.path)
                            ? "control-x-gradient text-white shadow-lg"
                            : "text-muted-foreground hover:bg-accent/10 hover:text-accent hover:shadow-md"
                        )}
                      >
                        {child.title}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Link
                to={item.path}
                className={cn(
                  "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive(item.path)
                    ? "control-x-gradient text-white shadow-lg animate-glow"
                    : "text-muted-foreground hover:bg-primary/10 hover:text-primary hover:shadow-lg"
                )}
              >
                <item.icon className="h-4 w-4 mr-3" />
                {!collapsed && <span>{item.title}</span>}
              </Link>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};
