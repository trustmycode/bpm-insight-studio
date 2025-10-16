import { useState } from "react";
import { Search, Plus, ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";

interface Model {
  id: string;
  name: string;
  description: string;
  type: string;
  updatedAt: string;
}

const mockModels: Model[] = [
  {
    id: "1",
    name: "Процесс согласования договора",
    description: "Основной процесс для юридического согласования договоров с контрагентами",
    type: "BPMN",
    updatedAt: "2025-10-15",
  },
  {
    id: "2",
    name: "Онбординг сотрудника",
    description: "Процесс найма и адаптации нового сотрудника в компании",
    type: "BPMN",
    updatedAt: "2025-10-14",
  },
  {
    id: "3",
    name: "Обработка заявки на отпуск",
    description: "Процесс подачи и согласования заявок на отпуск",
    type: "BPMN",
    updatedAt: "2025-10-13",
  },
  {
    id: "4",
    name: "Закупка оборудования",
    description: "Процесс заказа и согласования закупки офисного оборудования",
    type: "BPMN",
    updatedAt: "2025-10-12",
  },
];

type SortField = "name" | "updatedAt";
type SortDirection = "asc" | "desc";

export const ModelsTable = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<SortField>("updatedAt");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredModels = mockModels
    .filter(
      (model) =>
        model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        model.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      const multiplier = sortDirection === "asc" ? 1 : -1;
      return aValue > bValue ? multiplier : -multiplier;
    });

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? (
      <ChevronUp className="ml-1 h-4 w-4" />
    ) : (
      <ChevronDown className="ml-1 h-4 w-4" />
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Каталог моделей</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Управление бизнес-процессами и их версиями
          </p>
        </div>
        <Button onClick={() => navigate("/models/new")} className="gap-2">
          <Plus className="h-4 w-4" />
          Создать модель
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Поиск по названию или описанию..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="rounded-lg border bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <button
                  onClick={() => handleSort("name")}
                  className="flex items-center font-semibold hover:text-foreground"
                >
                  Название модели
                  <SortIcon field="name" />
                </button>
              </TableHead>
              <TableHead>Описание</TableHead>
              <TableHead className="w-24">Тип</TableHead>
              <TableHead className="w-32">
                <button
                  onClick={() => handleSort("updatedAt")}
                  className="flex items-center font-semibold hover:text-foreground"
                >
                  Изменено
                  <SortIcon field="updatedAt" />
                </button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredModels.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-32 text-center">
                  <p className="text-muted-foreground">
                    Модели не найдены. Нажмите "Создать модель" чтобы начать.
                  </p>
                </TableCell>
              </TableRow>
            ) : (
              filteredModels.map((model) => (
                <TableRow
                  key={model.id}
                  className="cursor-pointer hover:bg-accent/50 transition-colors"
                  onClick={() => navigate(`/models/${model.id}`)}
                >
                  <TableCell className="font-medium">{model.name}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {model.description}
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                      {model.type}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(model.updatedAt).toLocaleDateString("ru-RU")}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
