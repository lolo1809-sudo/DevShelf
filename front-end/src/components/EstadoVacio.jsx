import React from "react";

export default function EstadoVacio({ mensaje = "No se encontraron resultados para tu búsqueda." }) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-16 px-6 my-8 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[20px] shadow-[var(--shadow-card)] text-center max-w-md mx-auto w-full">
      {/* Icono decorativo con el color acento */}
      <div className="w-16 h-16 mb-5 rounded-full bg-[var(--input-bg)] border border-[var(--border-color)] flex items-center justify-center text-[var(--accent-color)] text-2xl shadow-inner">
        <i className="fa-solid fa-magnifying-glass"></i>
      </div>

      {/* Título */}
      <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">Sin resultados</h3>

      {/* Mensaje descriptivo */}
      <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{mensaje} Intenta con otro término o revisa la ortografía.</p>
    </div>
  );
}
