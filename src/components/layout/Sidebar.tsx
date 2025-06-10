
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
  Chevron-down,
  Chevron-right
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
      "fixed left-0 top-0 h-full bg-card border-r border-border transition-all duration-300 z-50",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Logo */}
      <div className="h-16 flex items-center justify-center border-b border-border bg-primary">
        {collapsed ? (
          <div className="w-8 h-8 bg-primary-foreground rounded text-primary text-sm font-bold flex items-center justify-center">
            TB
          </div>
        ) : (
          <div className="text-primary-foreground font-bold text-lg">
            TOP BRANDS ANGOLA
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
                    "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    "hover:bg-accent hover:text-accent-foreground",
                    "text-muted-foreground"
                  )}
                >
                  <div className="flex items-center">
                    <item.icon className="h-4 w-4 mr-3" />
                    {!collapsed && <span>{item.title}</span>}
                  </div>
                  {!collapsed && (
                    isExpanded(item.section!) ? 
                      <Chevron-down className="h-4 w-4" /> : 
                      <Chevron-right className="h-4 w-4" />
                  )}
                </button>
                {!collapsed && isExpanded(item.section!) && (
                  <div className="ml-6 space-y-1">
                    {item.children.map((child, childIndex) => (
                      <Link
                        key={childIndex}
                        to={child.path}
                        className={cn(
                          "block px-3 py-2 rounded-lg text-sm transition-colors",
                          isActive(child.path)
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
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
                  "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive(item.path)
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
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
