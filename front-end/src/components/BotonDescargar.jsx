import React from "react";
import confetti from "canvas-confetti";
import { supabase } from "../supabaseClient";

const BotonDescargar = ({ categoria, nombreCarpeta, idComponente }) => {
  const handleDownload = async () => {
    try {
      // 1. Aumentar el contador en la tabla 'components' de Supabase
      if (idComponente) {
        const { data: componenteActual, error: errorFetch } = await supabase.from("components").select("cant_descargas").eq("id", idComponente).single();

        if (!errorFetch && componenteActual) {
          const nuevasDescargas = (componenteActual.cant_descargas || 0) + 1;

          await supabase.from("components").update({ cant_descargas: nuevasDescargas }).eq("id", idComponente);
        }
      }

      // 2. Obtener el archivo .zip desde el Storage de Supabase
      const rutaEnStorage = `${categoria}/${nombreCarpeta}/${nombreCarpeta}.zip`;

      const { data, error } = await supabase.storage.from("cod_img").download(rutaEnStorage);

      if (error) {
        console.error("Error al descargar del storage:", error.message);
        alert("No se pudo descargar el archivo.");
        return;
      }

      // 3. Crear un enlace temporal para descargar el archivo binario obtenido
      const blob = new Blob([data], { type: "application/zip" });
      const urlBlob = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = urlBlob;
      link.download = `${nombreCarpeta}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Limpiar la URL temporal de la memoria
      window.URL.revokeObjectURL(urlBlob);
    } catch (err) {
      console.error("Error inesperado en la descarga:", err);
    }

    // 4. Confeti al descargar
    const configuracionBase = {
      particleCount: 100,
      spread: 60,
      origin: { y: 0.8 },
      colors: ["#26ccff", "#a25afd", "#ff5e7e", "#88ff5a", "#fcff42", "#ffa62d", "#ff36ff"],
    };

    confetti({ ...configuracionBase, angle: 60, origin: { x: 0, y: 0.8 } });
    confetti({ ...configuracionBase, angle: 120, origin: { x: 1, y: 0.8 } });
  };

  return (
    <button
      className="bg-transparent border-none p-2 text-[var(--text-secondary)] transition-all duration-300 ease-in-out hover:scale-110 hover:text-[var(--text-primary)] cursor-[url('/pointer.svg')_16_16,_pointer]"
      onClick={handleDownload}
      aria-label="Descargar carpeta"
      title="Descargar archivos"
      type="button"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="fill-current transition-colors duration-300 ease-in-out">
        <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
      </svg>
    </button>
  );
};

export default BotonDescargar;
