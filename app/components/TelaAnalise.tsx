'use client';

import { useState } from 'react';
import { Analise as AnaliseType, LotofacilResult, ResultadoAnalise } from '../types';
import { analisarResultados } from '../services/analiseService';

interface Props {
  resultados: LotofacilResult[];
}

export default function TelaAnalise({ resultados }: Props) {
  const [tipo, setTipo] = useState<'mais' | 'menos'>('mais');
  const [periodo, setPeriodo] = useState<'numeros' | 'combinacoes'>('numeros');
  const [quantidade, setQuantidade] = useState(12);
  const [resultadosAnalise, setResultadosAnalise] = useState<ResultadoAnalise[]>([]);

  const handleAnalise = () => {
    const analise = analisarResultados(resultados, {
      tipo,
      periodo,
      quantidade
    });
    setResultadosAnalise(analise);
  };

  return (
    <div className="space-y-6" style={{ padding: '10px' }}>
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-6">Configurar Análise</h2>
          
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Análise</label>
              <select
                value={tipo}
                onChange={(e) => setTipo(e.target.value as 'mais' | 'menos')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="mais">Números que mais saíram</option>
                <option value="menos">Números que menos saíram</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Agrupamento Análise</label>
              <select
                value={periodo}
                onChange={(e) => setPeriodo(e.target.value as 'numeros' | 'combinacoes')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="numeros">Números individuais</option>
                <option value="combinacoes">Combinações</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantidade de Resultados
              </label>
              <input
                type="number"
                value={quantidade}
                onChange={(e) => setQuantidade(parseInt(e.target.value))}
                min={1}
                max={15}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="flex justify-center" style={{ margin: '10px 0' }}>
            <button
              onClick={handleAnalise}
              disabled={resultados.length === 0}
              className="px-8 py-3 bg-[#1B365C] text-white rounded-lg hover:bg-[#2C4C7C] disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-semibold"
              style={{ color: 'white' }}
            >
              Analisar Resultados
            </button>
          </div>
        </div>

        {resultadosAnalise.length > 0 && (
          <div className="p-6 max-h-[calc(85vh-24rem)] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Resultados da Análise</h3>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              {resultadosAnalise.map((resultado, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-50 rounded-lg flex justify-between items-center"
                >
                  <div className="flex gap-2 flex-wrap">
                    {resultado.numeros.map((numero) => (
                      <span
                        key={numero}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-800 font-medium"
                      >
                        {numero}
                      </span>
                    ))}
                  </div>
                  <span className="font-medium text-gray-700 ml-4">
                    Frequência: {resultado.frequencia}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 