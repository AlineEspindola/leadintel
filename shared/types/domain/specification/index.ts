import { Company } from "../company";

// ─── Specification Pattern ──────────────────────────────────────────────────
export interface Specification<T> {
  isSatisfiedBy(candidate: T): boolean;
  and(other: Specification<T>): Specification<T>;
  or(other: Specification<T>): Specification<T>;
  not(): Specification<T>;
}

export abstract class AbstractSpecification<T>
  implements Specification<T>
{
  abstract isSatisfiedBy(candidate: T): boolean;

  and(other: Specification<T>): Specification<T> {
    return new AndSpecification(this, other);
  }

  or(other: Specification<T>): Specification<T> {
    return new OrSpecification(this, other);
  }

  not(): Specification<T> {
    return new NotSpecification(this);
  }
}

class AndSpecification<T> extends AbstractSpecification<T> {
  constructor(
    private a: Specification<T>,
    private b: Specification<T>,
  ) {
    super();
  }
  isSatisfiedBy(c: T) {
    return this.a.isSatisfiedBy(c) && this.b.isSatisfiedBy(c);
  }
}
class OrSpecification<T> extends AbstractSpecification<T> {
  constructor(
    private a: Specification<T>,
    private b: Specification<T>,
  ) {
    super();
  }
  isSatisfiedBy(c: T) {
    return this.a.isSatisfiedBy(c) || this.b.isSatisfiedBy(c);
  }
}
class NotSpecification<T> extends AbstractSpecification<T> {
  constructor(private inner: Specification<T>) {
    super();
  }
  isSatisfiedBy(c: T) {
    return !this.inner.isSatisfiedBy(c);
  }
}

export class ActiveCompanySpecification extends AbstractSpecification<Company> {
  isSatisfiedBy(c: Company) {
    return c.getStatus().isActive();
  }
}
export class NameSpecification extends AbstractSpecification<Company> {
  constructor(private name: string) {
    super();
  }
  isSatisfiedBy(c: Company) {
    return c
      .getLegalName()
      .getValue()
      .toLowerCase()
      .includes(this.name.toLowerCase());
  }
}
export class CNPJSpecification extends AbstractSpecification<Company> {
  constructor(private cnpj: string) {
    super();
  }
  isSatisfiedBy(c: Company) {
    return c.getCNPJ().getValue().includes(this.cnpj);
  }
}
export class StateSpecification extends AbstractSpecification<Company> {
  constructor(private uf: string) {
    super();
  }
  isSatisfiedBy(c: Company) {
    return c.getState().getValue() === this.uf;
  }
}
export class SizeSpecification extends AbstractSpecification<Company> {
  constructor(private keyword: string) {
    super();
  }
  isSatisfiedBy(c: Company) {
    return c
      .getSize()
      .getValue()
      .toLowerCase()
      .includes(this.keyword.toLowerCase());
  }
}
