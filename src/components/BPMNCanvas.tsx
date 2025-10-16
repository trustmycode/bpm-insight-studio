import { useEffect, useRef } from "react";

export const BPMNCanvas = () => {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // In future iterations, bpmn-js will be initialized here
    // For now, we show a placeholder with basic BPMN representation
  }, []);

  return (
    <div 
      ref={canvasRef}
      className="flex-1 bg-background/50 flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: `
          radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)
        `,
        backgroundSize: '20px 20px'
      }}
    >
      <div className="space-y-8">
        {/* Simple BPMN-like representation */}
        <div className="flex items-center gap-8">
          {/* Start Event */}
          <div className="flex flex-col items-center gap-2">
            <div className="h-12 w-12 rounded-full border-4 border-success bg-card shadow-lg" />
            <span className="text-xs font-medium text-muted-foreground">Start</span>
          </div>

          {/* Arrow */}
          <div className="h-0.5 w-16 bg-foreground/30 relative">
            <div className="absolute -right-1 -top-1.5 h-0 w-0 border-t-4 border-l-8 border-b-4 border-transparent border-l-foreground/30" />
          </div>

          {/* Task */}
          <div className="flex flex-col items-center gap-2">
            <div className="h-20 w-32 rounded-lg border-2 border-primary bg-card shadow-lg flex items-center justify-center">
              <span className="text-sm font-medium">Согласование</span>
            </div>
            <span className="text-xs font-medium text-muted-foreground">Task</span>
          </div>

          {/* Arrow */}
          <div className="h-0.5 w-16 bg-foreground/30 relative">
            <div className="absolute -right-1 -top-1.5 h-0 w-0 border-t-4 border-l-8 border-b-4 border-transparent border-l-foreground/30" />
          </div>

          {/* End Event */}
          <div className="flex flex-col items-center gap-2">
            <div className="h-12 w-12 rounded-full border-4 border-destructive bg-card shadow-lg" />
            <span className="text-xs font-medium text-muted-foreground">End</span>
          </div>
        </div>

        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            BPMN-редактор (заглушка)
          </p>
          <p className="text-xs text-muted-foreground max-w-md">
            В будущих версиях здесь будет полноценный редактор на базе bpmn-js
            для создания и редактирования диаграмм бизнес-процессов
          </p>
        </div>
      </div>
    </div>
  );
};
