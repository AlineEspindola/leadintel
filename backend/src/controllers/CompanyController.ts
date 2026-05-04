import { Request, Response } from "express";
import { ICompanyService } from "../services/CompanyService";
import { validateCNPJ } from "../../../shared/types/domain";
import { NotFoundError, APIError } from "../repositories/BrasilAPIRepository";

export class CompanyController {
  constructor(private service: ICompanyService) {}

  enrich = async (req: Request, res: Response): Promise<void> => {
    const { name, email, phone, cnpj } = req.body;

    if (!cnpj) {
      res.status(400).json({ error: "CNPJ é obrigatório" });
      return;
    }
    if (!validateCNPJ(cnpj)) {
      res.status(400).json({ error: "CNPJ inválido", code: "INVALID_CNPJ" });
      return;
    }

    try {
      const result = await this.service.enrich({
        name: name || "",
        email: email || "",
        phone: phone || "",
        cnpj,
      });
      res.json(result);
    } catch (err: any) {
      if (err instanceof NotFoundError) {
        res.status(404).json({ error: err.message, code: "NOT_FOUND" });
        return;
      }
      if (err instanceof APIError) {
        res.status(502).json({ error: err.message, code: "API_ERROR" });
        return;
      }
      res.status(500).json({ error: "Erro interno", code: "INTERNAL_ERROR" });
    }
  };
}
