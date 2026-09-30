import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Login() {
  const [modo, setModo] = useState("login"); // "login" | "register" | "delete"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [usuarioActual, setUsuarioActual] = useState(null);

  const navigate = useNavigate();

  // Verifica si el usuario está logueado y guarda sus datos en usuarioActual
  useEffect(() => {
    async function obtenerSesion() {
      const { data } = await supabase.auth.getSession();
      setUsuarioActual(data?.session?.user ?? null);
    }
    obtenerSesion();
  }, []);

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (modo === "login") {
        // iniciar sesión
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;

        toast.success("¡Inicio de Sesión exitoso!");
        navigate("/");
      } else if (modo === "register") {
        // registrarse
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;

        toast.success("¡Registro exitoso! Ya puedes iniciar sesión.");
        setModo("login");
      } else if (modo === "delete") {
        // eliminar cuenta
        const { error: errorAuth } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (errorAuth) throw errorAuth;

        // Invocar la función SQL que elimina el usuario actual de auth.users
        const { error: errorDelete } = await supabase.rpc("eliminar_usuario");
        if (errorDelete) throw errorDelete;

        // Limpiar la sesión local
        await supabase.auth.signOut();
        setUsuarioActual(null);
        setEmail("");
        setPassword("");
        setModo("login");
        toast.success("Cuenta eliminada permanentemente.");
      }
    } catch (err) {
      if (err.message === "Invalid login credentials") {
        toast.error("Correo o contraseña incorrectos.");
      } else if (err.message === "User already registered") {
        toast.error("Este correo ya está registrado. Por favor, inicia sesión.");
        setModo("login");
      } else {
        toast.error("Error: " + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const cerrarSesion = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Error al cerrar sesión: " + error.message);
    } else {
      setUsuarioActual(null);
      setEmail("");
      setPassword("");
      toast.info("Has cerrado sesión correctamente.");
    }
  };

  return (
    <>
      <title>Login | DevShelf</title>
      <meta name="description" content="Loguearse para obtener componentes exclusivos" />

      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-body-2)] px-4">
        <div className="w-full max-w-md p-8 rounded-2xl bg-[var(--bg-card)] border border-[var(--glass-border)] shadow-[var(--shadow-card)]">
          <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-2 text-center">
            {modo === "login" && "Iniciar Sesión"}
            {modo === "register" && "Crear Cuenta"}
            {modo === "delete" && "Eliminar Cuenta"}
          </h2>

          {modo === "delete" && <p className="text-red-400 text-xs text-center mb-6 font-medium">Acción irreversible. Ingresa tus credenciales para confirmar la baja total.</p>}

          <form onSubmit={manejarEnvio} className="flex flex-col gap-4 mt-4">
            <div>
              <label className="block text-[var(--text-secondary)] text-sm font-semibold mb-1">Correo Electrónico</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[var(--input-bg)] border border-[var(--glass-border)] text-[var(--text-primary)] rounded-lg px-4 py-2.5 outline-none focus:border-[var(--accent-color)] transition-colors"
              />
            </div>

            <div>
              <label className="block text-[var(--text-secondary)] text-sm font-semibold mb-1">Contraseña</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[var(--input-bg)] border border-[var(--glass-border)] text-[var(--text-primary)] rounded-lg px-4 py-2.5 outline-none focus:border-[var(--accent-color)] transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full font-bold rounded-lg px-4 py-3 mt-4 transition-opacity disabled:opacity-50 cursor-pointer ${
                modo === "delete" ? "bg-red-600 hover:bg-red-700 text-white" : "bg-[var(--accent-color)] hover:opacity-90 text-black"
              }`}
            >
              {loading ? "Procesando..." : modo === "login" ? "Ingresar" : modo === "register" ? "Registrarse" : "Confirmar y Eliminar Cuenta"}
            </button>
          </form>

          <div className="mt-6 flex flex-col gap-3">
            <div className="flex items-center my-1">
              <div className="flex-grow border-t border-[var(--border-color)]"></div>
              <span className="px-3 text-[var(--text-secondary)] text-xs uppercase tracking-wider font-semibold">o</span>
              <div className="flex-grow border-t border-[var(--border-color)]"></div>
            </div>

            {/* Alternar login / registro */}
            {modo !== "delete" ? (
              <button
                type="button"
                onClick={() => setModo(modo === "login" ? "register" : "login")}
                className="w-full text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-sm transition-colors font-medium cursor-pointer"
              >
                {modo === "login" ? "¿No tienes cuenta? Regístrate aquí" : "¿Ya tienes cuenta? Inicia sesión"}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setModo("login")}
                className="w-full text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-sm transition-colors font-medium cursor-pointer"
              >
                Volver a Iniciar Sesión
              </button>
            )}

            {/* Alternar a vista de eliminar cuenta */}
            {modo !== "delete" && (
              <button type="button" onClick={() => setModo("delete")} className="w-full text-red-400/80 hover:text-red-400 text-sm transition-colors font-medium cursor-pointer">
                ¿Deseas eliminar tu cuenta? Haz clic aquí
              </button>
            )}

            {/* Cerrar sesión si hay usuario activo */}
            {usuarioActual && modo !== "delete" && (
              <button
                type="button"
                onClick={cerrarSesion}
                className="w-full bg-red-600/20 text-red-400 border border-red-800/50 hover:bg-red-600 hover:text-white font-semibold py-2.5 px-4 rounded-lg text-sm transition-all duration-200 mt-2 flex items-center justify-center gap-2 cursor-pointer"
              >
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                Cerrar Sesión ({usuarioActual.email})
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
