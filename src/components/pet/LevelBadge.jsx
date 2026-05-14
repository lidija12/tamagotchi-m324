import { motion } from "framer-motion";

export default function LevelBadge({ level, xp }) {
  const xpForNext = level * 100;
  const progress = Math.min(100, (xp / xpForNext) * 100);

  return (
    <div className="bg-gradient-to-r from-violet-100 to-purple-50 border border-violet-200 rounded-2xl px-4 py-3 flex items-center gap-3 shadow-sm">
      <motion.div
        animate={{ rotate: [0, 8, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
        className="text-2xl flex-shrink-0"
      >⭐</motion.div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-extrabold text-violet-700">Level {level}</span>
          <span className="text-[10px] font-bold text-violet-400">{xp} / {xpForNext} XP</span>
        </div>
        <div className="h-2.5 bg-violet-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-violet-400 to-purple-500 rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", stiffness: 70, damping: 13 }}
          />
        </div>
      </div>
    </div>
  );
}