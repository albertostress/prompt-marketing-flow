
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, Calendar, Users } from "lucide-react";
import { Link } from "react-router-dom";

export const ImportContacts = () => {
  const [uploadStep, setUploadStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [mappings, setMappings] = useState({
    name: "",
    phone: "",
    email: "",
    brand: "",
    tags: ""
  });
  const [importing, setImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);

  const sampleData = [
    { nome: "João Silva", telefone: "923456789", email: "joao@email.com", marca: "Marca A", tags: "VIP" },
    { nome: "Maria Santos", telefone: "924567890", email: "maria@email.com", marca: "Marca B", tags: "Cliente" },
    { nome: "Pedro Costa", telefone: "925678901", email: "pedro@email.com", marca: "Marca C", tags: "Lead" }
  ];

  const availableColumns = ["nome", "telefone", "email", "marca", "tags", "cidade", "data_nascimento"];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setUploadStep(2);
    }
  };

  const handleImport = () => {
    setImporting(true);
    setUploadStep(3);
    
    // Simulate import progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setImportProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setImporting(false);
        setUploadStep(4);
      }
    }, 300);
  };

  const renderUploadStep = () => {
    switch (uploadStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="border-2 border-dashed border-border rounded-lg p-8 bg-muted/50">
                <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Carregar arquivo de contactos</h3>
                <p className="text-muted-foreground mb-4">
                  Arraste e solte seu arquivo CSV ou Excel aqui, ou clique para seleccionar
                </p>
                <input
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload">
                  <Button className="cursor-pointer">
                    Seleccionar Arquivo
                  </Button>
                </label>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Formatos Aceites</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center space-x-2">
                      <Badge variant="outline">CSV</Badge>
                      <span>Arquivo separado por vírgulas</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Badge variant="outline">XLSX</Badge>
                      <span>Microsoft Excel</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Badge variant="outline">XLS</Badge>
                      <span>Excel legado</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Campos Requeridos</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center space-x-2">
                      <Badge variant="default">Nome</Badge>
                      <span>Nome completo do contacto</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Badge variant="default">Telefone</Badge>
                      <span>Número WhatsApp válido</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Badge variant="secondary">Email</Badge>
                      <span>Endereço de email (opcional)</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Badge variant="secondary">Marca</Badge>
                      <span>Marca preferida (opcional)</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Exemplo de Arquivo CSV</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                  <div>nome,telefone,email,marca,tags</div>
                  <div>João Silva,923456789,joao@email.com,Marca A,VIP</div>
                  <div>Maria Santos,924567890,maria@email.com,Marca B,Cliente</div>
                </div>
                <Button variant="outline" className="mt-4">
                  Baixar Template
                </Button>
              </CardContent>
            </Card>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-4 p-4 bg-muted rounded-lg">
              <Calendar className="h-8 w-8 text-primary" />
              <div>
                <div className="font-medium">Arquivo carregado: {file?.name}</div>
                <div className="text-sm text-muted-foreground">
                  Tamanho: {file ? Math.round(file.size / 1024) : 0} KB
                </div>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Mapeamento de Colunas</CardTitle>
                <p className="text-muted-foreground">
                  Faça a correspondência entre as colunas do seu arquivo e os campos do sistema
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Campo Nome</Label>
                    <Select onValueChange={(value) => setMappings({...mappings, name: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar coluna" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableColumns.map(col => (
                          <SelectItem key={col} value={col}>{col}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Campo Telefone</Label>
                    <Select onValueChange={(value) => setMappings({...mappings, phone: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar coluna" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableColumns.map(col => (
                          <SelectItem key={col} value={col}>{col}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Campo Email</Label>
                    <Select onValueChange={(value) => setMappings({...mappings, email: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar coluna" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableColumns.map(col => (
                          <SelectItem key={col} value={col}>{col}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Campo Marca</Label>
                    <Select onValueChange={(value) => setMappings({...mappings, brand: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar coluna" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableColumns.map(col => (
                          <SelectItem key={col} value={col}>{col}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pré-visualização dos Dados</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Telefone</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Marca</TableHead>
                      <TableHead>Tags</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sampleData.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{row.nome}</TableCell>
                        <TableCell>{row.telefone}</TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell>{row.marca}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{row.tags}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="mt-4 text-sm text-muted-foreground">
                  Mostrando primeiras 3 linhas de 1,247 contactos encontrados
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Users className="mx-auto h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-medium mb-2">Importando Contactos</h3>
              <p className="text-muted-foreground">
                Por favor aguarde enquanto processamos seus contactos...
              </p>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>Progresso da Importação</span>
                    <span>{importProgress}%</span>
                  </div>
                  <Progress value={importProgress} className="w-full" />
                  <div className="text-sm text-muted-foreground text-center">
                    {importProgress < 100 ? `Processando ${Math.round(importProgress * 12.47)} de 1,247 contactos...` : "Importação concluída!"}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-medium mb-2">Importação Concluída!</h3>
              <p className="text-muted-foreground">
                Seus contactos foram importados com sucesso
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Resumo da Importação</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">1,189</div>
                    <div className="text-sm text-muted-foreground">Importados</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">45</div>
                    <div className="text-sm text-muted-foreground">Duplicados</div>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">13</div>
                    <div className="text-sm text-muted-foreground">Erros</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">1,247</div>
                    <div className="text-sm text-muted-foreground">Total</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center space-x-4">
              <Link to="/contacts">
                <Button>Ver Contactos</Button>
              </Link>
              <Button variant="outline" onClick={() => setUploadStep(1)}>
                Nova Importação
              </Button>
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
        <Link to="/contacts">
          <Button variant="outline" size="sm">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Importar Contactos</h1>
          <p className="text-muted-foreground">Carregar contactos em massa para sua base de dados</p>
        </div>
      </div>

      {/* Progress Steps */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            {[
              { number: 1, title: "Carregar Arquivo", active: uploadStep >= 1 },
              { number: 2, title: "Mapear Colunas", active: uploadStep >= 2 },
              { number: 3, title: "Importar", active: uploadStep >= 3 },
              { number: 4, title: "Concluído", active: uploadStep >= 4 }
            ].map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  step.active ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  {step.number}
                </div>
                <div className="ml-3">
                  <div className={`text-sm font-medium ${
                    step.active ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {step.title}
                  </div>
                </div>
                {index < 3 && (
                  <div className={`mx-4 h-px w-12 ${
                    uploadStep > step.number ? 'bg-primary' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <div>
        {renderUploadStep()}
      </div>

      {/* Actions */}
      {uploadStep === 2 && (
        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setUploadStep(1)}>
            Voltar
          </Button>
          <Button onClick={handleImport} disabled={!mappings.name || !mappings.phone}>
            Iniciar Importação
          </Button>
        </div>
      )}
    </div>
  );
};
