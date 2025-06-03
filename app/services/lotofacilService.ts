import { LotofacilResult } from '../types';

interface ApiResponse {
  numero: number;
  dataApuracao: string;
  listaDezenas: string[];
  listaRateioPremio: {
    faixa: number;
    numeroDeGanhadores: number;
    valorPremio: number;
  }[];
}

// Função auxiliar para formatar a data
function formatarData(dataStr: string): string {
  const [dia, mes, ano] = dataStr.split('/');
  return `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
}

export async function fetchLotofacilResult(concurso: number): Promise<LotofacilResult> {
  try {
    // Garantir que o número do concurso seja um número válido
    if (!concurso || isNaN(concurso)) {
      throw new Error('Número do concurso inválido');
    }

    // Converter o número do concurso para string na URL
    const concursoStr = concurso.toString().padStart(4, '0');
    const response = await fetch(`https://api.guidi.dev.br/loteria/lotofacil/${concursoStr}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Concurso não encontrado');
      }
      throw new Error('Falha ao buscar resultado');
    }

    const data: ApiResponse = await response.json();

    // Validar se a resposta contém os dados necessários
    if (!data || !data.listaDezenas || !Array.isArray(data.listaDezenas) || !data.listaRateioPremio) {
      throw new Error('Dados do concurso inválidos ou incompletos');
    }

    return {
      concurso: data.numero,
      data: formatarData(data.dataApuracao),
      numeros: data.listaDezenas.map((dezena: string) => parseInt(dezena, 10)),
      rateioPremio: data.listaRateioPremio.map(premio => ({
        faixa: premio.faixa,
        numeroDeGanhadores: premio.numeroDeGanhadores,
        valorPremio: premio.valorPremio
      }))
    };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    throw new Error('Erro ao buscar resultado do concurso: ' + errorMessage);
  }
}

export async function fetchLatestLotofacilResult(): Promise<LotofacilResult> {
  try {
    const response = await fetch('https://api.guidi.dev.br/loteria/lotofacil/ultimo', {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('Falha ao buscar último resultado');
    }

    const data: ApiResponse = await response.json();

    // Validar se a resposta contém os dados necessários
    if (!data || !data.listaDezenas || !Array.isArray(data.listaDezenas) || !data.listaRateioPremio) {
      throw new Error('Dados do último concurso inválidos ou incompletos');
    }

    return {
      concurso: data.numero,
      data: formatarData(data.dataApuracao),
      numeros: data.listaDezenas.map((dezena: string) => parseInt(dezena, 10)),
      rateioPremio: data.listaRateioPremio.map(premio => ({
        faixa: premio.faixa,
        numeroDeGanhadores: premio.numeroDeGanhadores,
        valorPremio: premio.valorPremio
      }))
    };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    throw new Error('Erro ao buscar último resultado: ' + errorMessage);
  }
} 