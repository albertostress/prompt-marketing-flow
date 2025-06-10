
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, UserPlus, Shield, Mail, Phone, Calendar, MoreVertical, Settings } from "lucide-react";

const teamMembers = [
  {
    id: 1,
    name: "Ana Silva",
    email: "ana@topbrands.ao",
    role: "Administrador",
    status: "Activo",
    lastLogin: "2024-01-16 09:30",
    campaigns: 12,
    avatar: "/placeholder.svg"
  },
  {
    id: 2,
    name: "João Santos",
    email: "joao@topbrands.ao",
    role: "Gestor Marketing",
    status: "Activo",
    lastLogin: "2024-01-16 08:15",
    campaigns: 8,
    avatar: "/placeholder.svg"
  },
  {
    id: 3,
    name: "Maria Costa",
    email: "maria@topbrands.ao",
    role: "Analista",
    status: "Inactivo",
    lastLogin: "2024-01-15 17:45",
    campaigns: 4,
    avatar: "/placeholder.svg"
  },
  {
    id: 4,
    name: "Carlos Mendes",
    email: "carlos@topbrands.ao",
    role: "Editor",
    status: "Activo",
    lastLogin: "2024-01-16 10:00",
    campaigns: 15,
    avatar: "/placeholder.svg"
  }
];

const rolePermissions = {
  "Administrador": ["Todas as permissões", "Gestão de utilizadores", "Configurações sistema"],
  "Gestor Marketing": ["Criar campanhas", "Editar campanhas", "Ver relatórios"],
  "Analista": ["Ver campanhas", "Ver relatórios", "Exportar dados"],
  "Editor": ["Criar campanhas", "Editar próprias campanhas"]
};

export const TeamManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [showAddUser, setShowAddUser] = useState(false);

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === "all" || member.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Administrador": return "destructive";
      case "Gestor Marketing": return "default";
      case "Analista": return "secondary";
      case "Editor": return "outline";
      default: return "secondary";
    }
  };

  const getStatusColor = (status: string) => {
    return status === "Activo" ? "default" : "secondary";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestão de Equipe</h1>
          <p className="text-muted-foreground">Gerir utilizadores e permissões do sistema</p>
        </div>
        <Button onClick={() => setShowAddUser(true)} className="bg-primary hover:bg-primary/90">
          <UserPlus className="h-4 w-4 mr-2" />
          Adicionar Utilizador
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-blue-500" />
              <span className="text-sm text-muted-foreground">Total Utilizadores</span>
            </div>
            <div className="text-2xl font-bold">4</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4 text-green-500" />
              <span className="text-sm text-muted-foreground">Activos</span>
            </div>
            <div className="text-2xl font-bold">3</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-purple-500" />
              <span className="text-sm text-muted-foreground">Online Hoje</span>
            </div>
            <div className="text-2xl font-bold">3</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Settings className="h-4 w-4 text-orange-500" />
              <span className="text-sm text-muted-foreground">Administradores</span>
            </div>
            <div className="text-2xl font-bold">1</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="Pesquisar utilizadores..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por função" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as funções</SelectItem>
                <SelectItem value="Administrador">Administrador</SelectItem>
                <SelectItem value="Gestor Marketing">Gestor Marketing</SelectItem>
                <SelectItem value="Analista">Analista</SelectItem>
                <SelectItem value="Editor">Editor</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">Exportar Lista</Button>
          </div>
        </CardContent>
      </Card>

      {/* Team Members Table */}
      <Card>
        <CardHeader>
          <CardTitle>Membros da Equipe</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Utilizador</TableHead>
                <TableHead>Função</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Último Login</TableHead>
                <TableHead>Campanhas</TableHead>
                <TableHead>Acções</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{member.name}</div>
                        <div className="text-sm text-muted-foreground">{member.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getRoleColor(member.role)}>
                      {member.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(member.status)}>
                      {member.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {member.lastLogin}
                  </TableCell>
                  <TableCell>{member.campaigns}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">Editar</Button>
                      <Button variant="outline" size="sm">Permissões</Button>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Role Permissions */}
      <Card>
        <CardHeader>
          <CardTitle>Permissões por Função</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(rolePermissions).map(([role, permissions]) => (
              <Card key={role}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">{role}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {permissions.map((permission, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-center">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                        {permission}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add User Modal - Simple version */}
      {showAddUser && (
        <Card className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <CardContent className="w-full max-w-md bg-background border rounded-lg p-6">
            <CardTitle className="mb-4">Adicionar Novo Utilizador</CardTitle>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Nome Completo</label>
                <Input placeholder="Ex: João Silva" />
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <Input type="email" placeholder="joao@empresa.com" />
              </div>
              <div>
                <label className="text-sm font-medium">Função</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar função" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="analista">Analista</SelectItem>
                    <SelectItem value="gestor">Gestor Marketing</SelectItem>
                    <SelectItem value="admin">Administrador</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex space-x-2">
                <Button onClick={() => setShowAddUser(false)} variant="outline" className="flex-1">
                  Cancelar
                </Button>
                <Button className="flex-1">Criar Utilizador</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
