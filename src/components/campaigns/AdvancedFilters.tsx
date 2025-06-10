import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { CalendarIcon, Filter, X, Save, RefreshCw } from "lucide-react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";

interface FilterState {
  dateRange: DateRange | undefined;
  brands: string[];
  status: string[];
  roiRange: number[];
  deliveryRate: number[];
  hasImages: boolean;
  hasButtons: boolean;
  minMessages: number;
  maxMessages: number;
}

export const AdvancedFilters = ({ onFiltersChange }: { onFiltersChange: (filters: FilterState) => void }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    dateRange: undefined,
    brands: [],
    status: [],
    roiRange: [0, 1000],
    deliveryRate: [0, 100],
    hasImages: false,
    hasButtons: false,
    minMessages: 0,
    maxMessages: 10000
  });

  const brands = ["Marca A", "Marca B", "Marca C", "Marca D", "Marca E"];
  const statuses = ["Activa", "Pausada", "Agendada", "Finalizada"];

  const updateFilters = (newFilters: Partial<FilterState>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters: FilterState = {
      dateRange: undefined,
      brands: [],
      status: [],
      roiRange: [0, 1000],
      deliveryRate: [0, 100],
      hasImages: false,
      hasButtons: false,
      minMessages: 0,
      maxMessages: 10000
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const toggleBrand = (brand: string) => {
    const newBrands = filters.brands.includes(brand)
      ? filters.brands.filter(b => b !== brand)
      : [...filters.brands, brand];
    updateFilters({ brands: newBrands });
  };

  const toggleStatus = (status: string) => {
    const newStatus = filters.status.includes(status)
      ? filters.status.filter(s => s !== status)
      : [...filters.status, status];
    updateFilters({ status: newStatus });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.dateRange?.from || filters.dateRange?.to) count++;
    if (filters.brands.length > 0) count++;
    if (filters.status.length > 0) count++;
    if (filters.roiRange[0] > 0 || filters.roiRange[1] < 1000) count++;
    if (filters.deliveryRate[0] > 0 || filters.deliveryRate[1] < 100) count++;
    if (filters.hasImages || filters.hasButtons) count++;
    if (filters.minMessages > 0 || filters.maxMessages < 10000) count++;
    return count;
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CardTitle>Filtros Avançados</CardTitle>
            {getActiveFiltersCount() > 0 && (
              <Badge variant="secondary">{getActiveFiltersCount()} activos</Badge>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={clearAllFilters}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Limpar
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <Filter className="h-4 w-4 mr-2" />
              {isExpanded ? "Recolher" : "Expandir"}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Quick Filters - Always Visible */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label>Período</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {filters.dateRange?.from ? (
                    filters.dateRange.to ? (
                      <>
                        {format(filters.dateRange.from, "dd/MM/yyyy")} -{" "}
                        {format(filters.dateRange.to, "dd/MM/yyyy")}
                      </>
                    ) : (
                      format(filters.dateRange.from, "dd/MM/yyyy")
                    )
                  ) : (
                    "Seleccionar período"
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={filters.dateRange?.from}
                  selected={filters.dateRange}
                  onSelect={(range) => updateFilters({ dateRange: range })}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label>Marcas</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {brands.map(brand => (
                <Badge
                  key={brand}
                  variant={filters.brands.includes(brand) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleBrand(brand)}
                >
                  {brand}
                  {filters.brands.includes(brand) && (
                    <X className="h-3 w-3 ml-1" />
                  )}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <Label>Status</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {statuses.map(status => (
                <Badge
                  key={status}
                  variant={filters.status.includes(status) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleStatus(status)}
                >
                  {status}
                  {filters.status.includes(status) && (
                    <X className="h-3 w-3 ml-1" />
                  )}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Advanced Filters - Expandable */}
        {isExpanded && (
          <div className="space-y-6 pt-4 border-t">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* ROI Range */}
              <div>
                <Label>ROI (%) - {filters.roiRange[0]}% a {filters.roiRange[1]}%</Label>
                <Slider
                  value={filters.roiRange}
                  onValueChange={(value) => updateFilters({ roiRange: value })}
                  max={1000}
                  step={10}
                  className="mt-2"
                />
              </div>

              {/* Delivery Rate */}
              <div>
                <Label>Taxa de Entrega (%) - {filters.deliveryRate[0]}% a {filters.deliveryRate[1]}%</Label>
                <Slider
                  value={filters.deliveryRate}
                  onValueChange={(value) => updateFilters({ deliveryRate: value })}
                  max={100}
                  step={1}
                  className="mt-2"
                />
              </div>

              {/* Message Count Range */}
              <div>
                <Label>Número de Mensagens</Label>
                <div className="flex space-x-2 mt-2">
                  <Input
                    type="number"
                    placeholder="Mín"
                    value={filters.minMessages}
                    onChange={(e) => updateFilters({ minMessages: parseInt(e.target.value) || 0 })}
                  />
                  <Input
                    type="number"
                    placeholder="Máx"
                    value={filters.maxMessages}
                    onChange={(e) => updateFilters({ maxMessages: parseInt(e.target.value) || 10000 })}
                  />
                </div>
              </div>

              {/* Content Type Filters */}
              <div>
                <Label>Tipo de Conteúdo</Label>
                <div className="space-y-3 mt-2">
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={filters.hasImages}
                      onCheckedChange={(checked) => updateFilters({ hasImages: checked })}
                    />
                    <Label>Contém imagens</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={filters.hasButtons}
                      onCheckedChange={(checked) => updateFilters({ hasButtons: checked })}
                    />
                    <Label>Contém botões interactivos</Label>
                  </div>
                </div>
              </div>
            </div>

            {/* Save Filter Preset */}
            <div className="flex items-center justify-between pt-4 border-t">
              <div>
                <Input placeholder="Nome do filtro..." className="w-48" />
              </div>
              <Button variant="outline">
                <Save className="h-4 w-4 mr-2" />
                Guardar Filtro
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
