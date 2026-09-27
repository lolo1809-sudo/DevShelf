import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

// Importar librería de Notificación para Login
import { Toaster } from "sonner";

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
import Login from "./pages/Login";
import Checkout from "./components/Checkout";

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

  // Todas las páginas que no tiene Header
  const esSinHeader = location.pathname === "/" || location.pathname === "/login" || location.pathname === "/checkout";

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filtro, setFiltro] = useState("");

  // ================= 1. ESTADO DE USUARIO =================
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    // Obtener sesión inicial
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUsuario(session?.user ?? null);
    });

    // Escuchar cambios (login, logout) en tiempo real
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUsuario(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // ==================== 2. LÓGICA DE FAVORITOS ===============
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

  // ================= 3. LÓGICA DE DATOS Y SUPABASE ===============
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
      {/* Si NO es alguna página sin Header, muestra el Header */}
      {!esSinHeader && <Header onSearch={setFiltro} estado={sidebarOpen} setEstado={setSidebarOpen} />}

      {esSinHeader ? (
        <Routes>
          <Route path="/" element={<InicioPages datos={datos} filtro={filtro} favoritos={favoritos} toggleFav={toggleFavorito} usuario={usuario} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      ) : (
        // Si es cualquier otra página, muestra el Header
        <div className="flex-container">
          <Sidebar estaAbierto={sidebarOpen} setEstaAbierto={setSidebarOpen} />

          <main className="content">
            <Routes>
              <Route path="/inputs" element={<InputsPage datos={datos} filtro={filtro} favoritos={favoritos} toggleFav={toggleFavorito} usuario={usuario} />} />
              <Route path="/buttons" element={<ButtonsPage datos={datos} filtro={filtro} favoritos={favoritos} toggleFav={toggleFavorito} usuario={usuario} />} />
              <Route path="/seleccion" element={<SeleccionPage datos={datos} filtro={filtro} favoritos={favoritos} toggleFav={toggleFavorito} usuario={usuario} />} />
              <Route path="/modales" element={<ModalesPage datos={datos} filtro={filtro} favoritos={favoritos} toggleFav={toggleFavorito} usuario={usuario} />} />
              <Route path="/navegacion" element={<NavegacionPage datos={datos} filtro={filtro} favoritos={favoritos} toggleFav={toggleFavorito} usuario={usuario} />} />
              <Route path="/cards" element={<CardsPage datos={datos} filtro={filtro} favoritos={favoritos} toggleFav={toggleFavorito} usuario={usuario} />} />
              <Route path="/formularios" element={<FormulariosPage datos={datos} filtro={filtro} favoritos={favoritos} toggleFav={toggleFavorito} usuario={usuario} />} />
              <Route path="/tipografias" element={<TipografiasPage datos={datos} filtro={filtro} favoritos={favoritos} toggleFav={toggleFavorito} usuario={usuario} />} />
              <Route path="/juegos" element={<JuegosPage datos={datos} filtro={filtro} favoritos={favoritos} toggleFav={toggleFavorito} usuario={usuario} />} />
              <Route path="/paginas" element={<WebsPages datos={datos} filtro={filtro} favoritos={favoritos} toggleFav={toggleFavorito} usuario={usuario} />} />
              <Route path="/favoritos" element={<FavoritosPage datos={datos} filtro={filtro} favoritos={favoritos} toggleFav={toggleFavorito} usuario={usuario} />} />
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
      <Toaster richColors position="top-right" theme="dark" />
      <AnalyticsTracker />
      <LayoutContenido />
      <Footer />
    </BrowserRouter>
  );
}
