import { useState, useEffect, useCallback, useRef } from "react";
import { petApi } from "@/api/petApi";
import { queryClientInstance } from "@/lib/query-client";

const DEFAULT_PET = {
  name: "Tama",
  color: "lavender",
  hunger: 80,
  happiness: 80,
  energy: 80,
  cleanliness: 80,
  health: 100,
  xp: 0,
  level: 1,
  is_sleeping: false,
};

const DECAY_INTERVAL = 20000;
const XP_PER_ACTION = 15;

function clamp(val) {
  return Math.max(0, Math.min(100, val));
}

function refreshActionQueries(petId) {
  queryClientInstance.invalidateQueries({ queryKey: ["pet-actions-recent", petId] });
  queryClientInstance.invalidateQueries({ queryKey: ["pet-actions-all", petId] });
}

export default function usePet() {
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [animationTrigger, setAnimationTrigger] = useState(null);
  const [leveledUp, setLeveledUp] = useState(false);
  const petRef = useRef(null);

  useEffect(() => {
    async function init() {
      try {
        const currentPet = await petApi.getPet();
        setPet(currentPet);
        petRef.current = currentPet;
      } finally {
        setLoading(false);
      }
    }
    init();
  }, []);

  useEffect(() => {
    if (!pet?.id) return;

    const interval = setInterval(async () => {
      const current = petRef.current;
      if (!current || current.is_sleeping) return;

      const updates = {
        hunger: clamp(current.hunger - 2),
        happiness: clamp(current.happiness - 1.5),
        energy: clamp(current.energy - 1),
        cleanliness: clamp(current.cleanliness - 1.5),
      };

      const lowCount = [current.hunger, current.happiness, current.energy, current.cleanliness].filter((v) => v < 25).length;
      if (lowCount >= 2) {
        updates.health = clamp(current.health - 2);
      }

      const updated = await petApi.updatePet(current.id, updates);
      setPet(updated);
      petRef.current = updated;
    }, DECAY_INTERVAL);

    return () => clearInterval(interval);
  }, [pet?.id]);

  const performAction = useCallback(async (actionType) => {
    if (!petRef.current || actionLoading) return;

    setActionLoading(true);
    setAnimationTrigger(actionType);

    try {
      const current = petRef.current;
      let updates = {};
      let description = "";

      switch (actionType) {
        case "feed":
          updates = { hunger: clamp(current.hunger + 28), is_sleeping: false };
          description = `Fed ${current.name} a yummy meal! 🍕`;
          break;
        case "play":
          updates = { happiness: clamp(current.happiness + 22), energy: clamp(current.energy - 12), is_sleeping: false };
          description = `Played fun games with ${current.name}! 🎮`;
          break;
        case "sleep":
          updates = { energy: clamp(current.energy + 40), is_sleeping: true };
          description = `${current.name} took a cozy nap. 🌙`;
          break;
        case "clean":
          updates = { cleanliness: clamp(current.cleanliness + 32), is_sleeping: false };
          description = `Gave ${current.name} a squeaky clean bath! 🛁`;
          break;
        case "pet":
          updates = { happiness: clamp(current.happiness + 12), is_sleeping: false };
          description = `Cuddled with ${current.name}! 💕`;
          break;
        case "walk":
          updates = {
            happiness: clamp(current.happiness + 18),
            energy: clamp(current.energy - 15),
            health: clamp(current.health + 5),
            is_sleeping: false,
          };
          description = `Went on a walk with ${current.name}! 🌿`;
          break;
        case "medicine":
          updates = { health: clamp(current.health + 35), is_sleeping: false };
          description = `Gave ${current.name} medicine. Feeling better! 💊`;
          break;
        default:
          break;
      }

      let newXp = (current.xp || 0) + XP_PER_ACTION;
      let newLevel = current.level || 1;
      const xpNeeded = newLevel * 100;
      let didLevelUp = false;

      if (newXp >= xpNeeded) {
        newXp -= xpNeeded;
        newLevel += 1;
        didLevelUp = true;
      }

      updates.xp = newXp;
      updates.level = newLevel;

      const updated = await petApi.updatePet(current.id, updates);
      setPet(updated);
      petRef.current = updated;

      await petApi.createAction(current.id, { action_type: actionType, description });
      refreshActionQueries(current.id);

      if (didLevelUp) {
        setLeveledUp(true);
        setTimeout(() => setLeveledUp(false), 3000);
      }
    } finally {
      setTimeout(() => setAnimationTrigger(null), 600);
      setActionLoading(false);
    }
  }, [actionLoading]);

  const renamePet = useCallback(async (newName) => {
    if (!petRef.current) return;
    const updated = await petApi.updatePet(petRef.current.id, { name: newName });
    setPet(updated);
    petRef.current = updated;
  }, []);

  const changeColor = useCallback(async (newColor) => {
    if (!petRef.current) return;
    const updated = await petApi.updatePet(petRef.current.id, { color: newColor });
    setPet(updated);
    petRef.current = updated;
  }, []);

  const resetPet = useCallback(async () => {
    if (!petRef.current) return;
    const updated = await petApi.updatePet(petRef.current.id, {
      ...DEFAULT_PET,
      name: petRef.current.name,
      color: petRef.current.color,
    });
    setPet(updated);
    petRef.current = updated;
  }, []);

  return { pet, loading, actionLoading, animationTrigger, leveledUp, performAction, renamePet, changeColor, resetPet };
}
