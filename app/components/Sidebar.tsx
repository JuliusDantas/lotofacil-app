'use client';

import { useState } from 'react';

interface Props {
  onMenuSelect: (menu: 'registro' | 'analise') => void;
  selectedMenu: 'registro' | 'analise' | null;
}

export default function Sidebar({ onMenuSelect, selectedMenu }: Props) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div 
      className={`h-screen fixed left-0 top-0 w-[15%] bg-[#1B365C] text-white`}
    >
      <div className="pt-[15vh] px-4">
        <button
          onClick={() => onMenuSelect('registro')}
          className={`w-full text-left mb-4 p-4 rounded-lg transition-colors ${
            selectedMenu === 'registro'
              ? 'bg-[#2C4C7C]'
              : 'hover:bg-[#2C4C7C]/70'
          } flex items-center`}
        >
          <svg
            className="w-6 h-6"
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
          <span className="ml-3">Registrar Resultado</span>
        </button>

        <button
          onClick={() => onMenuSelect('analise')}
          className={`w-full text-left p-4 rounded-lg transition-colors ${
            selectedMenu === 'analise'
              ? 'bg-[#2C4C7C]'
              : 'hover:bg-[#2C4C7C]/70'
          } flex items-center`}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          <span className="ml-3">Análise de Resultados</span>
        </button>
      </div>
    </div>
  );
} 