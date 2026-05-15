import { motion, AnimatePresence } from "framer-motion";

const ACTIONS = [
  { type: "feed",     emoji: "🍕", label: "Feed",     bg: "from-orange-100 to-orange-50",   border: "border-orange-200", text: "text-orange-700",  activeBg: "bg-orange-200" },
  { type: "play",     emoji: "🎮", label: "Play",     bg: "from-pink-100 to-pink-50",       border: "border-pink-200",   text: "text-pink-700",    activeBg: "bg-pink-200" },
  { type: "sleep",    emoji: "🌙", label: "Sleep",    bg: "from-indigo-100 to-indigo-50",   border: "border-indigo-200", text: "text-indigo-700",  activeBg: "bg-indigo-200" },
  { type: "clean",    emoji: "🛁", label: "Clean",    bg: "from-sky-100 to-sky-50",         border: "border-sky-200",    text: "text-sky-700",     activeBg: "bg-sky-200" },
  { type: "pet",      emoji: "💕", label: "Cuddle",   bg: "from-rose-100 to-rose-50",       border: "border-rose-200",   text: "text-rose-700",    activeBg: "bg-rose-200" },
  { type: "walk",     emoji: "🌿", label: "Walk",     bg: "from-emerald-100 to-emerald-50", border: "border-emerald-200",text: "text-emerald-700", activeBg: "bg-emerald-200" },
];

const MEDICINE = { type: "medicine", emoji: "💊", label: "Medicine", bg: "from-purple-100 to-purple-50", border: "border-purple-200", text: "text-purple-700", activeBg: "bg-purple-200" };

export default function ActionButtons({ onAction, disabled, isSick }) {
  const actions = isSick ? [...ACTIONS, MEDICINE] : ACTIONS;

  return (
    <div className="grid grid-cols-3 gap-2.5">
      <AnimatePresence>
        {actions.map((action) => (
          <motion.button
            key={action.type}
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onAction(action.type)}
            disabled={disabled}
            className={`
              flex flex-col items-center gap-1.5 py-3.5 px-2 rounded-2xl border-2
              bg-gradient-to-b ${action.bg} ${action.border} ${action.text}
              font-bold text-xs transition-all shadow-sm
              disabled:opacity-50 disabled:cursor-not-allowed
              active:${action.activeBg}
            `}
          >
            <motion.span
              className="text-2xl"
              whileTap={{ rotate: [0, -15, 15, 0], scale: [1, 1.3, 1] }}
              transition={{ duration: 0.3 }}
            >
              {action.emoji}
            </motion.span>
            <span>{action.label}</span>
          </motion.button>
        ))}
      </AnimatePresence>
    </div>
  );
}