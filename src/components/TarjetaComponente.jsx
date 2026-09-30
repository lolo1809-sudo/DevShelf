import React from "react";
import { Link } from "react-router-dom";
import BotonFavorito from "./BotonFav";
import BotonDescargar from "./BotonDescargar";
import { Revelar } from "./Revelar";

export default function TarjetaComponente({ item, favoritos, toggleFav, usuario }) {
  const nombreCarpeta = item.id;
  const nombreCategoria = item.categoria;
  const esFavorito = favoritos ? favoritos.includes(item.id) : false;

  // Si item.codigo_html está vacío, nulo o undefined, mostramos la imagen
  const tieneCodigo = item.codigo_html && item.codigo_html.trim() !== "";

  // Lógica para bloquear: es premium Y el usuario no tiene suscripción activa
  const esContenidoBloqueado = item.es_premium && (!usuario || !usuario.esta_suscripto);

  return (
    <Revelar key={item.id}>
      <article
        data-id={item.id}
        className="group bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[20px] p-[40px_20px] h-auto shadow-[var(--shadow-card)] relative overflow-visible flex flex-col items-center justify-between gap-[15px] transition-all duration-300 ease-in-out hover:-translate-y-[5px] hover:border-[#a0b800] hover:shadow-[0_10px_40px_rgba(160,184,0,0.1)] cursor-[url('/pointer.svg')_16_16,_pointer] animate-[subirYaparecer_0.5s_ease-out]"
      >
        {/* 1. BOTÓN FAVORITO  */}
        <div className="absolute top-[15px] right-[15px] z-10">
          <BotonFavorito esFavorito={esFavorito} onClick={() => toggleFav && toggleFav(item.id)} aria-label={`Añadir ${item.titulo} a favoritos`} />
        </div>

        {/* 2. BOTÓN DE DESCARGA Y CONTADOR */}
        <div className="absolute top-[15px] left-[15px] z-10 flex items-center gap-2">
          {!esContenidoBloqueado ? (
            <BotonDescargar categoria={nombreCategoria} nombreCarpeta={nombreCarpeta} idComponente={item.id} />
          ) : (
            <span
              className="p-2 rounded-full bg-[var(--input-bg)] text-[var(--accent-color)] border border-[var(--border-color)] flex items-center justify-center shadow-sm"
              title="Descarga bloqueada"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0110 0v4"></path>
              </svg>
            </span>
          )}
          <span
            className="text-xs font-medium px-2.5 py-1 rounded-full bg-[var(--input-bg)] text-[var(--text-secondary)] border border-[var(--border-color)] flex items-center gap-1 shadow-sm"
            title="Cantidad de descargas"
          >
            {item.cant_descargas ?? 0} descargas
          </span>
        </div>

        {/* CONTENEDOR CENTRAL */}
        <div className="w-full flex flex-col items-center justify-center gap-[25px] py-[10px] cursor-[url('/pointer.svg')_16_16,_pointer]">
          {/* 3. TÍTULO */}
          <h2 className="text-[30px] font-semibold text-center mt-2 mb-[5px] bg-gradient-to-r from-[var(--text-gradient-start)] to-[var(--accent-color)] bg-clip-text text-transparent">
            {item.titulo}
          </h2>

          {/* 4. VISTA PREVIA  */}
          <div className="w-full h-[190px] flex items-center justify-center bg-black/40 rounded-[14px] overflow-hidden relative border border-[var(--border-color)] p-0">
            {tieneCodigo ? (
              <iframe
                srcDoc={`
                  <!DOCTYPE html>
                  <html>
                    <head>
                      <style>
                        html, body {
                          margin: 0;
                          padding: 0;
                          overflow: hidden !important;
                        }
                      </style>
                    </head>
                    <body>
                      ${item.codigo_html}
                    </body>
                  </html>
                `}
                title={`Vista previa de ${item.titulo}`}
                className="w-full h-full border-none bg-transparent"
                sandbox="allow-scripts allow-same-origin"
                loading="lazy"
              />
            ) : (
              <img src={`${item.img_url}`} alt={`Vista previa del componente ${item.titulo}`} loading="lazy" className="w-full h-full object-cover" />
            )}
          </div>

          {/* 5. BLOQUEO PREMIUM PARA "VER DEMO" Y "VER REPOSITORIO"  */}
          {esContenidoBloqueado ? (
            <div className="w-full flex flex-col items-center gap-2 pt-2">
              <Link
                to={usuario ? "/checkout" : "/login"}
                className="w-full max-w-[260px] py-[10px] px-[20px] bg-[var(--accent-color)] text-black font-bold text-[15px] rounded-[50px] flex items-center justify-center gap-2 hover:bg-[#b5d100] hover:shadow-[0_0_20px_rgba(160,184,0,0.4)] transition-all cursor-[url('/pointer.svg')_16_16,_pointer]"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0110 0v4"></path>
                </svg>
                {usuario ? "Desbloquear Pro" : "Acceder con Pro"}
              </Link>
              <span className="text-[11px] text-[var(--text-secondary)] font-medium">Requiere suscripción activa</span>
            </div>
          ) : (
            <>
              {/* 6. LINK DEMO */}
              <div>
                <a
                  href={`${item.demo_url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="no-underline text-[16px] font-semibold text-white bg-[#d32f2f] py-[10px] px-[24px] rounded-[50px] transition-all duration-300 ease-in-out hover:bg-[#ff0000] hover:shadow-[4px_4px_20px_rgba(255,0,0,0.5)] hover:-translate-y-[2px] cursor-[url('/pointer.svg')_16_16,_pointer] flex items-center justify-center gap-2"
                >
                  <i aria-hidden="true" className="fa-solid fa-gamepad text-white cursor-[url('/pointer.svg')_16_16,_pointer]"></i>
                  Ver Demo
                </a>
              </div>

              {/* 7. LINK REPOSITORIO */}
              <a
                href={`${item.git_hub_url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-transparent text-[#a0b800] py-[10px] px-[25px] rounded-[50px] border border-[#a0b800] text-[16px] font-semibold tracking-[1px] transition-all duration-300 ease-in-out w-fit h-fit flex items-center justify-center gap-[8px] hover:bg-[#a0b800] hover:text-black hover:shadow-[0_0_15px_rgba(160,184,0,0.4)] cursor-[url('/pointer.svg')_16_16,_pointer]"
              >
                <i aria-hidden="true" className="fa-solid fa-code cursor-[url('/pointer.svg')_16_16,_pointer]"></i>
                Ver Repositorio
              </a>
            </>
          )}
        </div>
      </article>
    </Revelar>
  );
}
