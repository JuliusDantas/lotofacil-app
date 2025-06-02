'use client';

import { useState } from 'react';
import { Analise as AnaliseType, LotofacilResult, ResultadoAnalise } from '../types';

interface Props {
  resultados: LotofacilResult[];
  onAnalisar: (params: AnaliseType) => ResultadoAnalise[];
}

export default function Analise({ resultados, onAnalisar }: Props) {
  const [tipo, setTipo] = useState<'mais' | 'menos'>('mais');
  const [periodo, setPeriodo] = useState<'numeros' | 'combinacoes'>('numeros');
  const [quantidade, setQuantidade] = useState(12);
  const [resultadosAnalise, setResultadosAnalise] = useState<ResultadoAnalise[]>([]);

  const handleAnalise = () => {
    const analise = onAnalisar({
      tipo,
      periodo,
      quantidade
    });
    setResultadosAnalise(analise);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Análise de Resultados</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Tipo de Análise</label>
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
          <label className="block text-sm font-medium text-gray-700">Período</label>
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
          <label className="block text-sm font-medium text-gray-700">Quantidade</label>
          <input
            type="number"
            value={quantidade}
            onChange={(e) => setQuantidade(parseInt(e.target.value))}
            min={1}
            max={15}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <button
          onClick={handleAnalise}
          disabled={resultados.length === 0}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:bg-gray-400"
        >
          Analisar
        </button>

        {resultadosAnalise.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Resultados da Análise</h3>
            <div className="space-y-2">
              {resultadosAnalise.map((resultado, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-50 rounded-md flex justify-between items-center"
                >
                  <div className="flex gap-2">
                    {resultado.numeros.map((numero) => (
                      <span
                        key={numero}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-800"
                      >
                        {numero}
                      </span>
                    ))}
                  </div>
                  <span className="font-medium">
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