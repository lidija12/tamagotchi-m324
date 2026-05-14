import { motion, AnimatePresence } from "framer-motion";

export const COLOR_MAP = {
  lavender: { body: "bg-violet-300", inner: "bg-violet-200", accent: "bg-violet-400", glow: "shadow-violet-300/60" },
  mint:     { body: "bg-emerald-300", inner: "bg-emerald-200", accent: "bg-emerald-400", glow: "shadow-emerald-300/60" },
  peach:    { body: "bg-orange-300", inner: "bg-orange-200", accent: "bg-orange-400", glow: "shadow-orange-300/60" },
  sky:      { body: "bg-sky-300", inner: "bg-sky-200", accent: "bg-sky-400", glow: "shadow-sky-300/60" },
  rose:     { body: "bg-rose-300", inner: "bg-rose-200", accent: "bg-rose-400", glow: "shadow-rose-300/60" },
};

export function getMood(pet) {
  if (pet.is_sleeping || pet.energy < 15) return "sleeping";
  const lowStats = [pet.hunger, pet.happiness, pet.energy, pet.cleanliness, pet.health].filter(v => v < 30).length;
  if (lowStats >= 3 || pet.health < 25) return "sick";
  if (pet.health < 40) return "sick";
  if (pet.hunger < 25) return "hungry";
  if (pet.energy < 30) return "tired";
  if (pet.cleanliness < 25) return "dirty";
  if (pet.happiness < 25) return "sad";
  const avg = (pet.hunger + pet.happiness + pet.energy + pet.cleanliness + pet.health) / 5;
  if (avg >= 70) return "happy";
  return "neutral";
}

const MOOD_DISPLAY = {
  happy:    { label: "Happy!",    emoji: "😊" },
  hungry:   { label: "Hungry...", emoji: "🍕" },
  tired:    { label: "Tired...",  emoji: "😴" },
  dirty:    { label: "Dirty!",    emoji: "🧹" },
  sad:      { label: "Sad...",    emoji: "😢" },
  sick:     { label: "Sick!",     emoji: "🤒" },
  sleeping: { label: "Sleeping…", emoji: "💤" },
  neutral:  { label: "Okay~",     emoji: "😐" },
};

function PetEyes({ mood }) {
  if (mood === "sleeping") return (
    <div className="flex gap-6">
      <span className="text-2xl font-black leading-none">—</span>
      <span className="text-2xl font-black leading-none">—</span>
    </div>
  );
  if (mood === "happy") return (
    <div className="flex gap-6">
      <span className="text-2xl font-black leading-none">◕</span>
      <span className="text-2xl font-black leading-none">◕</span>
    </div>
  );
  if (mood === "sad" || mood === "sick") return (
    <div className="flex gap-6">
      <span className="text-2xl font-black leading-none">╥</span>
      <span className="text-2xl font-black leading-none">╥</span>
    </div>
  );
  if (mood === "hungry") return (
    <div className="flex gap-6">
      <span className="text-2xl font-black leading-none">◉</span>
      <span className="text-2xl font-black leading-none">◉</span>
    </div>
  );
  if (mood === "tired") return (
    <div className="flex gap-6">
      <span className="text-xl font-black leading-none" style={{transform:'scaleY(0.5)', display:'inline-block'}}>●</span>
      <span className="text-xl font-black leading-none" style={{transform:'scaleY(0.5)', display:'inline-block'}}>●</span>
    </div>
  );
  return (
    <div className="flex gap-6">
      <span className="text-2xl font-black leading-none">●</span>
      <span className="text-2xl font-black leading-none">●</span>
    </div>
  );
}

function PetMouth({ mood }) {
  const map = { happy: "◡", hungry: "○", sad: "︵", sick: "~", tired: "—", dirty: "—", neutral: "—", sleeping: "·" };
  return <span className="text-xl font-black mt-1 leading-none">{map[mood] || "—"}</span>;
}

