
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, Copy, Edit, Trash2, Star, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const templateCategories = [
  "Promocional", "Informativo", "Boas-vindas", "Abandono de carrinho", "Pós-venda", "Eventos"
];

const predefinedTemplates = [
  {
    id: 1,
    name: "Promoção Black Friday",
    category: "Promocional",
    message: "🔥 BLACK FRIDAY {{nome}}! \n\nDesconto especial de {{desconto}}% em toda a loja!\n\nVálido até {{data_fim}}. Não perca! 🛍️\n\nCompre agora: {{link}}",
    variables: ["nome", "desconto", "data_fim", "link"],
    usage: 156,
    rating: 4.8,
    isFavorite: true
  },
  {
    id: 2,
    name: "Boas-vindas VIP",
    category: "Boas-vindas",
    message: "Olá {{nome}}! 👋\n\nBem-vindo à família {{marca}}! \n\nComo cliente VIP, você tem acesso exclusivo a ofertas especiais. \n\nSeu código de desconto: {{codigo}}",
    variables: ["nome", "marca", "codigo"],
    usage: 89,
    rating: 4.9,
    isFavorite: false
  },
  {
    id: 3,
    name: "Carrinho Abandonado",
    category: "Abandono de carrinho",
    message: "Oi {{nome}}! 😊\n\nVimos que você deixou alguns itens no seu carrinho:\n\n{{produtos}}\n\nFinalize sua compra em 2 horas e ganhe frete grátis! 🚚\n\n{{link_carrinho}}",
    variables: ["nome", "produtos", "link_carrinho"],
    usage: 234,
    rating: 4.7,
    isFavorite: true
  },
  {
    id: 4,
    name: "Confirmação de Pedido",
    category: "Pós-venda",
    message: "Pedido confirmado! 🎉\n\nOlá {{nome}}, seu pedido #{{numero_pedido}} foi confirmado!\n\nTotal: {{valor}}\nPrevisão de entrega: {{data_entrega}}\n\nAcompanhe: {{link_tracking}}",
    variables: ["nome", "numero_pedido", "valor", "data_entrega", "link_tracking"],
    usage: 445,
    rating: 4.9,
    isFavorite: false
  }
];

export const MessageTemplates = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { toast } = useToast();

  const filteredTemplates = predefinedTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const copyTemplate = (template: any) => {
    navigator.clipboard.writeText(template.message);
    toast({
      title: "Template copiado!",
      description: "A mensagem foi copiada para a área de transferência.",
    });
  };

  const toggleFavorite = (templateId: number) => {
    toast({
      title: "Favorito atualizado!",
      description: "Template adicionado aos favoritos.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Templates de Mensagens</h1>
          <p className="text-muted-foreground">Biblioteca de mensagens prontas para suas campanhas</p>
        </div>
        <Button onClick={() => setShowCreateModal(true)} className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Criar Template
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-4 w-4 text-blue-500" />
              <span className="text-sm text-muted-foreground">Total Templates</span>
            </div>
            <div className="text-2xl font-bold">24</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="text-sm text-muted-foreground">Favoritos</span>
            </div>
            <div className="text-2xl font-bold">7</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Copy className="h-4 w-4 text-green-500" />
              <span className="text-sm text-muted-foreground">Mais Usado</span>
            </div>
            <div className="text-2xl font-bold">445x</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4 text-purple-500" />
              <span className="text-sm text-muted-foreground">Rating Médio</span>
            </div>
            <div className="text-2xl font-bold">4.8</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Pesquisar templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as categorias</SelectItem>
                {templateCategories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline">
              Exportar Templates
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant="secondary">{template.category}</Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                      {template.rating}
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleFavorite(template.id)}
                  className="p-1"
                >
                  <Star className={`h-4 w-4 ${template.isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`} />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-muted p-3 rounded text-sm">
                  {template.message.length > 150 
                    ? `${template.message.substring(0, 150)}...`
                    : template.message
                  }
                </div>
                
                <div>
                  <Label className="text-xs text-muted-foreground">Variáveis:</Label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {template.variables.map(variable => (
                      <Badge key={variable} variant="outline" className="text-xs">
                        {`{{${variable}}}`}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Usado {template.usage}x</span>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="sm" onClick={() => copyTemplate(template)}>
                      <Copy className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                <Button className="w-full" variant="outline">
                  Usar Template
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create Template Modal - Simple version for now */}
      {showCreateModal && (
        <Card className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <CardContent className="w-full max-w-md bg-background border rounded-lg p-6">
            <CardTitle className="mb-4">Criar Novo Template</CardTitle>
            <div className="space-y-4">
              <div>
                <Label htmlFor="templateName">Nome do Template</Label>
                <Input id="templateName" placeholder="Ex: Promoção Verão" />
              </div>
              <div>
                <Label htmlFor="templateCategory">Categoria</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {templateCategories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="templateMessage">Mensagem</Label>
                <Textarea 
                  id="templateMessage" 
                  placeholder="Olá {{nome}}, temos uma oferta especial..."
                  rows={4}
                />
              </div>
              <div className="flex space-x-2">
                <Button onClick={() => setShowCreateModal(false)} variant="outline" className="flex-1">
                  Cancelar
                </Button>
                <Button className="flex-1">Criar Template</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
