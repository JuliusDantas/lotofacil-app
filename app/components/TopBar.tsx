'use client';

import Image from 'next/image';

interface Props {
  onLogoClick: () => void;
}

export default function TopBar({ onLogoClick }: Props) {
  return (
    <div className="fixed top-0 right-0 h-[15vh] bg-[#1B365C] text-white w-[100%] flex items-center justify-between px-6">
      <h1 className="text-2xl font-semibold">Análise de Resultados</h1>
      
      <div 
        onClick={onLogoClick}
        className="flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer h-full w-[30%]"
        title="Voltar para a tela inicial"
      >
        <div className="relative w-full h-[45%]">
          <Image
            src="/lotofacil-logo.svg"
            alt="Lotofácil Logo"
            fill
            style={{ objectFit: 'contain' }}
            priority
            className="brightness-0 invert"
          />
        </div>
      </div>
    </div>
  );
} 