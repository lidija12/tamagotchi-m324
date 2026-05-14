import { createContext, useContext } from "react";
import usePet from "@/hooks/usePet";

const PetContext = createContext(null);

export function PetProvider({ children }) {
  const petState = usePet();
  return (
    <PetContext.Provider value={petState}>
      {children}
    </PetContext.Provider>
  );
}

export function usePetContext() {
  const ctx = useContext(PetContext);
  if (!ctx) throw new Error("usePetContext must be used within PetProvider");
  return ctx;
}