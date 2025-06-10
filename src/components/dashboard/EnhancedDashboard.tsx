
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { TrendingUp, TrendingDown, Users, MessageSquare, Target, DollarSign, Calendar, Clock } from "lucide-react";

const campaignData = [
  { name: "Jan", enviadas: 4000, entregues: 3800, cliques: 1200, vendas: 890 },
  { name: "Fev", enviadas: 3000, entregues: 2900, cliques: 980, vendas: 750 },
  { name: "Mar", enviadas: 5000, entregues: 4700, cliques: 1800, vendas: 1200 },
  { name: "Abr", enviadas: 4500, entregues: 4200, cliques: 1600, vendas: 1100 },
  { name: "Mai", enviadas: 6000, entregues: 5800, cliques: 2200, vendas: 1500 }
];

const deviceData = [
  { name: "Mobile", value: 65, color: "#8b5cf6" },
  { name: "Desktop", value: 25, color: "#06b6d4" },
  { name: "Tablet", value: 10, color: "#10b981" }
];

const recentCampaigns = [
  { id: 1, name: "Black Friday 2024", status: "Activa", progress: 75, sent: 2500, delivered: 2375 },
  { id: 2, name: "Novo Produto Tech", status: "Pausada", progress: 45, sent: 1800, delivered: 1710 },
  { id: 3, name: "Desconto Verão", status: "Finalizada", progress: 100, sent: 3200, delivered: 3040 }
];

export const EnhancedDashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header com métricas principais */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Dashboard Control X
          </h1>
          <p className="text-muted-foreground">Visão geral das suas campanhas WhatsApp</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Últimos 30 dias
          </Button>
          <Button size="sm" className="bg-gradient-to-r from-primary to-accent">
            Novo Relatório
          </Button>
        </div>
      </div>

      {/* KPI Cards com animações */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Mensagens Enviadas</p>
                <p className="text-2xl font-bold">24,567</p>
                <div className="flex items-center text-sm text-green-600 mt-1">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +12.5% vs mês anterior
                </div>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <MessageSquare className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Taxa de Entrega</p>
                <p className="text-2xl font-bold">96.8%</p>
                <div className="flex items-center text-sm text-green-600 mt-1">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +2.1% vs mês anterior
                </div>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Target className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Contactos Activos</p>
                <p className="text-2xl font-bold">8,945</p>
                <div className="flex items-center text-sm text-red-600 mt-1">
                  <TrendingDown className="h-4 w-4 mr-1" />
                  -3.2% vs mês anterior
                </div>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">ROI Médio</p>
                <p className="text-2xl font-bold">380%</p>
                <div className="flex items-center text-sm text-green-600 mt-1">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +45% vs mês anterior
                </div>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <DollarSign className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos principais */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Performance das Campanhas</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={campaignData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="enviadas" fill="#8b5cf6" name="Enviadas" />
                <Bar dataKey="entregues" fill="#06b6d4" name="Entregues" />
                <Bar dataKey="cliques" fill="#10b981" name="Cliques" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dispositivos dos Utilizadores</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={deviceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {deviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Campanhas em andamento */}
      <Card>
        <CardHeader>
          <CardTitle>Campanhas Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentCampaigns.map((campaign) => (
              <div key={campaign.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <h4 className="font-medium">{campaign.name}</h4>
                    <Badge variant={
                      campaign.status === "Activa" ? "default" :
                      campaign.status === "Pausada" ? "secondary" :
                      "destructive"
                    }>
                      {campaign.status}
                    </Badge>
                  </div>
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-1">
                      <span>Progresso: {campaign.progress}%</span>
                      <span>{campaign.delivered} / {campaign.sent} entregues</span>
                    </div>
                    <Progress value={campaign.progress} className="h-2" />
                  </div>
                </div>
                <div className="flex space-x-2 ml-4">
                  <Button variant="outline" size="sm">Ver</Button>
                  <Button variant="outline" size="sm">Editar</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Insights rápidos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Clock className="h-8 w-8 text-blue-600" />
              <div>
                <p className="font-medium text-blue-900">Melhor Horário</p>
                <p className="text-sm text-blue-700">14:00 - 16:00 tem +35% engajamento</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Target className="h-8 w-8 text-green-600" />
              <div>
                <p className="font-medium text-green-900">Segmento Top</p>
                <p className="text-sm text-green-700">Clientes VIP: 89% taxa de conversão</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-violet-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <MessageSquare className="h-8 w-8 text-purple-600" />
              <div>
                <p className="font-medium text-purple-900">Palavra-chave Top</p>
                <p className="text-sm text-purple-700">"Desconto" gera +67% de respostas</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
