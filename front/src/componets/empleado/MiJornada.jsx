import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { marcarDiaTrabajado } from "../../redux/action/registroDiaTrabajoActions";
import "./MiJornada.css";

const MiJornada = () => {
  const dispatch = useDispatch();

  const usuario = useSelector((state) => state.auth?.usuario);
  const registroState = useSelector((state) => state.registroDiaTrabajo);

  const [status, setStatus] = useState(null); 
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);
  const [marcadoHoy, setMarcadoHoy] = useState(false);
  const [horaMarcado, setHoraMarcado] = useState(null);

  // Fecha normalizada
  const fechaHoy = new Date().toISOString().slice(0, 10);

  // 🔹 Validación horario (06 a 10)
  const validarHorario = () => {
    const hora = new Date().getHours();
    return hora >= 6 && hora <= 22;
  };

  const handleMarcarDia = useCallback(async () => {
    if (!usuario?.id) {
      setStatus("error");
      setMensaje("Usuario no identificado");
      return;
    }

    // ✅ Confirmación
    const confirmar = window.confirm("¿Confirmás marcar tu jornada de hoy?");
    if (!confirmar) return;

    // ✅ Validar horario
    if (!validarHorario()) {
      setStatus("error");
      setMensaje("Solo podés marcar entre las 06:00 y 10:00");
      return;
    }

    try {
      setLoading(true);

      const response = await dispatch(
        marcarDiaTrabajado(usuario.id, fechaHoy)
      );

      if (response?.success) {
        const hora = new Date().toLocaleTimeString();
        setHoraMarcado(hora);
        setStatus("success");
        setMensaje("Día marcado correctamente");
        setMarcadoHoy(true);
      } else if (response?.alreadyMarked) {
        setStatus("info");
        setMensaje("El día ya estaba marcado");
        setMarcadoHoy(true);
      } else {
        throw new Error(response?.error || "Error desconocido");
      }

    } catch (error) {
      setStatus("error");
      setMensaje(error.message || "Error al marcar el día");
    } finally {
      setLoading(false);
    }

  }, [dispatch, usuario, fechaHoy]);

  // 🔹 Auto limpiar mensajes
  useEffect(() => {
    if (!mensaje) return;

    const timer = setTimeout(() => {
      setMensaje("");
      setStatus(null);
    }, 4000);

    return () => clearTimeout(timer);
  }, [mensaje]);

  // 🔹 Marcar si ya fue registrado hoy desde redux
  useEffect(() => {
    if (registroState?.hoyMarcado) {
      setMarcadoHoy(true);
      setHoraMarcado(registroState.hora || null);
    }
  }, [registroState]);

  return (
    <div className="mi-jornada">
      <div className="jornada-card">

        <h2>Mi Jornada Laboral</h2>

        <p className="fecha-hoy">
          📅 {new Date().toLocaleDateString("es-ES")}
        </p>

        <button
          className="btn-marcar"
          onClick={handleMarcarDia}
          disabled={loading || marcadoHoy}
        >
          {loading ? "Procesando..." : "✔ Marcar como trabajado"}
        </button>

        {/* Spinner */}
        {loading && <div className="spinner"></div>}

        {/* Mensaje */}
        {mensaje && (
          <div className={`alert ${status}`}>
            {status === "success" && "✅ "}
            {status === "error" && "❌ "}
            {status === "info" && "ℹ️ "}
            {mensaje}
          </div>
        )}

        {/* Hora marcado */}
        {horaMarcado && (
          <p className="hora-marcado">
            ⏰ Marcado a las {horaMarcado}
          </p>
        )}

        {/* Historial */}
        <div className="historial">
          <h3>Últimos días trabajados</h3>
          {registroState?.ultimosDias?.length > 0 ? (
            registroState.ultimosDias.map((dia) => (
              <div key={dia.fecha} className="dia-item">
                📅 {dia.fecha} — ⏰ {dia.hora || "Sin hora"}
              </div>
            ))
          ) : (
            <p>No hay registros</p>
          )}
        </div>

      </div>
    </div>
  );
};

export default MiJornada;