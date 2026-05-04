// contactValidator.ts

const GENERIC_EMAIL_PROVIDERS = [
  "gmail.com",
  "hotmail.com",
  "outlook.com",
  "yahoo.com",
  "icloud.com",
  "live.com",
];

const INVALID_EMAIL_DOMAINS = [
  "test.com",
  "example.com",
  "email.com",
  "fake.com",
];

const GENERIC_NAMES = [
  "test",
  "teste",
  "user",
  "admin",
  "cliente",
  "contato",
];

function normalize(str?: string) {
  return (str || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .trim();
}

/**
 * DOMÍNIO MUITO CURTO → suspeito (a.com)
 */
function isLowQualityDomain(domain: string): boolean {
  const name = domain.split(".")[0];
  return name.length <= 2;
}

/**
 * DOMÍNIO ESTRANHO → provável fake
 */
function isWeirdDomain(domain: string): boolean {
  const name = domain.split(".")[0];

  // muito longo
  if (domain.length > 30) return true;

  // sem vogais (zxqwr)
  if (!/[aeiou]/.test(name)) return true;

  // muitos níveis (abc.xyz.qwe)
  if (domain.split(".").length > 3) return true;

  // muitos caracteres repetidos estranhos
  if (/([a-z])\1{3,}/.test(name)) return true;

  return false;
}

/**
 * verifica se nome aparece no email
 */
function containsNameInEmail(name?: string, email?: string): boolean {
  if (!name || !email) return false;

  const parts = normalize(name).split(" ").filter(Boolean);
  const local = normalize(email.split("@")[0]);

  return parts.some((p) => local.includes(p));
}

/**
 * EMAIL VALIDATION
 */
export function validateEmail(email?: string): {
  valid: boolean;
  score: number;
  provider: "corporate" | "generic" | "invalid" | "suspicious";
} {
  if (!email) {
    return { valid: false, score: 0, provider: "invalid" };
  }

  const normalized = email.trim().toLowerCase();

  const basicRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!basicRegex.test(normalized)) {
    return { valid: false, score: 0, provider: "invalid" };
  }

  const domain = normalized.split("@")[1];

  if (INVALID_EMAIL_DOMAINS.includes(domain)) {
    return { valid: false, score: 5, provider: "invalid" };
  }

  if (isLowQualityDomain(domain)) {
    return { valid: true, score: 25, provider: "suspicious" };
  }

  if (isWeirdDomain(domain)) {
    return { valid: true, score: 20, provider: "suspicious" };
  }

  const isGeneric = GENERIC_EMAIL_PROVIDERS.includes(domain);

  if (isGeneric) {
    return { valid: true, score: 70, provider: "generic" };
  }

  return { valid: true, score: 100, provider: "corporate" };
}

/**
 * PHONE VALIDATION (BR)
 */
export function validatePhone(phone?: string): {
  valid: boolean;
  score: number;
  type: "mobile" | "landline" | "invalid";
} {
  if (!phone) {
    return { valid: false, score: 0, type: "invalid" };
  }

  const cleaned = phone.replace(/\D/g, "");

  if (cleaned.length < 10 || cleaned.length > 11) {
    return { valid: false, score: 0, type: "invalid" };
  }

  const repeated = /^(\d)\1+$/.test(cleaned);
  if (repeated) {
    return { valid: false, score: 10, type: "invalid" };
  }

  const isMobile = cleaned.length === 11;

  return {
    valid: true,
    type: isMobile ? "mobile" : "landline",
    score: isMobile ? 100 : 80,
  };
}

/**
 * NAME VALIDATION
 */
export function validateName(name?: string): {
  valid: boolean;
  score: number;
  quality: "good" | "weak" | "invalid";
} {
  if (!name) {
    return { valid: false, score: 0, quality: "invalid" };
  }

  const normalized = normalize(name);

  if (normalized.length < 3) {
    return { valid: false, score: 10, quality: "invalid" };
  }

  if (GENERIC_NAMES.includes(normalized)) {
    return { valid: false, score: 20, quality: "invalid" };
  }

  if (/\d/.test(normalized)) {
    return { valid: false, score: 20, quality: "invalid" };
  }

  const words = normalized.split(" ").filter(Boolean);

  if (words.length === 1) {
    return { valid: true, score: 60, quality: "weak" };
  }

  return { valid: true, score: 100, quality: "good" };
}

/**
 * FULL CONTACT SCORE
 */
export function validateContact(input: {
  name?: string;
  email?: string;
  phone?: string;
}): {
  score: number;
  email: ReturnType<typeof validateEmail>;
  phone: ReturnType<typeof validatePhone>;
  name: ReturnType<typeof validateName>;
} {
  const email = validateEmail(input.email);
  const phone = validatePhone(input.phone);
  const name = validateName(input.name);

  let score =
    email.score * 0.45 +
    phone.score * 0.35 +
    name.score * 0.2;

  /**
   * bônus de coerência
   */
  if (containsNameInEmail(input.name, input.email)) {
    score += 10;
  }

  /**
   * bônus se contato completo
   */
  if (email.valid && phone.valid) {
    score += 5;
  }

  /**
   * penalizações INTELIGENTES (não agressivas)
   */
  if (email.provider === "suspicious") {
    score -= 20;
  }

  if (!email.valid && !phone.valid) {
    score -= 30;
  }

  score = Math.max(0, Math.min(100, score));

  return {
    score: Math.round(score),
    email,
    phone,
    name,
  };
}