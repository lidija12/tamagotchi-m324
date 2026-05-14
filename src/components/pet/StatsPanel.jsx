import { motion } from "framer-motion";

const STATS = [
  { key: "hunger",      icon: "🍔", label: "Hunger",      color: "bg-orange-400",  track: "bg-orange-100" },
  { key: "happiness",   icon: "😄", label: "Happiness",   color: "bg-pink-400",    track: "bg-pink-100" },
  { key: "energy",      icon: "⚡", label: "Energy",      color: "bg-yellow-400",  track: "bg-yellow-100" },
  { key: "cleanliness", icon: "✨", label: "Cleanliness", color: "bg-sky-400",     track: "bg-sky-100" },
  { key: "health",      icon: "❤️", label: "Health",      color: "bg-red-400",     track: "bg-red-100" },
];

function getBarColor(val, defaultColor) {
  if (val <= 20) return "bg-red-500";
  if (val <= 40) return "bg-orange-400";
  return defaultColor;
}

export default function StatsPanel({ pet }) {
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-5 shadow-sm border border-white/80 space-y-3.5">
      <h3 className="text-xs font-extrabold text-muted-foreground uppercase tracking-widest mb-1">Pet Stats</h3>
      {STATS.map(({ key, icon, label, color, track }) => {
        const val = Math.max(0, Math.min(100, pet[key] ?? 100));
        const barColor = getBarColor(val, color);
        return (
          <div key={key} className="flex items-center gap-3">
            <span className="text-xl w-7 text-center flex-shrink-0">{icon}</span>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-bold text-foreground/70">{label}</span>
                <span className={`text-xs font-extrabold ${val <= 25 ? "text-red-500" : "text-foreground/40"}`}>
                  {Math.round(val)}%
                </span>
              </div>
              <div className={`h-3 ${track} rounded-full overflow-hidden`}>
                <motion.div
                  className={`h-full ${barColor} rounded-full transition-colors duration-500`}
                  initial={{ width: 0 }}
                  animate={{ width: `${val}%` }}
                  transition={{ type: "spring", stiffness: 80, damping: 14 }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}