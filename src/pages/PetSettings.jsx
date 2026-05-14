import { useState } from "react";
import { usePetContext } from "@/context/PetContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import PetAvatar, { COLOR_MAP } from "@/components/pet/PetAvatar";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const COLORS = [
  { id: "lavender", label: "Lavender", swatch: "bg-violet-300",  ring: "ring-violet-400" },
  { id: "mint",     label: "Mint",     swatch: "bg-emerald-300", ring: "ring-emerald-400" },
  { id: "peach",    label: "Peach",    swatch: "bg-orange-300",  ring: "ring-orange-400" },
  { id: "sky",      label: "Sky",      swatch: "bg-sky-300",     ring: "ring-sky-400" },
  { id: "rose",     label: "Rose",     swatch: "bg-rose-300",    ring: "ring-rose-400" },
];

export default function PetSettings() {
  const { pet, loading, renamePet, changeColor, resetPet } = usePetContext();
  const [nameInput, setNameInput] = useState("");
  const [saving, setSaving] = useState(false);

  if (loading || !pet) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="text-4xl">🐾</motion.div>
      </div>
    );
  }

  const handleRename = async () => {
    if (!nameInput.trim()) return;
    setSaving(true);
    await renamePet(nameInput.trim());
    setNameInput("");
    setSaving(false);
    toast.success("✨ Pet renamed!");
  };

  const handleColorChange = async (color) => {
    await changeColor(color);
    toast.success("🎨 Color updated!");
  };

  const handleReset = async () => {
    await resetPet();
    toast.success("🔄 Pet stats reset!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 via-pink-50/30 to-white">
      <div className="max-w-lg mx-auto px-4 py-6 space-y-5">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-violet-100 rounded-2xl flex items-center justify-center text-2xl shadow-sm border border-violet-200">⚙️</div>
            <div>
              <h2 className="text-xl font-black text-foreground">Settings</h2>
              <p className="text-xs text-muted-foreground font-semibold">Customize your companion</p>
            </div>
          </div>
        </motion.div>

        {/* Pet preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.05 }}
          className="bg-gradient-to-b from-white/80 to-white/40 rounded-3xl p-6 border border-white/80 shadow-sm flex justify-center items-center"
        >
          <PetAvatar pet={pet} animationTrigger={null} leveledUp={false} />
        </motion.div>

        {/* Rename */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/70 backdrop-blur-sm rounded-3xl p-5 shadow-sm border border-white/80 space-y-3"
        >
          <div className="flex items-center gap-2">
            <span className="text-xl">🐾</span>
            <h3 className="text-sm font-extrabold text-foreground">Rename Pet</h3>
          </div>
          <p className="text-xs text-muted-foreground">
            Current name: <span className="font-extrabold text-foreground">{pet.name}</span>
          </p>
          <div className="flex gap-2">
            <Input
              placeholder={`New name for ${pet.name}...`}
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleRename()}
              className="rounded-xl border-border/50 bg-white/80 text-sm"
            />
            <Button
              onClick={handleRename}
              disabled={!nameInput.trim() || saving}
              className="rounded-xl px-5 bg-primary hover:bg-primary/90 font-bold"
            >
              Save
            </Button>
          </div>
        </motion.div>

        {/* Color picker */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white/70 backdrop-blur-sm rounded-3xl p-5 shadow-sm border border-white/80 space-y-4"
        >
          <div className="flex items-center gap-2">
            <span className="text-xl">🎨</span>
            <h3 className="text-sm font-extrabold text-foreground">Pet Color</h3>
          </div>
          <div className="flex gap-4 flex-wrap">
            {COLORS.map((c) => (
              <motion.button
                key={c.id}
                whileHover={{ scale: 1.12, y: -2 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => handleColorChange(c.id)}
                className="flex flex-col items-center gap-2"
              >
                <div className={`
                  w-14 h-14 rounded-full ${c.swatch} shadow-md transition-all duration-200
                  ${pet.color === c.id ? `ring-4 ${c.ring} ring-offset-2 scale-110` : "ring-2 ring-white ring-offset-1"}
                `} />
                <span className={`text-[11px] font-bold ${pet.color === c.id ? "text-foreground" : "text-muted-foreground"}`}>
                  {c.label}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Stats preview */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/70 backdrop-blur-sm rounded-3xl p-5 shadow-sm border border-white/80 space-y-3"
        >
          <div className="flex items-center gap-2">
            <span className="text-xl">📊</span>
            <h3 className="text-sm font-extrabold text-foreground">Current Stats</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Hunger", val: pet.hunger, emoji: "🍔" },
              { label: "Happiness", val: pet.happiness, emoji: "😄" },
              { label: "Energy", val: pet.energy, emoji: "⚡" },
              { label: "Cleanliness", val: pet.cleanliness, emoji: "✨" },
              { label: "Health", val: pet.health ?? 100, emoji: "❤️" },
              { label: "Level", val: pet.level, emoji: "⭐", raw: true },
            ].map(({ label, val, emoji, raw }) => (
              <div key={label} className="bg-muted/40 rounded-2xl p-3 flex items-center gap-2">
                <span className="text-lg">{emoji}</span>
                <div>
                  <p className="text-[10px] text-muted-foreground font-semibold">{label}</p>
                  <p className={`text-sm font-extrabold ${!raw && val <= 25 ? "text-red-500" : "text-foreground"}`}>
                    {raw ? val : `${Math.round(val)}%`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Reset */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white/70 backdrop-blur-sm rounded-3xl p-5 shadow-sm border border-red-100 space-y-3"
        >
          <div className="flex items-center gap-2">
            <RotateCcw className="w-4 h-4 text-destructive" />
            <h3 className="text-sm font-extrabold text-foreground">Danger Zone</h3>
          </div>
          <p className="text-xs text-muted-foreground">
            Reset all of {pet.name}'s stats back to default. Name and color are preserved.
          </p>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="rounded-xl font-bold">
                <RotateCcw className="w-4 h-4" />
                Reset Pet Stats
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="rounded-3xl border-border/50">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-lg font-extrabold">Reset {pet.name}'s stats?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will reset all stats, XP, and level. {pet.name} will forget everything!
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleReset} className="rounded-xl bg-destructive hover:bg-destructive/90">
                  Yes, Reset!
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </motion.div>

      </div>
    </div>
  );
}