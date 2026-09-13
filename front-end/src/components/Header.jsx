/* Header específico para el Catálogo de componentes, con Menú del Sidebar, buscador y flecha para volver al inicio */

import { useState, useEffect } from "react";
import FlechaHome from "./FlechaHome";

export default function Header({ onSearch, estado, setEstado }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const abrirSidebar = () => setEstado(!estado);
  const valorInput = (e) => onSearch(e.target.value);

  if (!mounted) return null;

  return (
    <header className="fixed top-0 left-0 z-[1000] w-full h-[80px] flex items-center justify-evenly bg-[var(--glass-bg)] border-b border-[var(--glass-border)] backdrop-blur-[5px] transition-colors duration-300 ease-in-out">
      {/* Flechita para volver al inicio */}
      <FlechaHome />

      {/* Botón Menú / Sidebar */}
      <div
        className="bg-[var(--glass-bg)] backdrop-blur-md border border-[var(--glass-border)] rounded-xl cursor-[url('/pointer.svg')_16_16,_pointer] py-3 px-4 max-sm:py-1.5 max-sm:px-2.5 transition-all duration-300 ease-in-out hover:border-[var(--accent-color)] hover:bg-[var(--bg-card)]"
        onClick={abrirSidebar}
      >
        <i
          className={`fa-solid ${estado ? "fa-xmark text-[#ff4757] rotate-90" : "fa-bars text-[var(--text-primary)]"} text-[18px] max-sm:text-[20px] transition-all duration-[400ms] ease-[cubic-bezier(0.175,0.885,0.32,1.275)] hover:text-[#a0b800] hover:scale-110`}
        ></i>
      </div>

      {/* Buscador */}

      <div className="group flex items-center bg-[var(--input-bg)] border border-[var(--border-color)] rounded-full py-2.5 px-5 w-1/2 max-sm:w-[40%] max-sm:py-1 max-sm:px-2.5 transition-all duration-300 ease-in-out focus-within:border-[#f1c40f] focus-within:shadow-[0_0_15px_rgba(241,196,15,0.2)]">
        <span className="flex items-center text-[#666] mr-2.5 transition-colors duration-300 ease-in-out group-focus-within:text-[#f1c40f]">
          <i className="fa-solid fa-magnifying-glass max-sm:text-[12px]"></i>
        </span>
        <input
          onChange={valorInput}
          type="text"
          className="border-none bg-transparent text-[var(--text-primary)] w-full text-[16px] max-sm:text-[12px] outline-none placeholder-[#666]"
          placeholder="Buscar Componente..."
        />
      </div>
    </header>
  );
}
