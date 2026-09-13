import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      {/* ESTO CAMBIA EL TÍTULO DE LA PESTAÑA */}

      <title>Not Found - DevShelf</title>
      <meta name="description" content="Error 404 en DevShelf" />

      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4" style={{ background: "var(--bg-body--inicio)" }}>
        {/* Título Principal 404 */}
        <h1 className="text-9xl font-bold tracking-tighter text-[var(--accent-color)] drop-shadow-[0_0_25px_rgba(160,184,0,0.3)]">404</h1>

        {/* Mensaje de error */}
        <h2 className="mt-6 text-3xl md:text-4xl font-semibold text-[var(--text-primary)]">¡Ruta no encontrada!</h2>
        <p className="mt-4 text-lg text-[var(--text-secondary)] max-w-md">Parece que te has perdido. La página que buscas no existe en El Rincón del Front-end.</p>

        {/* Botón Volver al inicio */}
        <Link
          to="/"
          className="mt-10 px-8 py-3 rounded-full border border-[var(--accent-color)] text-[var(--accent-color)] font-medium transition-all duration-300 hover:bg-[var(--accent-color)] hover:text-black hover:shadow-[0_0_20px_rgba(160,184,0,0.6)]"
        >
          Volver al inicio
        </Link>
      </div>
    </>
  );
}
