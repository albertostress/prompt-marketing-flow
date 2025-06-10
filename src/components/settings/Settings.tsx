
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

interface SettingsProps {
  onLogout: () => void;
}

export const Settings = ({ onLogout }: SettingsProps) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Configurações</h1>
        <p className="text-muted-foreground">Gerir configurações do sistema e integrações</p>
      </div>

      {/* WhatsApp Integration */}
      <Card>
        <CardHeader>
          <CardTitle>Integração WhatsApp Business</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="whatsapp-token">API Token</Label>
              <Input id="whatsapp-token" type="password" placeholder="Inserir token da API" />
            </div>
            <div>
              <Label htmlFor="webhook-url">Webhook URL</Label>
              <Input id="webhook-url" placeholder="https://api.topbrands.ao/webhook" />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="auto-responses" />
            <Label htmlFor="auto-responses">Activar respostas automáticas</Label>
          </div>
          <Button>Testar Conexão</Button>
        </CardContent>
      </Card>

      {/* EMIS Payment Integration */}
      <Card>
        <CardHeader>
          <CardTitle>Integração EMIS (Pagamentos)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="emis-merchant">Merchant ID</Label>
              <Input id="emis-merchant" placeholder="Inserir Merchant ID" />
            </div>
            <div>
              <Label htmlFor="emis-key">API Key</Label>
              <Input id="emis-key" type="password" placeholder="Inserir API Key" />
            </div>
          </div>
          <div>
            <Label htmlFor="emis-environment">Ambiente</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar ambiente" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sandbox">Sandbox (Teste)</SelectItem>
                <SelectItem value="production">Produção</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="auto-confirmation" />
            <Label htmlFor="auto-confirmation">Confirmação automática de pagamentos</Label>
          </div>
          <Button>Verificar Integração</Button>
        </CardContent>
      </Card>

      {/* Campaign Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Configurações de Campanhas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="sending-rate">Taxa de Envio (msgs/min)</Label>
              <Input id="sending-rate" type="number" placeholder="60" />
            </div>
            <div>
              <Label htmlFor="retry-attempts">Tentativas de Reenvio</Label>
              <Input id="retry-attempts" type="number" placeholder="3" />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="smart-timing" />
            <Label htmlFor="smart-timing">Optimização inteligente de horários</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="duplicate-check" />
            <Label htmlFor="duplicate-check">Verificação de mensagens duplicadas</Label>
          </div>
        </CardContent>
      </Card>

      {/* User Management */}
      <Card>
        <CardHeader>
          <CardTitle>Gestão de Utilizadores</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div>
                <div className="font-medium">Admin Principal</div>
                <div className="text-sm text-muted-foreground">admin@topbrands.ao</div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">Editar</Button>
                <Button variant="outline" size="sm">Permissões</Button>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div>
                <div className="font-medium">Gestor Marketing</div>
                <div className="text-sm text-muted-foreground">marketing@topbrands.ao</div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">Editar</Button>
                <Button variant="outline" size="sm">Permissões</Button>
              </div>
            </div>
          </div>
          <Button>Adicionar Utilizador</Button>
        </CardContent>
      </Card>

      {/* System Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Configurações do Sistema</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="timezone">Fuso Horário</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="GMT+1 (Luanda)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gmt+1">GMT+1 (Luanda)</SelectItem>
                <SelectItem value="gmt+0">GMT (Londres)</SelectItem>
                <SelectItem value="gmt-3">GMT-3 (São Paulo)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="currency">Moeda</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="AOA (Kwanza)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="aoa">AOA (Kwanza)</SelectItem>
                <SelectItem value="usd">USD (Dólar)</SelectItem>
                <SelectItem value="eur">EUR (Euro)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="analytics-tracking" />
            <Label htmlFor="analytics-tracking">Activar tracking avançado</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="email-notifications" />
            <Label htmlFor="email-notifications">Notificações por email</Label>
          </div>
        </CardContent>
      </Card>

      {/* Backup & Export */}
      <Card>
        <CardHeader>
          <CardTitle>Backup e Exportação</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <Button variant="outline">Backup Contactos</Button>
            <Button variant="outline">Exportar Campanhas</Button>
            <Button variant="outline">Relatório Completo</Button>
          </div>
          <Separator />
          <div className="space-y-2">
            <div className="text-sm font-medium">Backups Automáticos</div>
            <div className="flex items-center space-x-2">
              <Switch id="auto-backup" />
              <Label htmlFor="auto-backup">Backup automático diário</Label>
            </div>
            <div className="text-xs text-muted-foreground">
              Último backup: 15/01/2024 às 02:00
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Management */}
      <Card>
        <CardHeader>
          <CardTitle>Gestão de Conta</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-destructive/20 rounded-lg bg-destructive/5">
            <div>
              <div className="font-medium text-destructive">Terminar Sessão</div>
              <div className="text-sm text-muted-foreground">Sair da conta e voltar ao ecrã de login</div>
            </div>
            <Button variant="destructive" onClick={onLogout}>
              Terminar Sessão
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Save Changes */}
      <div className="flex justify-end space-x-4">
        <Button variant="outline">Cancelar</Button>
        <Button>Guardar Alterações</Button>
      </div>
    </div>
  );
};
