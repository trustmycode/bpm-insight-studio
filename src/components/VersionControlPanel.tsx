import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Save, Rocket, ChevronDown, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { DeleteConfirmationDialog } from "@/components/DeleteConfirmationDialog";

interface Version {
  id: string;
  number: string;
  date: string;
  author: string;
  isCurrent: boolean;
}

const mockVersions: Version[] = [
  { id: "1", number: "v1.2", date: "2025-10-15", author: "А.Иванов", isCurrent: true },
  { id: "2", number: "v1.1", date: "2025-10-10", author: "А.Иванов", isCurrent: false },
  { id: "3", number: "v1.0", date: "2025-10-05", author: "М.Петрова", isCurrent: false },
];

export const VersionControlPanel = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedVersion, setSelectedVersion] = useState(mockVersions[0].id);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const modelName = id === "new" 
    ? "Новая модель процесса" 
    : "Процесс согласования договора";

  const currentVersion = mockVersions.find((v) => v.id === selectedVersion);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    toast.success("Версия сохранена", {
      description: "Создана новая версия модели v1.3",
    });
  };

  const handleDeploy = async () => {
    setIsDeploying(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsDeploying(false);
    toast.success("Модель развернута", {
      description: `Версия ${currentVersion?.number} успешно развернута в Camunda`,
    });
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    // Mock API call - replace with actual API call later
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success("Модель удалена", {
      description: `Модель "${modelName}" успешно удалена.`,
    });

    setIsDeleting(false);
    setDeleteDialogOpen(false);
    navigate("/models");
  };

  return (
    <aside className="w-80 border-l bg-card p-6 space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
          Версии
        </h3>
        <Select value={selectedVersion} onValueChange={setSelectedVersion}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {mockVersions.map((version) => (
              <SelectItem key={version.id} value={version.id}>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium">{version.number}</span>
                  {version.isCurrent && (
                    <span className="text-xs text-primary">(текущая)</span>
                  )}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {currentVersion && (
          <p className="text-xs text-muted-foreground mt-2">
            {new Date(currentVersion.date).toLocaleDateString("ru-RU")},{" "}
            {currentVersion.author}
          </p>
        )}
      </div>

      <Separator />

      <div>
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
          Действия
        </h3>
        <div className="space-y-2">
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="w-full justify-start gap-2"
            variant="outline"
          >
            <Save className="h-4 w-4" />
            {isSaving ? "Сохранение..." : "Сохранить как новую версию"}
          </Button>
          <Button
            onClick={handleDeploy}
            disabled={isDeploying}
            className="w-full justify-start gap-2"
          >
            <Rocket className="h-4 w-4" />
            {isDeploying ? "Развертывание..." : `Развернуть ${currentVersion?.number}`}
          </Button>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
          Метаданные
        </h3>
        <dl className="space-y-2 text-sm">
          <div>
            <dt className="text-muted-foreground">Тип:</dt>
            <dd className="font-medium">BPMN 2.0</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">ID модели:</dt>
            <dd className="font-mono text-xs break-all">
              proc_agreement_001
            </dd>
          </div>
        </dl>
      </div>

      <Separator />

      <div>
        <Button
          variant="ghost"
          onClick={() => setDeleteDialogOpen(true)}
          className="w-full justify-start gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <Trash2 className="h-4 w-4" />
          Удалить модель
        </Button>
      </div>

      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        modelName={modelName}
        isDeleting={isDeleting}
      />
    </aside>
  );
};
