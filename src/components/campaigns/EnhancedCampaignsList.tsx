
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { AdvancedFilters } from "./AdvancedFilters";
import { Link } from "react-router-dom";
import { Calendar, Search, Circle, TrendingUp, Eye, Edit, Play, Pause, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const campaigns = [
  {
    id: 1,
    name: "Promoção Black Friday",
    brand: "Marca A",
    status: "Activa",
    sent: 5420,
    delivered: 5124,
    clicks: 1847,
    conversions: 234,
    roi: "420%",
    progress: 85,
    created: "2024-01-15",
    deliveryRate: 94.5,
    clickRate: 36.0,
    conversionRate: 12.7
  },
  {
    id: 2,
    name: "Novo Produto Lançamento",
    brand: "Marca B",
    status: "Activa",
    sent: 3200,
    delivered: 3024,
    clicks: 967,
    conversions: 145,
    roi: "380%",
    progress: 75,
    created: "2024-01-14",
    deliveryRate: 94.5,
    clickRate: 32.0,
    conversionRate: 15.0
  },
  {
    id: 3,
    name: "Desconto Fim de Ano",
    brand: "Marca C",
    status: "Pausada",
    sent: 2800,
    delivered: 2650,
    clicks: 756,
    conversions: 89,
    roi: "290%",
    progress: 60,
    created: "2024-01-12",
    deliveryRate: 94.6,
    clickRate: 28.5,
    conversionRate: 11.8
  }
];

export const EnhancedCampaignsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [filteredCampaigns, setFilteredCampaigns] = useState(campaigns);
  const { toast } = useToast();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Activa": return "default";
      case "Pausada": return "secondary";
      case "Finalizada": return "destructive";
      case "Agendada": return "secondary";
      default: return "secondary";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Activa": return <Circle className="h-3 w-3 fill-green-500 text-green-500" />;
      case "Pausada": return <Circle className="h-3 w-3 fill-yellow-500 text-yellow-500" />;
      case "Finalizada": return <Circle className="h-3 w-3 fill-gray-500 text-gray-500" />;
      case "Agendada": return <Circle className="h-3 w-3 fill-blue-500 text-blue-500" />;
      default: return <Circle className="h-3 w-3 fill-gray-500 text-gray-500" />;
    }
  };

  const duplicateCampaign = (campaign: any) => {
    toast({
      title: "Campanha duplicada!",
      description: `A campanha "${campaign.name}" foi duplicada com sucesso.`,
    });
  };

  const toggleCampaignStatus = (campaign: any) => {
    const newStatus = campaign.status === "Activa" ? "Pausada" : "Activa";
    toast({
      title: "Status atualizado!",
      description: `A campanha "${campaign.name}" foi ${newStatus.toLowerCase()}.`,
    });
  };

  const handleFiltersChange = (filters: any) => {
    // Aplicar filtros avançados aqui
    console.log("Filtros aplicados:", filters);
  };

  const filteredResults = filteredCampaigns.filter(campaign => {
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
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Campanhas WhatsApp
          </h1>
          <p className="text-muted-foreground">Gerir e acompanhar todas as suas campanhas</p>
        </div>
        <Link to="/campaigns/create">
          <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
            <Calendar className="h-4 w-4 mr-2" />
            Criar Nova Campanha
          </Button>
        </Link>
      </div>

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <Circle className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-muted-foreground">Activas</span>
                </div>
                <div className="text-2xl font-bold">2</div>
                <div className="flex items-center text-xs text-green-600">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +1 esta semana
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <Circle className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm text-muted-foreground">Pausadas</span>
                </div>
                <div className="text-2xl font-bold">1</div>
                <div className="text-xs text-muted-foreground">Sem alteração</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <Circle className="h-4 w-4 text-blue-500" />
                  <span className="text-sm text-muted-foreground">Taxa Entrega</span>
                </div>
                <div className="text-2xl font-bold">94.5%</div>
                <div className="flex items-center text-xs text-green-600">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +2.1% vs mês anterior
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <Circle className="h-4 w-4 text-purple-500" />
                  <span className="text-sm text-muted-foreground">ROI Médio</span>
                </div>
                <div className="text-2xl font-bold">363%</div>
                <div className="flex items-center text-xs text-green-600">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12% vs mês anterior
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <Circle className="h-4 w-4 text-orange-500" />
                  <span className="text-sm text-muted-foreground">Conversões</span>
                </div>
                <div className="text-2xl font-bold">468</div>
                <div className="flex items-center text-xs text-green-600">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +23% vs mês anterior
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Advanced Filters */}
      <AdvancedFilters onFiltersChange={handleFiltersChange} />

      {/* Quick Filters */}
      <Card>
        <CardContent className="p-4">
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
            <Button variant="outline">Exportar Dados</Button>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Campaigns Table */}
      <Card>
        <CardHeader>
          <CardTitle>Campanhas ({filteredResults.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campanha</TableHead>
                <TableHead>Progresso</TableHead>
                <TableHead>Performance</TableHead>
                <TableHead>Métricas</TableHead>
                <TableHead>ROI</TableHead>
                <TableHead>Acções</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredResults.map((campaign) => (
                <TableRow key={campaign.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(campaign.status)}
                        <span className="font-medium">{campaign.name}</span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>{campaign.brand}</span>
                        <Badge variant={getStatusColor(campaign.status)} className="text-xs">
                          {campaign.status}
                        </Badge>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progresso</span>
                        <span>{campaign.progress}%</span>
                      </div>
                      <Progress value={campaign.progress} className="h-2" />
                      <div className="text-xs text-muted-foreground">
                        {campaign.delivered.toLocaleString()} / {campaign.sent.toLocaleString()}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Entrega:</span>
                        <span className="font-medium">{campaign.deliveryRate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Cliques:</span>
                        <span className="font-medium">{campaign.clickRate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Conversão:</span>
                        <span className="font-medium">{campaign.conversionRate}%</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1 text-sm">
                      <div>📤 {campaign.sent.toLocaleString()}</div>
                      <div>✅ {campaign.delivered.toLocaleString()}</div>
                      <div>👆 {campaign.clicks.toLocaleString()}</div>
                      <div>🎯 {campaign.conversions.toLocaleString()}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">{campaign.roi}</div>
                      <div className="text-xs text-muted-foreground">Retorno</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="sm" title="Ver detalhes">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm" title="Editar">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        title={campaign.status === "Activa" ? "Pausar" : "Activar"}
                        onClick={() => toggleCampaignStatus(campaign)}
                      >
                        {campaign.status === "Activa" ? 
                          <Pause className="h-3 w-3" /> : 
                          <Play className="h-3 w-3" />
                        }
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        title="Duplicar"
                        onClick={() => duplicateCampaign(campaign)}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
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
