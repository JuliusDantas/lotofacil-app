import { Analise, LotofacilResult, ResultadoAnalise } from '../types';

export function analisarResultados(
  resultados: LotofacilResult[],
  params: Analise
): ResultadoAnalise[] {
  // Filtra resultados dos últimos 12 meses
  const hoje = new Date();
  const dozeAnosAtras = new Date(hoje.setMonth(hoje.getMonth() - 12));
  
  const resultadosFiltrados = resultados.filter(resultado => {
    const dataResultado = new Date(resultado.data);
    return dataResultado >= dozeAnosAtras;
  });

  if (params.periodo === 'numeros') {
    return analisarNumeros(resultadosFiltrados, params);
  } else {
    return analisarCombinacoes(resultadosFiltrados, params);
  }
}

function analisarNumeros(
  resultados: LotofacilResult[],
  params: Analise
): ResultadoAnalise[] {
  const frequencia: { [key: number]: number } = {};
  
  // Conta a frequência de cada número
  resultados.forEach(resultado => {
    resultado.numeros.forEach(numero => {
      frequencia[numero] = (frequencia[numero] || 0) + 1;
    });
  });

  // Converte para array e ordena
  const numerosOrdenados = Object.entries(frequencia)
    .map(([numero, freq]) => ({
      numeros: [parseInt(numero)],
      frequencia: freq
    }))
    .sort((a, b) => 
      params.tipo === 'mais' 
        ? b.frequencia - a.frequencia 
        : a.frequencia - b.frequencia
    )
    .slice(0, params.quantidade);

  return numerosOrdenados;
}

function analisarCombinacoes(
  resultados: LotofacilResult[],
  params: Analise
): ResultadoAnalise[] {
  const frequenciaCombinacoes: { [key: string]: number } = {};
  
  // Analisa todas as combinações possíveis de 3 números
  resultados.forEach(resultado => {
    for (let i = 0; i < resultado.numeros.length - 2; i++) {
      for (let j = i + 1; j < resultado.numeros.length - 1; j++) {
        for (let k = j + 1; k < resultado.numeros.length; k++) {
          const combinacao = [
            resultado.numeros[i],
            resultado.numeros[j],
            resultado.numeros[k]
          ].sort((a, b) => a - b);
          const key = combinacao.join(',');
          frequenciaCombinacoes[key] = (frequenciaCombinacoes[key] || 0) + 1;
        }
      }
    }
  });

  // Converte para array e ordena
  const combinacoesOrdenadas = Object.entries(frequenciaCombinacoes)
    .map(([combinacao, freq]) => ({
      numeros: combinacao.split(',').map(n => parseInt(n)),
      frequencia: freq
    }))
    .sort((a, b) => 
      params.tipo === 'mais' 
        ? b.frequencia - a.frequencia 
        : a.frequencia - b.frequencia
    )
    .slice(0, params.quantidade);

  return combinacoesOrdenadas;
} 