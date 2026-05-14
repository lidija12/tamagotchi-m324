import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function AppLayout({ petName }) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar petName={petName} />
      <main className="flex-1 pb-20 md:pb-0 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}