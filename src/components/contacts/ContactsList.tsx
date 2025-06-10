
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";
import { Users, Search, Calendar } from "lucide-react";

export const ContactsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const contacts = [
    {
      id: 1,
      name: "João Silva",
      phone: "+244 923 456 789",
      email: "joao.silva@email.com",
      brand: "Marca A",
      lastInteraction: "2024-01-15",
      status: "Activo",
      tags: ["VIP", "Luanda"]
    },
    {
      id: 2,
      name: "Maria Santos",
      phone: "+244 924 567 890",
      email: "maria.santos@email.com",
      brand: "Marca B",
      lastInteraction: "2024-01-14",
      status: "Activo",
      tags: ["Cliente", "Benguela"]
    },
    {
      id: 3,
      name: "Pedro Costa",
      phone: "+244 925 678 901",
      email: "pedro.costa@email.com",
      brand: "Marca C",
      lastInteraction: "2024-01-12",
      status: "Inactivo",
      tags: ["Lead"]
    },
    {
      id: 4,
      name: "Ana Ferreira",
      phone: "+244 926 789 012",
      email: "ana.ferreira@email.com",
      brand: "Marca A",
      lastInteraction: "2024-01-13",
      status: "Activo",
      tags: ["VIP", "Huíla"]
    },
    {
      id: 5,
      name: "Carlos Mendes",
      phone: "+244 927 890 123",
      email: "carlos.mendes@email.com",
      brand: "Marca D",
      lastInteraction: "2024-01-11",
      status: "Bloqueado",
      tags: ["Ex-cliente"]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Activo":
        return "default";
      case "Inactivo":
        return "secondary";
      case "Bloqueado":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.phone.includes(searchTerm) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBrand = selectedBrand === "all" || contact.brand === selectedBrand;
    const matchesStatus = selectedStatus === "all" || contact.status === selectedStatus;
    return matchesSearch && matchesBrand && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Contactos</h1>
          <p className="text-muted-foreground">Gerir base de dados de contactos</p>
        </div>
        <div className="flex space-x-2">
          <Link to="/contacts/import">
            <Button variant="outline">
              <Users className="h-4 w-4 mr-2" />
              Importar Contactos
            </Button>
          </Link>
          <Button className="bg-primary hover:bg-primary/90">
            <Calendar className="h-4 w-4 mr-2" />
            Adicionar Contacto
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">2,450</div>
              <div className="text-sm text-muted-foreground">Total Contactos</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">2,180</div>
              <div className="text-sm text-muted-foreground">Activos</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">245</div>
              <div className="text-sm text-muted-foreground">Inativos</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">25</div>
              <div className="text-sm text-muted-foreground">Bloqueados</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros e Pesquisa</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Pesquisar contactos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedBrand} onValueChange={setSelectedBrand}>
              <SelectTrigger>
                <SelectValue placeholder="Marca" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as marcas</SelectItem>
                <SelectItem value="Marca A">Marca A</SelectItem>
                <SelectItem value="Marca B">Marca B</SelectItem>
                <SelectItem value="Marca C">Marca C</SelectItem>
                <SelectItem value="Marca D">Marca D</SelectItem>
                <SelectItem value="Marca E">Marca E</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="Activo">Activo</SelectItem>
                <SelectItem value="Inactivo">Inactivo</SelectItem>
                <SelectItem value="Bloqueado">Bloqueado</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">Exportar CSV</Button>
            <Button variant="outline">Exportar Excel</Button>
          </div>
        </CardContent>
      </Card>

      {/* Contacts Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Contactos ({filteredContacts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Marca Preferida</TableHead>
                <TableHead>Última Interacção</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead>Acções</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContacts.map((contact) => (
                <TableRow key={contact.id}>
                  <TableCell className="font-medium">{contact.name}</TableCell>
                  <TableCell>{contact.phone}</TableCell>
                  <TableCell>{contact.email}</TableCell>
                  <TableCell>{contact.brand}</TableCell>
                  <TableCell>{contact.lastInteraction}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(contact.status)}>
                      {contact.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {contact.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">Ver</Button>
                      <Button variant="outline" size="sm">Editar</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
