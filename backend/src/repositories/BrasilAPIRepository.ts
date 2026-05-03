export interface ICNPJRepository {
  findByCNPJ(cnpj: string): Promise<any>;
}

export class BrasilAPIRepository implements ICNPJRepository {
  private readonly BASE_URL = "https://brasilapi.com.br/api/cnpj/v1";

  async findByCNPJ(cnpj: string): Promise<any> {
    const clean = cnpj.replace(/\D/g, "");
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    try {
      await new Promise((r) => setTimeout(r, 800));

      const res = await fetch(`${this.BASE_URL}/${clean}`, {
        signal: controller.signal,
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
          Accept: "application/json",
          "Accept-Language": "pt-BR,pt;q=0.9,en;q=0.8",
          Connection: "keep-alive",
        },
      });
      if (res.status === 404)
        throw new NotFoundError("CNPJ não encontrado na Receita Federal");
      if (!res.ok) throw new APIError(`BrasilAPI retornou ${res.status}`);
      return await res.json();
    } catch (err: any) {
      if (err.name === "AbortError")
        throw new APIError("Timeout ao consultar BrasilAPI");
      if (err instanceof NotFoundError || err instanceof APIError) throw err;
      throw new APIError("Falha de rede ao consultar BrasilAPI");
    } finally {
      clearTimeout(timeout);
    }
  }
}

export class NotFoundError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = "NotFoundError";
  }
}
export class APIError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = "APIError";
  }
}
