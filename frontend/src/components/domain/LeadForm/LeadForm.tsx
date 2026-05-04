import { useState } from "react";
import { Input } from "../../ui";
import { Button } from "../../ui/Button/Button";
import { CNPJInput } from "../CNPJInput/CNPJInput";

interface FormData {
  name: string;
  email: string;
  phone: string;
  cnpj: string;
}
interface Props {
  onSubmit: (data: FormData) => void;
  loading?: boolean;
}

export function LeadForm({ onSubmit, loading }: Props) {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    cnpj: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const set = (field: keyof FormData) => (value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const validate = (): boolean => {
    const e: Partial<FormData> = {};
    if (!form.name.trim()) e.name = "Nome é obrigatório";
    if (!form.email.includes("@")) e.email = "Email inválido";
    if (!form.cnpj || form.cnpj.replace(/\D/g, "").length !== 14)
      e.cnpj = "CNPJ incompleto";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) onSubmit(form);
  };

  return (
    <div className="flex flex-col gap-4 bg-surface-raised border border-surface-border rounded-lg p-6">
      <div>
        <h2 className="text-heading-md text-neutral-100">Consultar Lead</h2>
        <p className="text-sm text-neutral-500 mt-0.5">
          Informe os dados básicos para enriquecer automaticamente
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Nome"
          placeholder="Ex: João Silva"
          value={form.name}
          onChange={(e) => set("name")(e.target.value)}
          error={errors.name}
        />
        <Input
          label="Email"
          type="email"
          placeholder="joao@empresa.com"
          value={form.email}
          onChange={(e) => set("email")(e.target.value)}
          error={errors.email}
        />
        <Input
          label="Telefone"
          placeholder="(11) 99999-9999"
          value={form.phone}
          onChange={(e) => set("phone")(e.target.value)}
        />
        <CNPJInput
          onChange={set("cnpj")}
          onValidCNPJ={(cnpj) => set("cnpj")(cnpj)}
          loading={loading}
        />
      </div>

      <Button
        onClick={handleSubmit}
        loading={loading}
        size="lg"
        className="w-full"
      >
        {loading ? "Consultando..." : "⚡ Enriquecer Lead"}
      </Button>
    </div>
  );
}
