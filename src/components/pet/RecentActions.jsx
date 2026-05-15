import { useQuery } from "@tanstack/react-query";
import { petApi } from "@/api/petApi";
import HistoryItem from "./HistoryItem";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function RecentActions({ petId }) {
  const { data: actions = [] } = useQuery({
    queryKey: ["pet-actions-recent", petId],
    queryFn: () => petApi.getActions(petId, { limit: 3 }),
    refetchInterval: 8000,
    enabled: !!petId,
  });

  if (actions.length === 0) return null;

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-5 shadow-sm border border-white/80">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-xs font-extrabold text-muted-foreground uppercase tracking-widest">Recent Activity</h3>
        <Link to="/history" className="flex items-center gap-0.5 text-xs font-bold text-primary hover:underline">
          View all <ChevronRight className="w-3 h-3" />
        </Link>
      </div>
      {actions.map((a, i) => <HistoryItem key={a.id} action={a} index={i} />)}
    </div>
  );
}
