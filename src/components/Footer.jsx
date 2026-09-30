import { useLocation } from "react-router-dom";
import { FaCodeBranch, FaHeart, FaUsers, FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  const location = useLocation();
  const year = new Date().getFullYear();

  return (
    <footer className="relative w-full p-5 md:px-10 md:py-5 flex flex-col md:flex-row justify-between items-center flex-wrap gap-5 bg-[var(--bg-body)] border-t border-[var(--glass-border)] backdrop-blur-[5px] z-10 transition-colors duration-300 ease-in-out text-center md:text-left">
      {/* SECCIÓN 1: Copyright e Info */}
      <div className="flex flex-col text-[1rem] text-[var(--text-primary)] opacity-70">
        <p>© {year} DevShelf</p>
        <span className="text-[0.9rem] opacity-50">Todos los Derechos Reservados</span>
      </div>

      {/* SECCIÓN 2: Enlaces  */}
      <div className="flex w-full md:w-auto justify-center gap-[15px] flex-wrap">
        <a
          href="https://link.mercadopago.com.ar/elrincondelfrontend"
          className="flex items-center gap-2 px-4 py-2 rounded-[20px] text-[0.9rem] font-semibold bg-[#d32f2f] text-white transition-all duration-200 ease-in-out hover:bg-[#ff0000] hover:-translate-y-[2px] hover:opacity-90"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaHeart /> Donar
        </a>

        <a
          href="https://portfolio-lorenzo-lopez.netlify.app/"
          className="flex items-center gap-2 px-4 py-2 rounded-[20px] text-[0.9rem] font-semibold bg-transparent border border-[var(--text-secondary)] text-[var(--text-secondary)] transition-all duration-200 ease-in-out hover:-translate-y-[2px] hover:opacity-90"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaUsers /> ¿Quiénes Somos?
        </a>
      </div>

      {/* SECCIÓN 3: Redes Sociales */}
      <div className="flex w-full md:w-[250px] justify-center items-center flex-wrap gap-[15px]">
        {/* GitHub */}
        <a
          href="https://github.com/lolo1809-sudo"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="w-auto grow-0 inline-block m-0 p-0 text-[1.5rem] text-[var(--text-primary)] transition-colors duration-300 ease-in-out hover:text-[var(--accent-color)]"
        >
          <FaGithub />
        </a>

        {/* Linkedin */}
        <a
          href="https://www.linkedin.com/in/lorenzo-lopez-8608b4257/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="w-auto grow-0 inline-block m-0 p-0 text-[1.5rem] text-[var(--text-primary)] transition-colors duration-300 ease-in-out hover:text-[var(--accent-color)]"
        >
          <FaLinkedin />
        </a>
      </div>
    </footer>
  );
}
