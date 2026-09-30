import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

// Diccionarios de las páginas del sidebar
const menuItems = [
  { nombre: "Inputs", ruta: "/inputs", icono: "fa-solid fa-keyboard" },
  { nombre: "Buttons", ruta: "/buttons", icono: "fa-solid fa-play" },
  {
    nombre: "Selección",
    ruta: "/seleccion",
    icono: "fa-solid fa-check",
  },
  {
    nombre: "Modales",
    ruta: "/modales",
    icono: "fa-solid fa-mattress-pillow",
  },
  {
    nombre: "Navegación",
    ruta: "/navegacion",
    icono: "fa-solid fa-bars",
  },
  {
    nombre: "Cards",
    ruta: "/cards",
    icono: "fa-solid fa-id-card-clip",
  },
  {
    nombre: "Formularios",
    ruta: "/formularios",
    icono: "fa-solid fa-right-to-bracket",
  },
  {
    nombre: "Tipografias",
    ruta: "/tipografias",
    icono: "fa-solid fa-text-height",
  },
  { nombre: "Juegos", ruta: "/juegos", icono: "fa-solid fa-gamepad" },
  {
    nombre: "Páginas webs",
    ruta: "/paginas",
    icono: "fa-solid fa-file-code",
  },
  {
    nombre: "Favoritos",
    ruta: "/favoritos",
    icono: "fa-solid fa-bookmark",
  },
];

export default function Sidebar({ estaAbierto, setEstaAbierto }) {
  const location = useLocation();
  const [busqueda, setBusqueda] = useState("");

  const normalizar = (texto) => {
    return texto
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  };

  const menuFiltrado = menuItems.filter((item) => normalizar(item.nombre).includes(normalizar(busqueda)));

  return (
    <aside
      className={`fixed left-0 top-[80px] h-[calc(100vh-80px)] bg-[var(--bg-card)] border-r border-[var(--border-color)] flex flex-col overflow-y-auto pb-[100px] pt-5 px-2.5 z-[100] transition-all duration-300 ease-in-out [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${
        estaAbierto ? "w-[250px] max-[500px]:w-[80%] opacity-100 visible pointer-events-auto" : "w-0 opacity-0 invisible pointer-events-none delay-[300ms]_visibility"
      }`}
    >
      <div className="px-[15px] pb-5 pt-2.5">
        <input
          type="text"
          placeholder="Buscar categoría..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          aria-label="Buscar categoría en el menú"
          className="w-full px-[15px] py-2.5 bg-[var(--input-bg)] border border-[var(--border-color)] rounded-xl text-[var(--text-primary)] text-[0.95rem] outline-none transition-all duration-300 ease-in-out focus:border-[var(--accent-color)] focus:shadow-[0_0_0_3px_rgba(160,184,0,0.15)] placeholder:text-[var(--text-secondary)] placeholder:opacity-70"
        />
      </div>

      <nav className="w-full">
        <ul className="w-full flex flex-col gap-[15px]">
          {menuFiltrado.map((item) => {
            const esExterno = item.ruta.startsWith("http");
            const isActivo = location.pathname === item.ruta;

            // Clases dinámicas según estado "active"
            const liClasses = `group list-none rounded-xl transition-all duration-300 ease-in-out cursor-pointer relative border hover:bg-[rgba(160,184,0,0.1)] hover:border-[var(--accent-color)] hover:shadow-[0_0_15px_rgba(160,184,0,0.1)] hover:translate-x-[5px] ${
              isActivo ? "bg-[rgba(160,184,0,0.15)] border-[var(--accent-color)] border-l-[3px] text-[var(--text-primary)]" : "bg-transparent border-transparent text-[var(--text-secondary)]"
            }`;

            const linkClasses = `flex items-center gap-[15px] w-full h-full py-3 px-5 no-underline text-[16px] font-medium transition-colors duration-300 ease-in-out group-hover:text-[var(--accent-color)] ${
              isActivo ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)]"
            }`;

            const iconClasses = `${item.icono} w-[25px] text-center transition-colors duration-300 ease-in-out group-hover:text-[var(--accent-color)] ${
              item.icono.includes("fa-file-code") ? "text-[22px]" : "text-[18px]"
            } ${isActivo ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)]"}`;

            return (
              <li key={item.nombre} className={liClasses}>
                {esExterno ? (
                  <a href={item.ruta} target="_blank" rel="noopener noreferrer" onClick={() => setEstaAbierto(false)} aria-label={`Ir a la sección ${item.nombre}`} className={linkClasses}>
                    <i className={iconClasses}></i>
                    {item.nombre}
                  </a>
                ) : (
                  <Link to={item.ruta} onClick={() => setEstaAbierto(false)} aria-label={`Ir a la sección ${item.nombre}`} className={linkClasses}>
                    <i className={iconClasses}></i>
                    {item.nombre}
                  </Link>
                )}
              </li>
            );
          })}

          {menuFiltrado.length === 0 && <li className="p-[10px] text-[#888]">No encontrado</li>}
        </ul>
      </nav>
    </aside>
  );
}
