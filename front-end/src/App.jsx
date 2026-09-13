import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

// Importar la librería de analytics
import ReactGA from "react-ga4";

// Importa tu cliente de Supabase
import { supabase } from "./supabaseClient";

// Importación de componentes
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

// Importación de páginas
import InicioPages from "./pages/InicioPages";
import InputsPage from "./pages/InputsPages";
import ButtonsPage from "./pages/ButtonsPages";
import SeleccionPage from "./pages/SeleccionPages";
import ModalesPage from "./pages/ModalesPages";
import NavegacionPage from "./pages/NavegacionPages";
import CardsPage from "./pages/CardsPages";
import FormulariosPage from "./pages/FormulariosPages";
import TipografiasPage from "./pages/TipografiasPages";
import JuegosPage from "./pages/JuegosPages";
import WebsPages from "./pages/WebsPages";
import FavoritosPage from "./pages/FavoritosPages";
import NotFound from "./pages/NotFound";

// Inicializar el GA4 con el ID
ReactGA.initialize("G-S0DE4Y0ZXM");

// Componente auxiliar para rastrear las visitas al cambiar de página
function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname });
    window.scrollTo(0, 0); // Vuelve arriba al cambiar de página
  }, [location]);

  return null;
}

// Componente interno para manejar la visibilidad del Header y Sidebar según la ruta
function LayoutContenido() {
  const location = useLocation();
  const esInicio = location.pathname === "/"; // Detecta si estamos en el Home

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filtro, setFiltro] = useState("");

  // ==================== 1. LÓGICA DE FAVORITOS ===============
  const [favoritos, setFavoritos] = useState(() => {
    const guardados = localStorage.getItem("misFavoritos");
    return guardados ? JSON.parse(guardados) : [];
  });

  useEffect(() => {
    localStorage.setItem("misFavoritos", JSON.stringify(favoritos));
  }, [favoritos]);

  const toggleFavorito = (id) => {
    if (favoritos.includes(id)) {
      setFavoritos(favoritos.filter((favId) => favId !== id));
    } else {
      setFavoritos([...favoritos, id]);
    }
  };

  // ================= 2. LÓGICA DE DATOS Y SUPABASE ===============
  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function fetchComponentes() {
      try {
        const { data, error } = await supabase.from("components").select("*");
        if (error) throw error;
        if (data) setDatos(data);
      } catch (error) {
        console.error("Error al cargar los componentes de Supabase:", error.message);
      } finally {
        setCargando(false);
      }
    }
    fetchComponentes();
  }, []);

  return (
    <>
      {/* Si NO es la página de inicio, muestra el Header */}
      {!esInicio && <Header onSearch={setFiltro} estado={sidebarOpen} setEstado={setSidebarOpen} />}

      {esInicio ? (
        // Si es el inicio, renderiza solo la página sin contenedores de catálogo
        <Routes>
          <Route path="/" element={<InicioPages datos={datos} filtro={filtro} favoritos={favoritos} toggleFav={toggleFavorito} />} />
        </Routes>
      ) : (
        // Si es cualquier otra página del catálogo, muestra el Sidebar y la estructura
        <div className="flex-container">
          <Sidebar estaAbierto={sidebarOpen} setEstaAbierto={setSidebarOpen} />

          <main className="content">
            <Routes>
              <Route path="/inputs" element={<InputsPage datos={datos} filtro={filtro} favoritos={favoritos} toggleFav={toggleFavorito} />} />
              <Route path="/buttons" element={<ButtonsPage datos={datos} filtro={filtro} favoritos={favoritos} toggleFav={toggleFavorito} />} />
              <Route path="/seleccion" element={<SeleccionPage datos={datos} filtro={filtro} favoritos={favoritos} toggleFav={toggleFavorito} />} />
              <Route path="/modales" element={<ModalesPage datos={datos} filtro={filtro} favoritos={favoritos} toggleFav={toggleFavorito} />} />
              <Route path="/navegacion" element={<NavegacionPage datos={datos} filtro={filtro} favoritos={favoritos} toggleFav={toggleFavorito} />} />
              <Route path="/cards" element={<CardsPage datos={datos} filtro={filtro} favoritos={favoritos} toggleFav={toggleFavorito} />} />
              <Route path="/formularios" element={<FormulariosPage datos={datos} filtro={filtro} favoritos={favoritos} toggleFav={toggleFavorito} />} />
              <Route path="/tipografias" element={<TipografiasPage datos={datos} filtro={filtro} favoritos={favoritos} toggleFav={toggleFavorito} />} />
              <Route path="/juegos" element={<JuegosPage datos={datos} filtro={filtro} favoritos={favoritos} toggleFav={toggleFavorito} />} />
              <Route path="/paginas" element={<WebsPages datos={datos} filtro={filtro} favoritos={favoritos} toggleFav={toggleFavorito} />} />
              <Route path="/favoritos" element={<FavoritosPage datos={datos} filtro={filtro} favoritos={favoritos} toggleFav={toggleFavorito} />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      )}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AnalyticsTracker />
      <LayoutContenido />
      <Footer />
    </BrowserRouter>
  );
}
