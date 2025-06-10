
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, Circle, Calendar } from "lucide-react";

export const OrdersList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedBrand, setSelectedBrand] = useState("all");

  const orders = [
    {
      id: "ORD-001",
      customer: "João Silva",
      phone: "+244 923 456 789",
      brand: "Marca A",
      products: "Produto X, Produto Y",
      value: 45000,
      status: "Pendente",
      paymentRef: "EMIS-123456",
      date: "2024-01-15",
      address: "Luanda, Talatona"
    },
    {
      id: "ORD-002",
      customer: "Maria Santos",
      phone: "+244 924 567 890",
      brand: "Marca B",
      products: "Produto Z",
      value: 25000,
      status: "Confirmado",
      paymentRef: "EMIS-123457",
      date: "2024-01-14",
      address: "Benguela, Centro"
    },
    {
      id: "ORD-003",
      customer: "Pedro Costa",
      phone: "+244 925 678 901",
      brand: "Marca A",
      products: "Produto W, Produto V",
      value: 67500,
      status: "Pago",
      paymentRef: "EMIS-123458",
      date: "2024-01-13",
      address: "Huíla, Lubango"
    },
    {
      id: "ORD-004",
      customer: "Ana Ferreira",
      phone: "+244 926 789 012",
      brand: "Marca C",
      products: "Produto U",
      value: 15000,
      status: "Enviado",
      paymentRef: "EMIS-123459",
      date: "2024-01-12",
      address: "Luanda, Viana"
    },
    {
      id: "ORD-005",
      customer: "Carlos Mendes",
      phone: "+244 927 890 123",
      brand: "Marca D",
      products: "Produto T, Produto S, Produto R",
      value: 89000,
      status: "Entregue",
      paymentRef: "EMIS-123460",
      date: "2024-01-11",
      address: "Cabinda, Centro"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pendente":
        return "secondary";
      case "Confirmado":
        return "default";
      case "Pago":
        return "default";
      case "Enviado":
        return "default";
      case "Entregue":
        return "default";
      default:
        return "secondary";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pendente":
        return "🟡";
      case "Confirmado":
        return "🔵";
      case "Pago":
        return "🟢";
      case "Enviado":
        return "🚚";
      case "Entregue":
        return "✅";
      default:
        return "⚪";
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.phone.includes(searchTerm);
    const matchesStatus = selectedStatus === "all" || order.status === selectedStatus;
    const matchesBrand = selectedBrand === "all" || order.brand === selectedBrand;
    return matchesSearch && matchesStatus && matchesBrand;
  });

  const OrderDetailsModal = ({ order }: { order: typeof orders[0] }) => (
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle>Detalhes do Pedido {order.id}</DialogTitle>
      </DialogHeader>
      <div className="space-y-6">
        {/* Header do Pedido */}
        <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold">{order.id}</span>
              <Badge variant={getStatusColor(order.status)}>
                {getStatusIcon(order.status)} {order.status}
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground">{order.date}</div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{order.value.toLocaleString()} AOA</div>
            <div className="text-sm text-muted-foreground">Valor Total</div>
          </div>
        </div>

        {/* Informações do Cliente */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Informações do Cliente</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Nome</Label>
                <div>{order.customer}</div>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Telefone</Label>
                <div>{order.phone}</div>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Endereço</Label>
                <div>{order.address}</div>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Marca</Label>
                <div>{order.brand}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Produtos */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Produtos</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produto</TableHead>
                  <TableHead>Quantidade</TableHead>
                  <TableHead>Preço Unitário</TableHead>
                  <TableHead>Subtotal</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Produto X</TableCell>
                  <TableCell>2</TableCell>
                  <TableCell>15,000 AOA</TableCell>
                  <TableCell>30,000 AOA</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Produto Y</TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>15,000 AOA</TableCell>
                  <TableCell>15,000 AOA</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Informações de Pagamento */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Pagamento EMIS</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Referência EMIS</Label>
                <div className="font-mono text-lg">{order.paymentRef}</div>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Status Pagamento</Label>
                <Badge variant={order.status === "Pago" ? "default" : "secondary"}>
                  {order.status === "Pago" ? "Confirmado" : "Pendente"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Timeline do Pedido</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <div>
                  <div className="font-medium">Pedido Criado</div>
                  <div className="text-sm text-muted-foreground">15/01/2024 às 14:30</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <div>
                  <div className="font-medium">Pedido Confirmado</div>
                  <div className="text-sm text-muted-foreground">15/01/2024 às 15:45</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-muted rounded-full"></div>
                <div>
                  <div className="font-medium text-muted-foreground">Aguardando Pagamento</div>
                  <div className="text-sm text-muted-foreground">Ref: {order.paymentRef}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Acções */}
        <div className="flex space-x-2">
          <Button className="flex-1">Confirmar Pagamento</Button>
          <Button variant="outline" className="flex-1">Cancelar Pedido</Button>
        </div>
      </div>
    </DialogContent>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Pedidos</h1>
          <p className="text-muted-foreground">Gerir todos os pedidos e pagamentos EMIS</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Calendar className="h-4 w-4 mr-2" />
          Novo Pedido
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">156</div>
              <div className="text-sm text-muted-foreground">Total Pedidos</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">23</div>
              <div className="text-sm text-muted-foreground">Pendentes</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">45</div>
              <div className="text-sm text-muted-foreground">Confirmados</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">78</div>
              <div className="text-sm text-muted-foreground">Pagos</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">10</div>
              <div className="text-sm text-muted-foreground">Entregues</div>
            </div>
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
                placeholder="Pesquisar pedidos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="Pendente">Pendente</SelectItem>
                <SelectItem value="Confirmado">Confirmado</SelectItem>
                <SelectItem value="Pago">Pago</SelectItem>
                <SelectItem value="Enviado">Enviado</SelectItem>
                <SelectItem value="Entregue">Entregue</SelectItem>
              </SelectContent>
            </Select>
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
            <Button variant="outline">Exportar</Button>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Pedidos ({filteredOrders.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID Pedido</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Marca</TableHead>
                <TableHead>Produtos</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Acções</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{order.customer}</div>
                      <div className="text-sm text-muted-foreground">{order.phone}</div>
                    </div>
                  </TableCell>
                  <TableCell>{order.brand}</TableCell>
                  <TableCell className="max-w-40 truncate">{order.products}</TableCell>
                  <TableCell>{order.value.toLocaleString()} AOA</TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(order.status)}>
                      {getStatusIcon(order.status)} {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">Ver Detalhes</Button>
                      </DialogTrigger>
                      <OrderDetailsModal order={order} />
                    </Dialog>
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

function Label({ className, children, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`} {...props}>
      {children}
    </label>
  );
}
