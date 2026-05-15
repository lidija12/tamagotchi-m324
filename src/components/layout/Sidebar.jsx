import { Link, useLocation } from "react-router-dom";
import { Home, History, Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePetContext } from "@/context/PetContext";
import { COLOR_MAP } from "@/components/pet/PetAvatar";

const NAV_ITEMS = [
  { path: "/",         icon: Home,     label: "Home",     emoji: "🏠" },
  { path: "/history",  icon: History,  label: "History",  emoji: "📋" },
  { path: "/settings", icon: Settings, label: "Settings", emoji: "⚙️" },
];

export default function Sidebar() {
  const location = useLocation();
  const { pet } = usePetContext();
  const colors = COLOR_MAP[pet?.color] || COLOR_MAP.lavender;

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-64 min-h-screen bg-white/80 backdrop-blur-md border-r border-border/50 shadow-sm">
        {/* Pet identity header */}
        <div className="p-5 pb-4 border-b border-border/30">
          <div className="flex items-center gap-3">
            {/* Mini pet icon */}
            <div className={`w-12 h-12 rounded-2xl ${colors.body} flex items-center justify-center shadow-sm text-lg font-black relative flex-shrink-0`}>
              <span>🐾</span>
              {/* Level badge */}
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                <span className="text-[9px] font-extrabold text-white">{pet?.level || 1}</span>
              </div>
            </div>
            <div className="min-w-0">
              <p className="text-base font-extrabold text-foreground truncate leading-tight">{pet?.name || "Tama"}</p>
              <div className="flex items-center gap-1 mt-0.5">
                <div className="h-1.5 flex-1 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    animate={{ width: `${Math.min(100, ((pet?.xp || 0) / ((pet?.level || 1) * 100)) * 100)}%` }}
                    transition={{ type: "spring", stiffness: 80 }}
                  />
                </div>
                <span className="text-[10px] text-muted-foreground font-bold flex-shrink-0">Lv.{pet?.level || 1}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Nav items */}
        <nav className="flex-1 p-3 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path}>
                <motion.div
                  whileHover={{ x: 3 }}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-2xl transition-all text-sm font-bold cursor-pointer
                    ${isActive
                      ? "bg-primary/10 text-primary shadow-sm"
                      : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                    }
                  `}
                >
                  <span className="text-base">{item.emoji}</span>
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="ml-auto w-1.5 h-5 bg-primary rounded-full"
                    />
                  )}
                </motion.div>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border/30">
          <p className="text-[10px] text-muted-foreground text-center font-semibold">TamaPet · Virtual Companion 🐾</p>
        </div>
      </aside>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-border/50 z-50 flex justify-around py-2 px-2 shadow-lg">
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path} className="flex-1 flex flex-col items-center gap-0.5 py-1">
              <motion.div
                whileTap={{ scale: 0.85 }}
                className={`relative flex flex-col items-center gap-0.5`}
              >
                <span className={`text-xl transition-all ${isActive ? "scale-110" : ""}`}>{item.emoji}</span>
                <span className={`text-[10px] font-extrabold transition-colors ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                  {item.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="mobile-nav-dot"
                    className="absolute -top-1 right-0 w-1.5 h-1.5 bg-primary rounded-full"
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>
    </>
  );
}