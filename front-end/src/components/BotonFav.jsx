// Este componente es el ícono de corazón que esta en cada tarjeta de las páginas

import React from "react";

const BotonFavorito = ({ esFavorito, onClick }) => {
  return (
    <button
      className={`flex items-center justify-center p-2.5 rounded-xl backdrop-blur-[5px] transition-all duration-[400ms] ease-[cubic-bezier(0.175,0.885,0.32,1.275)] active:scale-90 cursor-[url('/pointer.svg')_16_16,_pointer] border hover:-translate-y-[3px] hover:scale-105 ${
        esFavorito
          ? "bg-[#ff4757]/5 border-[#ff4757]/50"
          : "bg-[#141414]/70 border-white/10 hover:bg-[#1e1e1e]/90 hover:border-white/30"
      }`}
      onClick={onClick}
      aria-label={esFavorito ? "Quitar de favoritos" : "Agregar a favoritos"}
      type="button"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className={`w-[22px] h-[22px] stroke-2 transition-all duration-300 ease-in-out ${
          esFavorito
            ? "fill-[#ff4757] stroke-[#ff4757] drop-shadow-[0_0_8px_rgba(255,71,87,0.8)]"
            : "fill-none stroke-[#888]"
        }`}
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </button>
  );
};

export default BotonFavorito;
