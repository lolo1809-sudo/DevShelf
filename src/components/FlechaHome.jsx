import React from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const FlechaHome = () => {
  return (
    <Link
      to="/"
      className="flex items-center justify-center w-10 h-10 rounded-xl bg-[var(--glass-bg)]  text-[#a0b800] transition-all duration-300 hover:bg-[var(--bg-card)] hover:scale-110 shadow-sm"
      title="Volver al inicio"
    >
      <FaArrowLeft size={20} />
    </Link>
  );
};

export default FlechaHome;
