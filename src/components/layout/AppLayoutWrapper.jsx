import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { usePetContext } from "@/context/PetContext";

export default function AppLayoutWrapper() {
  const { pet } = usePetContext();

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 pb-20 md:pb-0 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}