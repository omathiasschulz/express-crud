interface FazendasPorEstado {
  sigla_uf: string;
  quantidadeFazendas: number;
}

interface FazendasPorCultura {
  cultura: string;
  quantidadeFazendas: number;
}

/**
 * Interface ProdutorDashboard
 */
export interface ProdutorDashboard {
  quantidadeFazendas: number;
  areaTotalFazendas: number;
  fazendasPorEstado: FazendasPorEstado[];
  fazendasPorCultura: FazendasPorCultura[];
  usoSolo: {
    totalAgricultavel: number;
    totalVegetacao: number;
  };
}
