'use client';

import { useState } from 'react';
import { LotofacilResult } from '../types';
import RegistroResultado from './RegistroResultado';
import ImportarConcursoModal from './ImportarConcursoModal';

interface Props {
  resultados: LotofacilResult[];
  onSave: (resultado: LotofacilResult) => void;
}

export default function TelaRegistro({ resultados, onSave }: Props) {
  const [showModal, setShowModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [filtroInicio, setFiltroInicio] = useState('');
  const [filtroFim, setFiltroFim] = useState('');

  const resultadosFiltrados = resultados.filter(resultado => {
    if (!filtroInicio && !filtroFim) return true;
    
    const data = new Date(resultado.data);
    const inicio = filtroInicio ? new Date(filtroInicio) : null;
    const fim = filtroFim ? new Date(filtroFim) : null;

    if (inicio && fim) {
      return data >= inicio && data <= fim;
    } else if (inicio) {
      return data >= inicio;
    } else if (fim) {
      return data <= fim;
    }
    return true;
  });

  return (
    <div className="space-y-6" style={{ padding: '10px' }}>
      <div className="p-4 border-b border-gray-200 flex flex-wrap gap-4 items-center">
        <div className="flex-1 min-w-[300px] flex gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Data Início</label>
            <input
              type="date"
              value={filtroInicio}
              onChange={(e) => setFiltroInicio(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Data Fim</label>
            <input
              type="date"
              value={filtroFim}
              onChange={(e) => setFiltroFim(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowImportModal(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={showImportModal}
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
            Importar Concurso
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={showImportModal}
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Incluir Concurso
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Concurso
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Dt. Sorteio
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Números Sorteados
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rateio Prêmio
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {resultadosFiltrados.map((resultado) => (
              <tr key={resultado.concurso}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {resultado.concurso}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(resultado.data).toLocaleDateString('pt-BR')}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {resultado.numeros.join(' - ')}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {resultado.rateioPremio?.map((rateio, index) => (
                    <div key={index}>
                      {rateio.faixa} pontos: {rateio.numeroDeGanhadores} ganhadores - 
                      R$ {rateio.valorPremio.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4" style={{ zIndex: 1000 }}>
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold">Novo Resultado</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4">
              <RegistroResultado
                onSave={(resultado) => {
                  onSave(resultado);
                  setShowModal(false);
                }}
                isImportModalOpen={showImportModal}
              />
            </div>
          </div>
        </div>
      )}

      <ImportarConcursoModal
        isOpen={showImportModal}
        onClose={() => setShowImportModal(false)}
        onImport={onSave}
      />
    </div>
  );
} 