import React from "react";
import EstadoVacio from "../components/EstadoVacio";
import TarjetaComponente from "../components/TarjetaComponente";

export default function FavoritosPage({ datos, favoritos, toggleFav, filtro }) {
  // 1. PROTECCIÓN: Si datos no ha cargado aún, no hacemos nada
  if (!datos) return <h2 className="text-white text-center mt-10">Cargando datos...</h2>;

  // Función para quitar tildes y pasar a minúsculas
  const normalizar = (texto) => {
    return texto
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  };

  // Filtramos los elementos que están en favoritos Y coinciden con la búsqueda
  const itemsFavoritos = datos.filter((item) => {
    if (!item.id || !item.titulo) return false;

    const esFavorito = favoritos.includes(item.id);
    const coincideBusqueda = normalizar(item.titulo).includes(normalizar(filtro));

    return esFavorito && coincideBusqueda;
  });

  return (
    <>
      <title>Favoritos | DevShelf</title>
      <meta name="description" content="Guarda tus componentes favoritos en un solo lugar" />

      {/* Contenedor Grid Principal */}
      <div className="w-[95%] max-w-[1300px] mx-auto pt-[100px] pb-[50px] grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] justify-center gap-y-[50px] gap-x-[40px] cursor-[url('/cursor.svg')_16_16,_auto] [&_input]:cursor-[url('/pointer.svg')_16_16,_text]">
        {itemsFavoritos.map((item) => (
          <TarjetaComponente key={item.id} item={item} favoritos={favoritos} toggleFav={toggleFav} />
        ))}

        {/* Mensaje condicional de resultados vacíos */}
        {itemsFavoritos.length === 0 &&
          (favoritos.length > 0 ? (
            <EstadoVacio mensaje="No se encontraron favoritos con ese nombre." />
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-16 px-6 my-8 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[20px] shadow-[var(--shadow-card)] text-center max-w-md mx-auto w-full">
              {/* Corazón SVG animado con tu paleta */}
              <div className="w-16 h-16 mb-5 rounded-full bg-[var(--input-bg)] border border-[var(--border-color)] flex items-center justify-center shadow-inner">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-[#ff4d4d] fill-current animate-pulse" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>

              <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">Aún no tienes favoritos</h3>

              <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-1">Explora las secciones y dale al corazón ❤️ para guardarlos aquí.</p>
            </div>
          ))}
      </div>
    </>
  );
}
