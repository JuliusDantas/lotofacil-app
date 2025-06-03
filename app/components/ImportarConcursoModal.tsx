'use client';

import { useState, useEffect } from 'react';
import { fetchLotofacilResult } from '../services/lotofacilService';
import { LotofacilResult } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onImport: (resultado: LotofacilResult) => void;
}

export default function ImportarConcursoModal({ isOpen, onClose, onImport }: Props) {
  const [concurso, setConcurso] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Previne o scroll do body quando o modal está aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleImport = async () => {
    if (!concurso) {
      setError('Por favor, informe o número do concurso');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const resultado = await fetchLotofacilResult(parseInt(concurso));
      onImport(resultado);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao importar concurso');
    } finally {
      setIsLoading(false);
    }
  };

  const handleConcursoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Previne qualquer caractere que não seja dígito
    const value = e.target.value.replace(/[^0-9]/g, '');
    
    if (value !== '') {
      const numValue = parseInt(value);
      if (numValue > 0) {
        setConcurso(value);
      }
    } else {
      setConcurso('');
    }
  };

  // Previne a propagação do clique para o overlay
  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4" 
      style={{ zIndex: 1000 }}
    >
      <div 
        className="bg-white rounded-lg w-full max-w-md"
        onClick={handleModalClick}
      >
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">Importar Concurso</h2>
        </div>

        <div className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Número do Concurso
            </label>
            <input
              type="text"
              pattern="[0-9]*"
              inputMode="numeric"
              value={concurso}
              onChange={handleConcursoChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              placeholder="Digite o número do concurso"
              disabled={isLoading}
              onKeyPress={(e) => {
                // Previne a digitação de caracteres não numéricos
                if (!/[0-9]/.test(e.key) && e.key !== 'Enter') {
                  e.preventDefault();
                }
                if (e.key === 'Enter') {
                  handleImport();
                }
              }}
            />
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}

          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              disabled={isLoading}
            >
              Cancelar
            </button>
            <button
              onClick={handleImport}
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:bg-indigo-400 transition-colors"
            >
              {isLoading ? 'Importando...' : 'Importar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 