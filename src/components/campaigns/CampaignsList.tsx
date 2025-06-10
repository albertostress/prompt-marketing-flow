
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";
import { Calendar, Search, Circle } from "lucide-react";

export const CampaignsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const campaigns = [
    {
      id: 1,
      name: "Promoção Black Friday",
      brand: "Marca A",
      status: "Activa",
      sent: 5420,
      delivered: 5124,
      clicks: 1847,
      roi: "420%",
      created: "2024-01-15"
    },
    {
      id: 2,
      name: "Novo Produto Lançamento",
      brand: "Marca B",
      status: "Activa",
      sent: 3200,
      delivered: 3024,
      clicks: 967,
      roi: "380%",
      created: "2024-01-14"
    },
    {
      id: 3,
      name: "Desconto Fim de Ano",
      brand: "Marca C",
      status: "Pausada",
      sent: 2800,
      delivered: 2650,
      clicks: 756,
      roi: "290%",
      created: "2024-01-12"
    },
    {
      id: 4,
      name: "Promoção Verão",
      brand: "Marca D",
      status: "Finalizada",
      sent: 4100,
      delivered: 3895,
      clicks: 1234,
      roi: "350%",
      created: "2024-01-10"
    },
    {
      id: 5,
      name: "Liquidação Inverno",
      brand: "Marca E",
      status: "Agendada",
      sent: 0,
      delivered: 0,
      clicks: 0,
      roi: "-",
      created: "2024-01-16"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Activa":
        return "default";
      case "Pausada":
        return "secondary";
      case "Finalizada":
        return "destructive";
      case "Agendada":
        return "secondary";
      default:
        return "secondary";
    }
  };

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBrand = selectedBrand === "all" || campaign.brand === selectedBrand;
    const matchesStatus = selectedStatus === "all" || campaign.status === selectedStatus;
    return matchesSearch && matchesBrand && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Campanhas</h1>
          <p className="text-muted-foreground">Gerir todas as suas campanhas WhatsApp</p>
        </div>
        <Link to="/campaigns/create">
          <Button className="bg-primary hover:bg-primary/90">
            <Calendar className="h-4 w-4 mr-2" />
            Criar Nova Campanha
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Circle className="h-4 w-4 text-green-500" />
              <span className="text-sm text-muted-foreground">Activas</span>
            </div>
            <div className="text-2xl font-bold">2</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Circle className="h-4 w-4 text-yellow-500" />
              <span className="text-sm text-muted-foreground">Pausadas</span>
            </div>
            <div className="text-2xl font-bold">1</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Circle className="h-4 w-4 text-blue-500" />
              <span className="text-sm text-muted-foreground">Agendadas</span>
            </div>
            <div className="text-2xl font-bold">1</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Circle className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-muted-foreground">Finalizadas</span>
            </div>
            <div className="text-2xl font-bold">1</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Pesquisar campanhas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedBrand} onValueChange={setSelectedBrand}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar marca" />
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
                <SelectItem value="Activa">Activa</SelectItem>
                <SelectItem value="Pausada">Pausada</SelectItem>
                <SelectItem value="Agendada">Agendada</SelectItem>
                <SelectItem value="Finalizada">Finalizada</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">Exportar</Button>
          </div>
        </CardContent>
      </Card>

      {/* Campaigns Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Campanhas</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Marca</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Enviadas</TableHead>
                <TableHead>Entregues</TableHead>
                <TableHead>Cliques</TableHead>
                <TableHead>ROI</TableHead>
                <TableHead>Acções</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCampaigns.map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell className="font-medium">{campaign.name}</TableCell>
                  <TableCell>{campaign.brand}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(campaign.status)}>
                      {campaign.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{campaign.sent.toLocaleString()}</TableCell>
                  <TableCell>{campaign.delivered.toLocaleString()}</TableCell>
                  <TableCell>{campaign.clicks.toLocaleString()}</TableCell>
                  <TableCell>{campaign.roi}</TableCell>
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
