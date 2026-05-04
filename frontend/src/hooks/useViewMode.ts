import { useState, useEffect } from "react";

export type ViewMode = "simple" | "analytic" | "developer";

export function useViewMode(): [ViewMode, (m: ViewMode) => void] {
  const [mode, setMode] = useState<ViewMode>(() => {
    if (
      typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).get("dev") === "true"
    )
      return "developer";
    return "simple";
  });
  return [mode, setMode];
}
