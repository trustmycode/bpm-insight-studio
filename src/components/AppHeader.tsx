import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export const AppHeader = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
      <div className="container flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <FileText className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold leading-tight">BPM Platform</h1>
            <p className="text-xs text-muted-foreground">Рабочее место аналитика</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            Выйти
          </Button>
        </div>
      </div>
    </header>
  );
};
