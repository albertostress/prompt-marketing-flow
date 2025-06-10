
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

export const CreateCampaign = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    type: "",
    audience: "",
    message: "",
    schedule: ""
  });

  const steps = [
    { number: 1, title: "Informações Básicas", description: "Nome e configurações gerais" },
    { number: 2, title: "Audiência", description: "Seleccionar contactos alvo" },
    { number: 3, title: "Mensagem", description: "Criar conteúdo da campanha" },
    { number: 4, title: "Agendamento", description: "Definir data e hora" },
    { number: 5, title: "Revisão", description: "Confirmar e enviar" }
  ];

  const nextStep = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="campaignName">Nome da Campanha</Label>
              <Input
                id="campaignName"
                placeholder="Ex: Promoção Black Friday 2024"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="brand">Marca</Label>
              <Select onValueChange={(value) => setFormData({ ...formData, brand: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar marca" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="marca-a">Marca A</SelectItem>
                  <SelectItem value="marca-b">Marca B</SelectItem>
                  <SelectItem value="marca-c">Marca C</SelectItem>
                  <SelectItem value="marca-d">Marca D</SelectItem>
                  <SelectItem value="marca-e">Marca E</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="type">Tipo de Campanha</Label>
              <Select onValueChange={(value) => setFormData({ ...formData, type: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="promotional">Promocional</SelectItem>
                  <SelectItem value="informational">Informativa</SelectItem>
                  <SelectItem value="transactional">Transaccional</SelectItem>
                  <SelectItem value="newsletter">Newsletter</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div>
              <Label>Audiência Alvo</Label>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <Card className="p-4 cursor-pointer border-2 hover:border-primary">
                  <div className="text-center">
                    <div className="text-2xl font-bold">2,450</div>
                    <div className="text-sm text-muted-foreground">Todos os Contactos</div>
                  </div>
                </Card>
                <Card className="p-4 cursor-pointer border-2 hover:border-primary">
                  <div className="text-center">
                    <div className="text-2xl font-bold">850</div>
                    <div className="text-sm text-muted-foreground">Clientes Activos</div>
                  </div>
                </Card>
                <Card className="p-4 cursor-pointer border-2 hover:border-primary">
                  <div className="text-center">
                    <div className="text-2xl font-bold">1,200</div>
                    <div className="text-sm text-muted-foreground">Novos Leads</div>
                  </div>
                </Card>
                <Card className="p-4 cursor-pointer border-2 hover:border-primary">
                  <div className="text-center">
                    <div className="text-2xl font-bold">400</div>
                    <div className="text-sm text-muted-foreground">VIP Customers</div>
                  </div>
                </Card>
              </div>
            </div>
            <div>
              <Label>Filtros Adicionais</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant="outline">Luanda</Badge>
                <Badge variant="outline">Última compra &lt; 30 dias</Badge>
                <Badge variant="outline">Valor &gt; 10,000 AOA</Badge>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="message">Mensagem</Label>
              <Textarea
                id="message"
                placeholder="Olá {{nome}}, temos uma oferta especial para si..."
                rows={6}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
              <div className="text-sm text-muted-foreground mt-2">
                Use {`{{nome}}, {{marca}}, {{produto}}`} para personalização
              </div>
            </div>
            <div className="border rounded-lg p-4 bg-muted">
              <div className="text-sm font-medium mb-2">Preview da Mensagem:</div>
              <div className="bg-background p-3 rounded border">
                {formData.message || "Olá João, temos uma oferta especial para si..."}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div>
              <Label>Opções de Envio</Label>
              <div className="grid grid-cols-1 gap-4 mt-2">
                <Card className="p-4 cursor-pointer border-2 hover:border-primary">
                  <div className="flex items-center space-x-3">
                    <input type="radio" name="schedule" value="now" />
                    <div>
                      <div className="font-medium">Enviar Agora</div>
                      <div className="text-sm text-muted-foreground">Campanha será enviada imediatamente</div>
                    </div>
                  </div>
                </Card>
                <Card className="p-4 cursor-pointer border-2 hover:border-primary">
                  <div className="flex items-center space-x-3">
                    <input type="radio" name="schedule" value="scheduled" />
                    <div>
                      <div className="font-medium">Agendar Envio</div>
                      <div className="text-sm text-muted-foreground">Escolher data e hora específica</div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
            <div>
              <Label htmlFor="scheduleDate">Data e Hora</Label>
              <Input
                id="scheduleDate"
                type="datetime-local"
                className="mt-2"
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <div className="text-lg font-medium">Resumo da Campanha</div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Nome:</span>
                <span>{formData.name || "Não definido"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Marca:</span>
                <span>{formData.brand || "Não definido"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tipo:</span>
                <span>{formData.type || "Não definido"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Audiência:</span>
                <span>2,450 contactos</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Custo Estimado:</span>
                <span>1,225 AOA</span>
              </div>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <div className="text-sm font-medium mb-2">Mensagem:</div>
              <div className="text-sm">{formData.message || "Mensagem não definida"}</div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm">
          <ChevronLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Criar Nova Campanha</h1>
          <p className="text-muted-foreground">Configure sua campanha WhatsApp passo a passo</p>
        </div>
      </div>

      {/* Progress Steps */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  currentStep >= step.number ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  {step.number}
                </div>
                <div className="ml-3">
                  <div className={`text-sm font-medium ${
                    currentStep >= step.number ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {step.title}
                  </div>
                  <div className="text-xs text-muted-foreground">{step.description}</div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`mx-4 h-px w-12 ${
                    currentStep > step.number ? 'bg-primary' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Step Content */}
      <Card>
        <CardHeader>
          <CardTitle>{steps[currentStep - 1].title}</CardTitle>
        </CardHeader>
        <CardContent>
          {renderStepContent()}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
          <ChevronLeft className="h-4 w-4 mr-2" />
          Anterior
        </Button>
        <div className="flex space-x-2">
          {currentStep < 5 ? (
            <Button onClick={nextStep}>
              Próximo
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button className="bg-primary hover:bg-primary/90">
              <Calendar className="h-4 w-4 mr-2" />
              Criar Campanha
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
