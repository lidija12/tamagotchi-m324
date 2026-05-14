import PetAvatar, { getMood } from "@/components/pet/PetAvatar";
import StatsPanel from "@/components/pet/StatsPanel";
import ActionButtons from "@/components/pet/ActionButtons";
import LevelBadge from "@/components/pet/LevelBadge";
import RecentActions from "@/components/pet/RecentActions";
import { usePetContext } from "@/context/PetContext";
import { motion } from "framer-motion";

export default function Home() {
  const { pet, loading, actionLoading, animationTrigger, leveledUp, performAction } = usePetContext();

  if (loading || !pet) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-4xl"
        >🐾</motion.div>
      </div>
    );
  }

  const mood = getMood(pet);
  const isSick = mood === "sick" || pet.health < 40;

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 via-pink-50/30 to-white">
      <div className="max-w-lg mx-auto px-4 py-6 space-y-4">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center pt-2"
        >
          <h1 className="text-3xl font-black text-foreground tracking-tight">{pet.name}</h1>
          <p className="text-xs text-muted-foreground font-semibold mt-0.5">Your virtual companion ✨</p>
        </motion.div>

        {/* Level badge */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <LevelBadge level={pet.level || 1} xp={pet.xp || 0} />
        </motion.div>

        {/* Pet avatar stage */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 120 }}
          className="flex justify-center items-center py-8 bg-gradient-to-b from-white/60 to-white/20 rounded-3xl border border-white/60 shadow-inner backdrop-blur-sm relative overflow-hidden"
        >
          {/* Background decorations */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-3 left-6 text-2xl opacity-20 animate-pulse">🌸</div>
            <div className="absolute top-6 right-8 text-xl opacity-20 animate-bounce">⭐</div>
            <div className="absolute bottom-4 left-10 text-xl opacity-20">🌿</div>
            <div className="absolute bottom-3 right-6 text-2xl opacity-20 animate-pulse">🌈</div>
          </div>
          <PetAvatar pet={pet} animationTrigger={animationTrigger} leveledUp={leveledUp} />
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <StatsPanel pet={pet} />
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/70 backdrop-blur-sm rounded-3xl p-5 shadow-sm border border-white/80"
        >
          <h3 className="text-xs font-extrabold text-muted-foreground uppercase tracking-widest mb-3">Actions</h3>
          <ActionButtons onAction={performAction} disabled={actionLoading} isSick={isSick} />
        </motion.div>

        {/* Recent */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <RecentActions petId={pet.id} />
        </motion.div>

      </div>
    </div>
  );
}