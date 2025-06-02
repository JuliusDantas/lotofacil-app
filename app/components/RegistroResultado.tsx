'use client';

import { useState } from 'react';
import { LotofacilResult } from '../types';

interface Props {
  onSave: (resultado: LotofacilResult) => void;
}

export default function RegistroResultado({ onSave }: Props) {
  const [concurso, setConcurso] = useState('');
  const [data, setData] = useState('');
  const [numeros, setNumeros] = useState<number[]>([]);

  const handleNumeroClick = (numero: number) => {
    if (numeros.includes(numero)) {
      setNumeros(numeros.filter(n => n !== numero));
    } else if (numeros.length < 15) {
      setNumeros([...numeros, numero].sort((a, b) => a - b));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (numeros.length === 15 && concurso && data) {
      onSave({
        concurso: parseInt(concurso),
        data,
        numeros
      });
      setConcurso('');
      setData('');
      setNumeros([]);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Registrar Resultado</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Concurso</label>
            <input
              type="number"
              value={concurso}
              onChange={(e) => setConcurso(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Data do Sorteio</label>
            <input
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Números Sorteados ({numeros.length} de 15 selecionados)
          </label>
          <div className="grid grid-cols-5 gap-2">
            {Array.from({ length: 25 }, (_, i) => i + 1).map((numero) => (
              <button
                key={numero}
                type="button"
                onClick={() => handleNumeroClick(numero)}
                className={`p-3 text-center rounded-md transition-colors ${
                  numeros.includes(numero)
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                    : 'bg-gray-100 hover:bg-gray-200'
                } ${
                  numeros.length === 15 && !numeros.includes(numero)
                    ? 'opacity-50 cursor-not-allowed'
                    : ''
                }`}
                disabled={numeros.length === 15 && !numeros.includes(numero)}
              >
                {numero}
              </button>
            ))}
          </div>
        </div>

        {numeros.length > 0 && (
          <div className="p-4 bg-gray-50 rounded-md">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Números Selecionados:
            </label>
            <div className="text-lg font-medium text-gray-900">
              {numeros.join(' - ')}
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={numeros.length !== 15 || !concurso || !data}
          className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {numeros.length === 15 ? 'Salvar Resultado' : `Selecione ${15 - numeros.length} números`}
        </button>
      </form>
    </div>
  );
} 