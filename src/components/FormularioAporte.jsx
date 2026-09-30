import React, { useState } from "react";
import { supabase } from "../supabaseClient";

export default function FormularioAporte() {
  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [archivoZip, setArchivoZip] = useState(null);
  const [githubUrl, setGithubUrl] = useState("");
  const [estadoSubida, setEstadoSubida] = useState({ cargando: false, mensaje: "", error: false });

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setEstadoSubida({ cargando: true, mensaje: "", error: false });

    if (!archivoZip && !githubUrl.trim()) {
      setEstadoSubida({ cargando: false, mensaje: "Debes subir un archivo .zip o proporcionar un link de GitHub.", error: true });
      return;
    }

    try {
      let zipPublicUrl = null;

      if (archivoZip) {
        const nombreArchivo = `${Date.now()}-${archivoZip.name.replace(/\s+/g, "-")}`;
        const { error: errorStorage } = await supabase.storage.from("cod_img").upload(nombreArchivo, archivoZip);

        if (errorStorage) throw new Error("Error al subir el archivo ZIP al servidor.");

        const { data: urlData } = supabase.storage.from("cod_img").getPublicUrl(nombreArchivo);
        zipPublicUrl = urlData.publicUrl;
      }

      const { error: errorDB } = await supabase.from("components_subidos").insert([
        {
          titulo: titulo.trim() || "Sin título",
          categoria: categoria,
          zip_url: zipPublicUrl,
          git_hub_url: githubUrl.trim() || null,
        },
      ]);

      if (errorDB) throw new Error("Error al guardar los datos en la base de datos.");

      setEstadoSubida({ cargando: false, mensaje: "¡Componente enviado con éxito para revisión!", error: false });
      setTitulo("");
      setCategoria("");
      setArchivoZip(null);
      setGithubUrl("");
      e.target.reset();
    } catch (error) {
      setEstadoSubida({ cargando: false, mensaje: error.message, error: true });
    }
  };

  return (
    <div className="w-[90%] max-w-[600px] bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-5 sm:p-8 shadow-[var(--shadow-card)]">
      <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-2 text-center">Comparte tu código</h3>
      <p className="text-[var(--text-secondary)] text-center mb-6 text-sm">Sube tu componente y ayúdanos a expandir DevShelf. Se revisará antes de publicarse.</p>

      <form onSubmit={manejarEnvio} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label className="text-[var(--text-primary)] text-sm font-semibold">Título (Opcional)</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Ej: Botón Neón"
            className="bg-[var(--input-bg)] border border-[var(--glass-border)] text-[var(--text-primary)] rounded-lg px-4 py-2.5 outline-none focus:border-[var(--accent-color)] transition-colors"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[var(--text-primary)] text-sm font-semibold">Categoría *</label>
          <select
            required
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="w-full bg-[var(--input-bg)] border border-[var(--glass-border)] text-[var(--text-primary)] rounded-lg px-4 py-2.5 outline-none focus:border-[var(--accent-color)] transition-colors cursor-pointer block box-border [&>option]:bg-[#161616] [&>option]:text-white"
          >
            <option value="" disabled className="text-gray-500">
              Selecciona una categoría
            </option>
            <option value="buttons">Buttons</option>
            <option value="cards">Cards</option>
            <option value="formularios">Formularios</option>
            <option value="inputs">Inputs</option>
            <option value="juegos">Juegos</option>
            <option value="modales">Modales</option>
            <option value="navegacion">Navegación</option>
            <option value="paginas_webs">Páginas Webs</option>
            <option value="seleccion">Selección</option>
            <option value="tipografias">Tipografías</option>
          </select>
        </div>

        <div className="flex flex-col gap-2 my-2">
          <span className="text-[var(--accent-color)] text-sm font-semibold text-center border-b border-[var(--border-color)] pb-2">Sube tu código de UNA de estas dos formas *</span>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[var(--text-primary)] text-sm font-semibold">Opción 1: Archivo .zip</label>
          <input
            type="file"
            accept=".zip"
            onChange={(e) => setArchivoZip(e.target.files[0])}
            className="bg-[var(--input-bg)] border border-[var(--glass-border)] text-[var(--text-secondary)] rounded-lg px-4 py-2 outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[rgba(160,184,0,0.1)] file:text-[var(--accent-color)] hover:file:bg-[rgba(160,184,0,0.2)] transition-colors cursor-pointer"
          />
        </div>

        <div className="flex items-center my-3">
          <div className="flex-grow border-t border-[var(--border-color)]"></div>
          <span className="px-3 text-[var(--text-secondary)] text-xs uppercase tracking-wider font-semibold">o</span>
          <div className="flex-grow border-t border-[var(--border-color)]"></div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[var(--text-primary)] text-sm font-semibold">Opción 2: Link de GitHub</label>
          <input
            type="url"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            placeholder="https://github.com/usuario/repositorio"
            className="bg-[var(--input-bg)] border border-[var(--glass-border)] text-[var(--text-primary)] rounded-lg px-4 py-2.5 outline-none focus:border-[var(--accent-color)] transition-colors"
          />
        </div>

        {estadoSubida.mensaje && (
          <div
            className={`p-3 rounded-lg text-sm font-semibold text-center ${estadoSubida.error ? "bg-red-900/30 text-red-400 border border-red-800" : "bg-green-900/30 text-green-400 border border-green-800"}`}
          >
            {estadoSubida.mensaje}
          </div>
        )}

        <button
          type="submit"
          disabled={estadoSubida.cargando}
          className="mt-2 w-full py-3 bg-[var(--accent-color)] text-black font-bold text-[16px] rounded-lg hover:bg-[#b5d100] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(160,184,0,0.3)] hover:shadow-[0_0_25px_rgba(160,184,0,5)] cursor-pointer"
        >
          {estadoSubida.cargando ? "Enviando..." : "Enviar componente"}
        </button>
      </form>
    </div>
  );
}
