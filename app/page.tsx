'use client';

import { useState } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import TelaRegistro from './components/TelaRegistro';
import TelaAnalise from './components/TelaAnalise';
import { LotofacilResult } from './types';

export default function Home() {
  const [selectedMenu, setSelectedMenu] = useState<'registro' | 'analise' | null>(null);
  const [resultados, setResultados] = useState<LotofacilResult[]>([]);

  const handleSaveResultado = (resultado: LotofacilResult) => {
    setResultados([...resultados, resultado].sort((a, b) => b.concurso - a.concurso));
  };

  const handleLogoClick = () => {
    setSelectedMenu(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Menu Lateral */}
      <Sidebar onMenuSelect={setSelectedMenu} selectedMenu={selectedMenu} />
      
      {/* Barra Superior */}
      <TopBar onLogoClick={handleLogoClick} />
      
      {/* Área de Conteúdo */}
      <div className="ml-[15%] pt-[15vh] style=padding: 12px;">
        <div className="p-10">
          {selectedMenu === 'registro' ? (
            <TelaRegistro
              resultados={resultados}
              onSave={handleSaveResultado}
            />
          ) : selectedMenu === 'analise' ? (
            <TelaAnalise resultados={resultados} />
          ) : (
            <div className="flex items-center justify-center h-[70vh]">
              <div className="text-center text-gray-500">
                <h2 className="text-2xl font-semibold mb-2">Bem-vindo à Análise Lotofácil</h2>
                <p>Selecione uma opção no menu lateral para começar.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
