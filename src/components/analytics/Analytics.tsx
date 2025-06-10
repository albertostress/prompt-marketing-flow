
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Analytics = () => {
  const performanceData = [
    { metric: "Taxa de Entrega", value: "94.5%", change: "+2.1%", trend: "up" },
    { metric: "Taxa de Abertura", value: "71.2%", change: "-1.3%", trend: "down" },
    { metric: "Taxa de Cliques", value: "30.1%", change: "+4.2%", trend: "up" },
    { metric: "Taxa de Conversão", value: "12.8%", change: "+2.8%", trend: "up" }
  ];

  const brandComparison = [
    { brand: "Marca A", messages: 12500, deliveries: 11875, opens: 8500, clicks: 2550, conversions: 1530, roi: "420%" },
    { brand: "Marca B", messages: 10200, deliveries: 9690, opens: 6936, clicks: 2040, conversions: 1122, roi: "380%" },
    { brand: "Marca C", messages: 8900, deliveries: 8455, opens: 6004, clicks: 1780, conversions: 890, roi: "350%" },
    { brand: "Marca D", messages: 7600, deliveries: 7220, opens: 5092, clicks: 1520, conversions: 684, roi: "290%" },
    { brand: "Marca E", messages: 6800, deliveries: 6460, opens: 4420, clicks: 1360, conversions: 544, roi: "240%" }
  ];

  const campaignTypes = [
    { type: "Promocional", campaigns: 23, messages: 28450, conversions: 3245, avgRoi: "380%" },
    { type: "Informativa", campaigns: 12, messages: 15200, conversions: 1120, avgRoi: "210%" },
    { type: "Transaccional", campaigns: 8, messages: 9800, conversions: 1890, avgRoi: "450%" },
    { type: "Newsletter", campaigns: 15, messages: 18900, conversions: 850, avgRoi: "180%" }
  ];

  const topProducts = [
    { product: "Produto Premium X", sales: 245, revenue: "1,225,000 AOA", margin: "45%" },
    { product: "Produto Standard Y", sales: 189, revenue: "945,000 AOA", margin: "35%" },
    { product: "Produto Básico Z", sales: 156, revenue: "468,000 AOA", margin: "25%" },
    { product: "Produto Especial W", sales: 123, revenue: "738,000 AOA", margin: "40%" },
    { product: "Produto Novo V", sales: 98, revenue: "490,000 AOA", margin: "30%" }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground">Análise detalhada do desempenho das campanhas</p>
        </div>
        <Select defaultValue="30days">
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">Últimos 7 dias</SelectItem>
            <SelectItem value="30days">Últimos 30 dias</SelectItem>
            <SelectItem value="90days">Últimos 90 dias</SelectItem>
            <SelectItem value="1year">Último ano</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {performanceData.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">{metric.value}</div>
                <div className="text-sm text-muted-foreground mb-2">{metric.metric}</div>
                <Badge variant={metric.trend === "up" ? "default" : "secondary"}>
                  {metric.change}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Brand Performance Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Comparação de Performance por Marca</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Marca</th>
                  <th className="text-center p-2">Mensagens</th>
                  <th className="text-center p-2">Entregues</th>
                  <th className="text-center p-2">Abertas</th>
                  <th className="text-center p-2">Cliques</th>
                  <th className="text-center p-2">Conversões</th>
                  <th className="text-center p-2">ROI</th>
                </tr>
              </thead>
              <tbody>
                {brandComparison.map((brand, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-2 font-medium">{brand.brand}</td>
                    <td className="p-2 text-center">{brand.messages.toLocaleString()}</td>
                    <td className="p-2 text-center">
                      {brand.deliveries.toLocaleString()}
                      <div className="text-xs text-muted-foreground">
                        ({((brand.deliveries / brand.messages) * 100).toFixed(1)}%)
                      </div>
                    </td>
                    <td className="p-2 text-center">
                      {brand.opens.toLocaleString()}
                      <div className="text-xs text-muted-foreground">
                        ({((brand.opens / brand.deliveries) * 100).toFixed(1)}%)
                      </div>
                    </td>
                    <td className="p-2 text-center">
                      {brand.clicks.toLocaleString()}
                      <div className="text-xs text-muted-foreground">
                        ({((brand.clicks / brand.opens) * 100).toFixed(1)}%)
                      </div>
                    </td>
                    <td className="p-2 text-center">
                      {brand.conversions.toLocaleString()}
                      <div className="text-xs text-muted-foreground">
                        ({((brand.conversions / brand.clicks) * 100).toFixed(1)}%)
                      </div>
                    </td>
                    <td className="p-2 text-center">
                      <Badge variant="default">{brand.roi}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Campaign Types Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Performance por Tipo de Campanha</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {campaignTypes.map((type, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div>
                    <div className="font-medium">{type.type}</div>
                    <div className="text-sm text-muted-foreground">
                      {type.campaigns} campanhas • {type.messages.toLocaleString()} mensagens
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{type.conversions.toLocaleString()} conversões</div>
                    <Badge variant="default">{type.avgRoi} ROI médio</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Produtos Vendidos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div>
                    <div className="font-medium">{product.product}</div>
                    <div className="text-sm text-muted-foreground">
                      {product.sales} vendas
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{product.revenue}</div>
                    <div className="text-sm text-muted-foreground">Margem: {product.margin}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Análise de Receita por Mês</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-7 gap-4 text-sm font-medium text-muted-foreground">
              <div>Mês</div>
              <div>Campanhas</div>
              <div>Mensagens</div>
              <div>Conversões</div>
              <div>Receita</div>
              <div>Custo</div>
              <div>ROI</div>
            </div>
            {[
              { month: "Janeiro", campaigns: 28, messages: 45600, conversions: 5890, revenue: "2,945,000", cost: "228,000", roi: "1,191%" },
              { month: "Dezembro", campaigns: 32, messages: 52000, conversions: 6780, revenue: "3,390,000", cost: "260,000", roi: "1,204%" },
              { month: "Novembro", campaigns: 25, messages: 38900, conversions: 4650, revenue: "2,325,000", cost: "194,500", roi: "1,095%" }
            ].map((month, index) => (
              <div key={index} className="grid grid-cols-7 gap-4 py-3 border-b">
                <div className="font-medium">{month.month}</div>
                <div>{month.campaigns}</div>
                <div>{month.messages.toLocaleString()}</div>
                <div>{month.conversions.toLocaleString()}</div>
                <div>{month.revenue} AOA</div>
                <div>{month.cost} AOA</div>
                <div>
                  <Badge variant="default">{month.roi}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
