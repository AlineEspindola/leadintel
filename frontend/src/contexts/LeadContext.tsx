import { createContext, useContext, useState, ReactNode } from "react";
import { CompanyResponseDTO } from "../types";

interface LeadContextValue {
  currentLead: CompanyResponseDTO | null;
  setCurrentLead: (lead: CompanyResponseDTO | null) => void;
}

const LeadContext = createContext<LeadContextValue | null>(null);

export function LeadProvider({ children }: { children: ReactNode }) {
  const [currentLead, setCurrentLead] = useState<CompanyResponseDTO | null>(
    null,
  );
  return (
    <LeadContext.Provider value={{ currentLead, setCurrentLead }}>
      {children}
    </LeadContext.Provider>
  );
}

export function useLead() {
  const ctx = useContext(LeadContext);
  if (!ctx) throw new Error("useLead must be inside LeadProvider");
  return ctx;
}
