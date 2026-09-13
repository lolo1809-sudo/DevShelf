import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import EstadoVacio from "../components/EstadoVacio";
import TarjetaComponente from "../components/TarjetaComponente";

export default function InicioPages({ datos, filtro, favoritos, toggleFav }) {
  // Función para quitar tildes y pasar a minúsculas
  const normalizar = (texto) => {
    return texto
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  };

  // Mezclamos todos los datos aleatoriamente SOLO cuando 'datos' cambia (usando useMemo)
  const datosMezclados = useMemo(() => {
    if (!datos) return [];
    // Hacemos una copia del array y lo desordenamos
    return [...datos].sort(() => 0.5 - Math.random());
  }, [datos]);

  // Filtramos por el buscador en los datos ya mezclados y tomamos solo los primeros 6 (.slice(0, 6))
  const itemsFiltrados = datosMezclados.filter((item) => normalizar(item.titulo).includes(normalizar(filtro))).slice(0, 6);

  return (
    <>
      <title>Inicio | DevShelf</title>

      {/* ================ CONTENEDOR PRINCIPAL DE LA PÁGINA DE INICIO ================= */}
      <div className="bg-[var(--bg-body--inicio)] w-full flex flex-col items-center pt-12 pb-16 transition-all duration-300 ease-in-out">
        <h1 className="text-[50px] sm:text-[65px] font-bold tracking-tighter mb-[10px] text-center bg-gradient-to-r from-[var(--text-gradient-start)] to-[var(--accent-color)] bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(160,184,0,0.3)] animate-[subirYaparecer_1s_ease-out]">
          DevShelf
        </h1>

        <h2 className="text-[20px] sm:text-[24px] text-[var(--text-secondary)] font-light leading-[1.6] mb-5 text-center animate-[subirYaparecer_1.2s_ease-out]">
          Deja de reinventar la rueda. <br className="hidden sm:block" />
          Encuentra el componente perfecto.
        </h2>

        <p className="text-[15px] sm:text-[18px] md:text-[20px] text-center px-4 max-w-xl text-[var(--text-primary)] opacity-80 font-medium mb-5 sm:mb-7 animate-[subirYaparecer_1.3s_ease-out]">
          Código limpio y listo para usar. <br />
          {/* Cambiamos el color de este span a secondary para que no choque con la caja de abajo */}
          <span className="text-[var(--text-secondary)] italic">De Inputs hasta Páginas Webs Completas y Funcionales.</span>
        </p>

        {/* Agregamos max-w-[90%], text-[14px] para mobile y leading-relaxed para mejorar el espacio */}
        <h3 className="font-mono text-[14px] sm:text-[16px] md:text-[18px] text-[var(--accent-color)] bg-[rgba(160,184,0,0.15)] px-5 py-2.5 rounded-[20px] border border-[var(--accent-color)] inline-block max-w-[90%] leading-relaxed mb-8 animate-[subirYaparecer_1.4s_ease-out] shadow-[0_0_10px_rgba(160,184,0,0.2)]">
          &lt; HTML / CSS / TS / REACT / NEXT.JS / NODE / EXPRESS /&gt;
        </h3>

        {/* ================ SECCIÓN DE TARJETAS DE MUESTRA =================== */}

        {/* Contenedor Grid Principal */}
        <div className="w-[95%] max-w-[1300px] mx-auto pt-[20px] pb-[80px]">
          {/* Grilla de tarjetas */}
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] justify-center gap-[40px] cursor-[url('/cursor.svg')_16_16,_auto] [&_input]:cursor-[url('/pointer.svg')_16_16,_text]">
            {itemsFiltrados.map((item) => (
              <TarjetaComponente key={item.id} item={item} favoritos={favoritos} toggleFav={toggleFav} />
            ))}

            {itemsFiltrados.length === 0 && <EstadoVacio mensaje="No se encontraron componentes con ese nombre." />}
          </div>
        </div>

        {/* ============== BOTÓN DE EXPLORAR TODOS LOS ELEMENTOS ================== */}
        <div className="mb-12">
          <Link
            to="/inputs"
            className="group relative inline-flex items-center justify-center py-3.5 pl-8 pr-10 bg-transparent border-2 border-[var(--border-color,#333)] text-[var(--text-primary,#fff)] font-semibold text-[16px] rounded-[50px] overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-[var(--accent-color)] hover:text-[var(--accent-color)] hover:bg-[rgba(160,184,0,0.1)] hover:-translate-y-[3px] hover:shadow-[0_0_20px_rgba(160,184,0,0.3)]"
          >
            <span className="transition-transform duration-400 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-x-2">Explorar la estantería</span>

            <span className="absolute right-5 flex items-center opacity-0 -translate-x-4 transition-all duration-400 ease-[cubic-bezier(0.23,1,0.32,1)] text-[var(--accent-color)] group-hover:opacity-100 group-hover:translate-x-0 drop-shadow-[0_0_2px_var(--accent-color)]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </>
  );
}
