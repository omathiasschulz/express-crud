/**
 * Converte números em string para number ao montar uma Entity
 */
export class DecimalColumnTransformer {
  to(data: number): number {
    return data;
  }
  from(data: string): number {
    return parseFloat(data);
  }
}