export default function PetAvatar({ pet, animationTrigger, leveledUp }) {
  const colors = COLOR_MAP[pet?.color] || COLOR_MAP.lavender;
  const mood = getMood(pet);

  const getAnimation = () => {
    if (animationTrigger === "sleep") return "sleeping";
    if (animationTrigger) return "react";
    if (mood === "sleeping") return "sleeping";
    if (mood === "happy") return "bounce";
    if (mood === "sad" || mood === "sick") return "droop";
    return "idle";
  };

  return (
    <div className="relative flex flex-col items-center select-none">
      {/* Level up sparkles */}
      <AnimatePresence>
        {leveledUp && (
          <motion.div
            className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {["✨","⭐","💫","✨","⭐"].map((s, i) => (
              <motion.span
                key={i}
                className="absolute text-2xl"
                initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.4, 0],
                  x: [0, (i - 2) * 55],
                  y: [0, -60 - i * 12],
                }}
                transition={{ duration: 1.2, delay: i * 0.12 }}
              >
                {s}
              </motion.span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ZZZ for sleeping */}
      <AnimatePresence>
        {mood === "sleeping" && (
          <motion.div
            className="absolute -top-6 right-6 z-10 flex flex-col items-center gap-0"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: [0, 1, 1, 0], y: [4, 0, -8, -16] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <span className="text-indigo-400 font-extrabold text-lg leading-none">z</span>
            <span className="text-indigo-300 font-extrabold text-base leading-none ml-2">z</span>
            <span className="text-indigo-200 font-extrabold text-sm leading-none ml-4">z</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sick indicator */}
      <AnimatePresence>
        {mood === "sick" && (
          <motion.span
            className="absolute -top-4 left-4 text-xl z-10"
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >💊</motion.span>
        )}
      </AnimatePresence>

      {/* Pet body */}
      <motion.div
        key={animationTrigger ?? mood}
        animate={(() => {
          const a = getAnimation();
          if (a === "react") return { scale: [1, 1.18, 0.93, 1.06, 1], rotate: [0, -8, 8, -4, 0] };
          if (a === "sleeping") return { y: [0, 3, 0], scale: [1, 1.02, 1] };
          if (a === "bounce") return { y: [0, -14, 0, -7, 0] };
          if (a === "droop") return { y: [0, 3, 0] };
          return { y: [0, -5, 0] };
        })()}
        transition={(() => {
          const a = getAnimation();
          if (a === "react") return { duration: 0.5 };
          if (a === "sleeping") return { duration: 3.5, repeat: Infinity, ease: "easeInOut" };
          if (a === "bounce") return { duration: 0.7, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.2 };
          if (a === "droop") return { duration: 2.5, repeat: Infinity, ease: "easeInOut" };
          return { duration: 2.8, repeat: Infinity, ease: "easeInOut" };
        })()}
        className="relative"
      >
        {/* Main body */}
        <div className={`relative w-40 h-40 md:w-48 md:h-48 rounded-full ${colors.body} shadow-2xl ${colors.glow} flex items-center justify-center`}>
          {/* Ears */}
          <div className={`absolute -top-5 left-4 w-11 h-11 ${colors.body} rounded-full rotate-[-20deg]`} />
          <div className={`absolute -top-5 right-4 w-11 h-11 ${colors.body} rounded-full rotate-[20deg]`} />
          <div className={`absolute -top-3 left-6 w-6 h-6 ${colors.inner} rounded-full rotate-[-20deg]`} />
          <div className={`absolute -top-3 right-6 w-6 h-6 ${colors.inner} rounded-full rotate-[20deg]`} />

          {/* Face */}
          <div className="relative z-10 flex flex-col items-center">
            <PetEyes mood={mood} />
            <PetMouth mood={mood} />
            {/* Blush */}
            <div className="flex gap-12 mt-1">
              <div className={`w-5 h-3 ${colors.inner} rounded-full opacity-80`} />
              <div className={`w-5 h-3 ${colors.inner} rounded-full opacity-80`} />
            </div>
          </div>

          {/* Belly spot */}
          <div className={`absolute bottom-6 w-14 h-10 ${colors.inner} rounded-full opacity-60`} />
        </div>

        {/* Feet */}
        <div className="flex justify-center gap-10 -mt-2 relative z-10">
          <div className={`w-11 h-6 ${colors.body} rounded-b-full`} />
          <div className={`w-11 h-6 ${colors.body} rounded-b-full`} />
        </div>
      </motion.div>

      {/* Mood badge */}
      <AnimatePresence mode="wait">
        <motion.div
          key={mood}
          initial={{ opacity: 0, scale: 0.85, y: 6 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: -6 }}
          transition={{ duration: 0.25 }}
          className="mt-4 flex items-center gap-1.5 bg-white/80 backdrop-blur-sm border border-white/60 shadow-sm rounded-full px-4 py-1.5"
        >
          <span className="text-base">{MOOD_DISPLAY[mood]?.emoji}</span>
          <span className="text-sm font-extrabold text-foreground/80">{MOOD_DISPLAY[mood]?.label}</span>
        </motion.div>
      </AnimatePresence>

      {/* Level up banner */}
      <AnimatePresence>
        {leveledUp && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -10 }}
            className="absolute -bottom-12 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-sm font-extrabold px-5 py-1.5 rounded-full shadow-lg"
          >
            ⭐ LEVEL UP!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}