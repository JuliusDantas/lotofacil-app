export interface LotofacilResult {
  concurso: number;
  data: string;
  numeros: number[];
  rateioPremio?: {
    faixa: number;
    numeroDeGanhadores: number;
    valorPremio: number;
  }[];
}

export interface Analise {
  tipo: 'mais' | 'menos';
  periodo: 'numeros' | 'combinacoes';
  quantidade: number;
}

export interface ResultadoAnalise {
  numeros: number[];
  frequencia: number;
} 