import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { toast } from "sonner";

export default function Checkout() {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Verificar que el usuario esté logueado antes de mostrar la página
  useEffect(() => {
    async function verificarSesion() {
      const { data } = await supabase.auth.getSession();
      if (!data?.session?.user) {
        toast.error("Debes iniciar sesión para realizar el pago.");
        navigate("/login");
      } else {
        setUsuario(data.session.user);
      }
    }
    verificarSesion();
  }, [navigate]);

  // 
  const procesarPago = async () => {
    setLoading(true);
    toast.info("Generando enlace de pago...");

    try {
      const { data, error } = await supabase.functions.invoke("pago-mercadopago", {
        body: {
          userId: usuario.id,
          email: usuario.email,
          precio: 1000, 
        },
      });

      if (error) throw error;
      if (!data?.url) throw new Error("No se recibió la URL de pago");

      // Redirige al checkout de Mercado Pago
      window.location.href = data.url;
    } catch (err) {
      console.error(err);
      toast.error("Ocurrió un error al iniciar el pago.");
    } finally {
      setLoading(false);
    }
  };

  // Evita que la pantalla parpadee mientras verifica la sesión
  if (!usuario) return null;

  return (
    <>
      <title>Checkout | DevShelf</title>
      <meta name="description" content="Finaliza tu suscripción a Pro" />

      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-body-2)] px-4 pt-20 pb-10">
        <div className="w-full max-w-lg p-8 sm:p-10 rounded-2xl bg-[var(--bg-card)] border border-[var(--glass-border)] shadow-[var(--shadow-card)] relative overflow-hidden">
          {/* Brillo decorativo */}
          <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-[var(--accent-color)] opacity-[0.15] blur-[60px] rounded-full pointer-events-none translate-x-1/2 -translate-y-1/2"></div>

          <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-2">Completar compra</h2>
          <p className="text-[var(--text-secondary)] text-sm mb-8">Estás a un paso de desbloquear todo el contenido.</p>

          {/* Resumen del pedido */}
          <div className="bg-[var(--input-bg)] border border-[var(--glass-border)] rounded-xl p-6 mb-8">
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-[var(--border-color)]">
              <div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)]">Plan Pro</h3>
                <p className="text-[var(--text-secondary)] text-sm">Acceso ilimitado por un mes</p>
              </div>
              <span className="text-2xl font-bold text-[var(--text-primary)]">$0.99</span>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-sm text-[var(--text-secondary)]">
                <span>Cuenta vinculada:</span>
                <span className="font-medium text-[var(--text-primary)]">{usuario.email}</span>
              </div>
              <div className="flex justify-between text-sm text-[var(--text-secondary)] mt-2">
                <span>Impuestos</span>
                <span>Calculados en el pago</span>
              </div>
            </div>
          </div>

          {/* Botón de pago */}
          <button
            onClick={procesarPago}
            disabled={loading}
            className="w-full bg-[var(--accent-color)] text-black font-bold text-[16px] rounded-lg px-4 py-4 hover:bg-[#b5d100] transition-all hover:-translate-y-0.5 shadow-[0_0_15px_rgba(160,184,0,0.3)] disabled:opacity-70 disabled:hover:translate-y-0 disabled:shadow-none cursor-pointer flex justify-center items-center gap-2"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <i className="fa-solid fa-circle-notch fa-spin"></i> Procesando...
              </span>
            ) : (
              <>
                <i className="fa-solid fa-lock"></i> Pagar de forma segura
              </>
            )}
          </button>

          <p className="text-center text-[11px] text-[var(--text-secondary)] mt-4 font-medium flex justify-center items-center gap-1">
            <i className="fa-solid fa-shield-halved"></i> Tus datos están protegidos.
          </p>
        </div>
      </div>
    </>
  );
}
