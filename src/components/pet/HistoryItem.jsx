import { formatDistanceToNow } from "date-fns";

const ACTION_META = {
  feed:     { emoji: "🍕", bg: "bg-orange-100",  text: "text-orange-600",  border: "border-orange-200" },
  play:     { emoji: "🎮", bg: "bg-pink-100",    text: "text-pink-600",    border: "border-pink-200" },
  sleep:    { emoji: "🌙", bg: "bg-indigo-100",  text: "text-indigo-600",  border: "border-indigo-200" },
  clean:    { emoji: "🛁", bg: "bg-sky-100",     text: "text-sky-600",     border: "border-sky-200" },
  pet:      { emoji: "💕", bg: "bg-rose-100",    text: "text-rose-600",    border: "border-rose-200" },
  walk:     { emoji: "🌿", bg: "bg-emerald-100", text: "text-emerald-600", border: "border-emerald-200" },
  medicine: { emoji: "💊", bg: "bg-purple-100",  text: "text-purple-600",  border: "border-purple-200" },
};

export default function HistoryItem({ action, index }) {
  const meta = ACTION_META[action.action_type] || ACTION_META.feed;
  const timeAgo = action.created_date
    ? formatDistanceToNow(new Date(action.created_date), { addSuffix: true })
    : "just now";

  return (
    <div className="flex items-start gap-3 py-3 border-b border-border/40 last:border-0">
      {/* Timeline dot */}
      <div className="flex flex-col items-center flex-shrink-0 pt-0.5">
        <div className={`w-9 h-9 rounded-xl ${meta.bg} border ${meta.border} flex items-center justify-center shadow-sm`}>
          <span className="text-lg">{meta.emoji}</span>
        </div>
        {index !== undefined && (
          <div className="w-0.5 h-3 bg-border/30 mt-1" />
        )}
      </div>
      <div className="flex-1 min-w-0 pt-0.5">
        <p className="text-sm font-semibold text-foreground leading-snug">
          {action.description || `${action.action_type} action`}
        </p>
        <p className="text-[11px] text-muted-foreground mt-0.5 font-medium">{timeAgo}</p>
      </div>
    </div>
  );
}