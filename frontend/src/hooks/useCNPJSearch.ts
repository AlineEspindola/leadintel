import { useState, useCallback } from "react";
import { enrichCompany } from "../api/companyApi";
import { CompanyRequestDTO, CompanyResponseDTO } from "../types";

export type SearchState =
  | "idle"
  | "loading"
  | "success"
  | "error_invalid"
  | "error_api"
  | "error_not_found"
  | "error_inactive";

export function useCNPJSearch() {
  const [state, setState] = useState<SearchState>("idle");
  const [result, setResult] = useState<CompanyResponseDTO | null>(null);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (dto: CompanyRequestDTO) => {
    setState("loading");
    setError(null);
    try {
      const data = await enrichCompany(dto);
      setResult(data);
      setState(data.isActive ? "success" : "error_inactive");
    } catch (err: any) {
      setResult(null);
      if (err.code === "INVALID_CNPJ") {
        setState("error_invalid");
        setError(err.error);
      } else if (err.code === "NOT_FOUND" || err.status === 404) {
        setState("error_not_found");
        setError(err.error);
      } else {
        setState("error_api");
        setError(err.error || "Falha ao consultar API");
      }
    }
  }, []);

  const reset = useCallback(() => {
    setState("idle");
    setResult(null);
    setError(null);
  }, []);

  return { state, result, error, search, reset };
}
