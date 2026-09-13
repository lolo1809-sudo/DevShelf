import React from "react";
import BotonFavorito from "./BotonFav";
import BotonDescargar from "./BotonDescargar";
import { Revelar } from "./Revelar";

export default function TarjetaComponente({ item, favoritos, toggleFav }) {
  const nombreCarpeta = item.id;
  const nombreCategoria = item.categoria;
  const esFavorito = favoritos ? favoritos.includes(item.id) : false;

  //si item.codigo_html está vacío, nulo o undefined, mostramos la imagen
  const tieneCodigo = item.codigo_html && item.codigo_html.trim() !== "";

  return (
    <Revelar key={item.id}>
      <article
        data-id={item.id}
        className="group bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[20px] p-[40px_20px] h-auto shadow-[var(--shadow-card)] relative overflow-visible flex flex-col items-center justify-between gap-[15px] transition-all duration-300 ease-in-out hover:-translate-y-[5px] hover:border-[#a0b800] hover:shadow-[0_10px_40px_rgba(160,184,0,0.1)] cursor-[url('/pointer.svg')_16_16,_pointer] animate-[subirYaparecer_0.5s_ease-out]"
      >
        {/* Demo */}
        <div className="w-full flex flex-col items-center justify-center gap-[30px] py-[10px] cursor-[url('/pointer.svg')_16_16,_pointer]">
          {/* 1. TÍTULO */}
          <h2 className="text-[30px] font-semibold text-center mb-[10px] bg-gradient-to-r from-[var(--text-gradient-start)] to-[var(--accent-color)] bg-clip-text text-transparent">{item.titulo}</h2>

          {/* 2. BOTÓN FAVORITO */}
          <div className="absolute top-[10px] right-[10px] z-10">
            <BotonFavorito esFavorito={esFavorito} onClick={() => toggleFav && toggleFav(item.id)} aria-label={`Añadir ${item.titulo} a favoritos`} />
          </div>

          {/* 3. BOTÓN DE DESCARGA Y CONTADOR */}
          <div className="absolute top-[10px] left-[10px] z-10 flex items-center gap-2">
            <BotonDescargar categoria={nombreCategoria} nombreCarpeta={nombreCarpeta} idComponente={item.id} />
            <span
              className="text-xs font-medium px-2.5 py-1 rounded-full bg-[var(--input-bg)] text-[var(--text-secondary)] border border-[var(--border-color)] flex items-center gap-1 shadow-sm"
              title="Cantidad de descargas"
            >
              {item.cant_descargas ?? 0} descargas
            </span>
          </div>

          {/* 4. VISTA CONDICIONAL AUTOMÁTICA: SI TIENE CÓDIGO HTML MUESTRA EL CÓDIGO, SI NO, MUESTRA LA IMAGEN */}
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

          {/* 5. LINK DEMO */}
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

          {/* 6. LINK REPOSITORIO */}
          <a
            href={`${item.git_hub_url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-transparent text-[#a0b800] py-[10px] px-[25px] rounded-[50px] border border-[#a0b800] text-[16px] font-semibold tracking-[1px] transition-all duration-300 ease-in-out w-fit h-fit flex items-center justify-center gap-[8px] hover:bg-[#a0b800] hover:text-black hover:shadow-[0_0_15px_rgba(160,184,0,0.4)] cursor-[url('/pointer.svg')_16_16,_pointer]"
          >
            <i aria-hidden="true" className="fa-solid fa-code cursor-[url('/pointer.svg')_16_16,_pointer]"></i>
            Ver Repositorio
          </a>
        </div>
      </article>
    </Revelar>
  );
}
