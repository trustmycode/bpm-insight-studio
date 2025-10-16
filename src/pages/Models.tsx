import { AppHeader } from "@/components/AppHeader";
import { ModelsTable } from "@/components/ModelsTable";

const Models = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      <main className="flex-1">
        <div className="container py-8 px-6">
          <ModelsTable />
        </div>
      </main>
    </div>
  );
};

export default Models;
