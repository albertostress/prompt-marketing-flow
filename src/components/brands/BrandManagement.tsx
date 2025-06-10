
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export const BrandManagement = () => {
  const brands = [
    {
      name: "Marca A",
      status: "Activa",
      contacts: 2450,
      campaigns: 12,
      revenue: "1,250,000 AOA",
      roi: "420%",
      performance: 95
    },
    {
      name: "Marca B", 
      status: "Activa",
      contacts: 1890,
      campaigns: 8,
      revenue: "890,000 AOA",
      roi: "380%",
      performance: 88
    },
    {
      name: "Marca C",
      status: "Activa", 
      contacts: 1560,
      campaigns: 6,
      revenue: "675,000 AOA",
      roi: "350%",
      performance: 82
    },
    {
      name: "Marca D",
      status: "Pausada",
      contacts: 1200,
      campaigns: 4,
      revenue: "420,000 AOA",
      roi: "290%",
      performance: 75
    },
    {
      name: "Marca E",
      status: "Activa",
      contacts: 980,
      campaigns: 3,
      revenue: "345,000 AOA", 
      roi: "240%",
      performance: 68
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestão de Marcas</h1>
          <p className="text-muted-foreground">Gerir performance e configurações das 5 marcas</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          Adicionar Nova Marca
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">5</div>
              <div className="text-sm text-muted-foreground">Total Marcas</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">4</div>
              <div className="text-sm text-muted-foreground">Activas</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">1</div>
              <div className="text-sm text-muted-foreground">Pausadas</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">340%</div>
              <div className="text-sm text-muted-foreground">ROI Médio</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Brands Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {brands.map((brand, index) => (
          <Card key={index} className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">{brand.name}</CardTitle>
                <Badge variant={brand.status === "Activa" ? "default" : "secondary"}>
                  {brand.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Métricas Principais */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-lg font-bold">{brand.contacts.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Contactos</div>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-lg font-bold">{brand.campaigns}</div>
                  <div className="text-sm text-muted-foreground">Campanhas</div>
                </div>
              </div>

              {/* Performance Score */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Performance Score</span>
                  <span>{brand.performance}%</span>
                </div>
                <Progress value={brand.performance} className="w-full" />
              </div>

              {/* Receita e ROI */}
              <div className="flex justify-between items-center pt-2">
                <div>
                  <div className="text-sm text-muted-foreground">Receita</div>
                  <div className="font-bold">{brand.revenue}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">ROI</div>
                  <Badge variant="default" className="text-lg">{brand.roi}</Badge>
                </div>
              </div>

              {/* Acções */}
              <div className="flex space-x-2 pt-4">
                <Button variant="outline" className="flex-1" size="sm">
                  Ver Detalhes
                </Button>
                <Button variant="outline" className="flex-1" size="sm">
                  Configurar
                </Button>
                <Button variant="outline" className="flex-1" size="sm">
                  Campanhas
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Performance Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Comparação de Performance Mensal</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {brands.map((brand, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-20 text-sm font-medium">{brand.name}</div>
                <div className="flex-1">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Performance vs Meta</span>
                    <span>{brand.performance}%</span>
                  </div>
                  <Progress value={brand.performance} className="h-2" />
                </div>
                <div className="w-24 text-right">
                  <Badge variant={brand.performance >= 80 ? "default" : "secondary"}>
                    {brand.performance >= 80 ? "Excelente" : brand.performance >= 60 ? "Bom" : "Precisa Melhorar"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Brand Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Brands</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {brands
                .sort((a, b) => b.performance - a.performance)
                .slice(0, 3)
                .map((brand, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium">{brand.name}</div>
                        <div className="text-sm text-muted-foreground">{brand.revenue}</div>
                      </div>
                    </div>
                    <Badge variant="default">{brand.roi}</Badge>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recomendações</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="font-medium text-yellow-800">Marca D - Atenção Necessária</div>
                <div className="text-sm text-yellow-700">Performance abaixo da meta. Considere revisar estratégia.</div>
              </div>
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="font-medium text-green-800">Marca A - Excelente Performance</div>
                <div className="text-sm text-green-700">Continue com estratégia actual. ROI excepcional.</div>
              </div>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="font-medium text-blue-800">Marca E - Potencial de Crescimento</div>
                <div className="text-sm text-blue-700">Aumentar investimento pode gerar mais retorno.</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
