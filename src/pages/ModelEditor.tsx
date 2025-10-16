import { AppHeader } from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { BPMNCanvas } from "@/components/BPMNCanvas";
import { VersionControlPanel } from "@/components/VersionControlPanel";

const ModelEditor = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock data - in real app, this would come from API
  const modelName = id === "new" 
    ? "Новая модель процесса" 
    : "Процесс согласования договора";

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      
      {/* Editor Header */}
      <div className="border-b bg-card px-6 py-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/models")}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Каталог
          </Button>
          <div className="h-6 w-px bg-border" />
          <h1 className="text-xl font-semibold">{modelName}</h1>
        </div>
      </div>

      {/* Editor Content */}
      <div className="flex-1 flex overflow-hidden">
        <BPMNCanvas />
        <VersionControlPanel />
      </div>
    </div>
  );
};

export default ModelEditor;
