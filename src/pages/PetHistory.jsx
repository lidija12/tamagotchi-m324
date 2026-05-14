import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { petApi } from "@/api/petApi";
import HistoryItem from "@/components/pet/HistoryItem";
import { usePetContext } from "@/context/PetContext";
import { motion } from "framer-motion";

const FILTER_OPTIONS = [
  { value: "all", label: "All", emoji: "📋" },
  { value: "feed", label: "Feed", emoji: "🍕" },
  { value: "play", label: "Play", emoji: "🎮" },
  { value: "sleep", label: "Sleep", emoji: "🌙" },
  { value: "clean", label: "Clean", emoji: "🛁" },
  { value: "pet", label: "Cuddle", emoji: "💕" },
  { value: "walk", label: "Walk", emoji: "🌿" },
  { value: "medicine", label: "Medicine", emoji: "💊" },
];

export default function PetHistory() {
  const { pet, loading } = usePetContext();
  const [activeFilter, setActiveFilter] = useState("all");

  const { data: actions = [], isLoading } = useQuery({
    queryKey: ["pet-actions-all", pet?.id],
    queryFn: () => petApi.getActions(pet.id, { limit: 100 }),
    enabled: !!pet?.id,
    refetchInterval: 10000,
  });

  if (loading || !pet) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="text-4xl">🐾</motion.div>
      </div>
    );
  }

  const filtered = activeFilter === "all" ? actions : actions.filter((a) => a.action_type === activeFilter);

  const counts = {};
  FILTER_OPTIONS.slice(1).forEach((f) => {
    counts[f.value] = actions.filter((a) => a.action_type === f.value).length;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 via-pink-50/30 to-white">
      <div className="max-w-lg mx-auto px-4 py-6 space-y-5">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-violet-100 rounded-2xl flex items-center justify-center text-2xl shadow-sm border border-violet-200">📋</div>
            <div>
              <h2 className="text-xl font-black text-foreground">Activity History</h2>
              <p className="text-xs text-muted-foreground font-semibold">{actions.length} total actions with {pet.name}</p>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="grid grid-cols-4 gap-2">
          {FILTER_OPTIONS.slice(1, 5).map((f) => (
            <div key={f.value} className="bg-white/70 rounded-2xl p-3 text-center border border-white/80 shadow-sm">
              <div className="text-xl">{f.emoji}</div>
              <div className="text-lg font-black text-foreground">{counts[f.value] || 0}</div>
              <div className="text-[10px] text-muted-foreground font-semibold">{f.label}</div>
            </div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {FILTER_OPTIONS.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                activeFilter === f.value
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-white/60 text-muted-foreground border-border hover:bg-white"
              }`}
            >
              <span>{f.emoji}</span>
              <span>{f.label}</span>
            </button>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-white/70 backdrop-blur-sm rounded-3xl p-5 shadow-sm border border-white/80">
          {isLoading ? (
            <div className="flex justify-center py-10">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="text-3xl">🐾</motion.div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-4xl mb-3">🐾</p>
              <p className="text-sm font-bold text-muted-foreground">No actions yet!</p>
              <p className="text-xs text-muted-foreground mt-1">Go take care of {pet.name} first.</p>
            </div>
          ) : (
            filtered.map((a, i) => <HistoryItem key={a.id} action={a} index={i < filtered.length - 1 ? i : undefined} />)
          )}
        </motion.div>
      </div>
    </div>
  );
}
