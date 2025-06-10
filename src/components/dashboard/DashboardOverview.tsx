
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const DashboardOverview = () => {
  const kpiData = [
    {
      title: "Mensagens Enviadas",
      value: "12,486",
      change: "+8.2%",
      period: "hoje",
      trend: "up"
    },
    {
      title: "Taxa de Entrega",
      value: "94.5%",
      change: "+2.1%",
      period: "vs ontem",
      trend: "up"
    },
    {
      title: "Conversões",
      value: "1,247",
      change: "128,450 AOA",
      period: "este mês",
      trend: "up"
    },
    {
      title: "ROI Campanhas",
      value: "324%",
      change: "+15.3%",
      period: "vs mês anterior",
      trend: "up"
    }
  ];

  const brandPerformance = [
    { name: "Marca A", messages: 2500, conversions: 180, roi: "420%" },
    { name: "Marca B", messages: 2200, conversions: 165, roi: "380%" },
    { name: "Marca C", messages: 1900, conversions: 142, roi: "350%" },
    { name: "Marca D", messages: 1750, conversions: 125, roi: "290%" },
    { name: "Marca E", messages: 1600, conversions: 98, roi: "240%" }
  ];

  const activeCampaigns = [
    { name: "Promoção Black Friday", brand: "Marca A", status: "Activa", sent: 5420 },
    { name: "Novo Produto Lançamento", brand: "Marca B", status: "Activa", sent: 3200 },
    { name: "Desconto Fim de Ano", brand: "Marca C", status: "Pausada", sent: 2800 }
  ];

  const recentActivity = [
    { action: "Nova campanha enviada", detail: "Promoção Black Friday - 5,420 mensagens", time: "2 min atrás" },
    { action: "Pedido recebido", detail: "Cliente João Silva - 45,000 AOA", time: "5 min atrás" },
    { action: "Contactos importados", detail: "1,200 novos contactos da Marca D", time: "15 min atrás" },
    { action: "Pagamento confirmado", detail: "Pedido #1234 - EMIS ref: 890123", time: "32 min atrás" }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Visão geral das suas campanhas WhatsApp</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <Card key={index} className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {kpi.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{kpi.value}</div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Badge variant={kpi.trend === "up" ? "default" : "secondary"} className="text-xs">
                  {kpi.change}
                </Badge>
                <span>{kpi.period}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance por Marca */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Performance por Marca</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {brandPerformance.map((brand, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full bg-primary`} />
                    <span className="font-medium text-foreground">{brand.name}</span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="text-muted-foreground">{brand.messages} msgs</span>
                    <span className="text-muted-foreground">{brand.conversions} conv</span>
                    <Badge variant="default">{brand.roi}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Funil de Conversão */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Funil de Conversão</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Mensagens Enviadas</span>
                <span className="font-medium text-foreground">12,486</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: "100%" }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Entregues</span>
                <span className="font-medium text-foreground">11,798 (94.5%)</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: "94%" }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Abertas</span>
                <span className="font-medium text-foreground">8,378 (71%)</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: "71%" }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Cliques</span>
                <span className="font-medium text-foreground">2,513 (30%)</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: "30%" }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Vendas</span>
                <span className="font-medium text-foreground">1,247 (49%)</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: "49%" }}></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Campanhas Activas */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Campanhas Activas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activeCampaigns.map((campaign, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <div className="font-medium text-foreground">{campaign.name}</div>
                    <div className="text-sm text-muted-foreground">{campaign.brand}</div>
                  </div>
                  <div className="text-right">
                    <Badge variant={campaign.status === "Activa" ? "default" : "secondary"}>
                      {campaign.status}
                    </Badge>
                    <div className="text-sm text-muted-foreground mt-1">{campaign.sent} enviadas</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actividade Recente */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Actividade Recente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-foreground">{activity.action}</div>
                    <div className="text-xs text-muted-foreground">{activity.detail}</div>
                    <div className="text-xs text-muted-foreground">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
