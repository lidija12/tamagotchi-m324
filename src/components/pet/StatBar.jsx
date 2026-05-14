import { motion } from "framer-motion";

const STAT_CONFIG = {
  hunger: { icon: "🍔", label: "Hunger", color: "bg-orange-400" },
  happiness: { icon: "😄", label: "Happiness", color: "bg-pink-400" },
  energy: { icon: "⚡", label: "Energy", color: "bg-yellow-400" },
  cleanliness: { icon: "✨", label: "Cleanliness", color: "bg-blue-400" },
};

export default function StatBar({ statKey, value }) {
  const config = STAT_CONFIG[statKey];
  if (!config) return null;

  const clampedValue = Math.max(0, Math.min(100, value || 0));

  return (
    <div className="flex items-center gap-3">
      <span className="text-xl w-8 text-center">{config.icon}</span>
      <div className="flex-1">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs font-bold text-foreground/70">{config.label}</span>
          <span className="text-xs font-bold text-foreground/50">{Math.round(clampedValue)}%</span>
        </div>
        <div className="h-3 bg-muted rounded-full overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${config.color}`}
            initial={{ width: 0 }}
            animate={{ width: `${clampedValue}%` }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
          />
        </div>
      </div>
    </div>
  );
}