import React from "react";
import EstadoVacio from "../components/EstadoVacio";
import TarjetaComponente from "../components/TarjetaComponente";

export default function CardsPage({ datos, filtro, favoritos, toggleFav }) {
  // Función para quitar tildes y pasar a minúsculas
  const normalizar = (texto) => {
    return texto
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  };

  // Filtrado de datos (Categoría + Buscador)
  const cardsFiltrados = datos.filter((item) => item.categoria === "cards" && normalizar(item.titulo).includes(normalizar(filtro)));

  return (
    <>
      {/* ESTO CAMBIA EL TÍTULO DE LA PESTAÑA */}
      <title>Cards | DevShelf</title>
      <meta name="description" content="Colección de tarjetas hechos con HTML, CSS, JS, listos para usar" />

      {/* Contenedor Grid Principal */}
      <div className="w-[95%] max-w-[1300px] mx-auto pt-[100px] pb-[80px]">
        {/* Grilla de tarjetas */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] justify-center gap-y-[50px] gap-x-[40px] cursor-[url('/cursor.svg')_16_16,_auto] [&_input]:cursor-[url('/pointer.svg')_16_16,_text]">
          {cardsFiltrados.map((item) => (
            <TarjetaComponente key={item.id} item={item} favoritos={favoritos} toggleFav={toggleFav} />
          ))}

          {cardsFiltrados.length === 0 && <EstadoVacio mensaje="No se encontraron tarjetas con ese nombre." />}
        </div>
      </div>
    </>
  );
}
