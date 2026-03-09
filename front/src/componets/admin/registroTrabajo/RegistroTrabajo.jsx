import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { iniciarJornada, finalizarJornada, obtenerRegistrodiario } from "../../../redux/action/registroTrabajoAction";
import { listaEdificio } from "../../../redux/action/edificioAction";
import "./registroTrabajo.css";

const RegistroTrabajo = () => {
    const dispatch = useDispatch();
    const [jornadadaData, setJornadadaData] = useState({
        persona_id: "", // Se obtendría del usuario logueado
        edificio_id: ""
    });

    const [mensaje, setMensaje] = useState("");
    const [jornadadaActiva, setJornadadaActiva] = useState(null);

    const edificios = useSelector((state) => state.edificioState.allEdificios);
    const registrosDiarios = useSelector((state) => state.registroTrabajoState.registrosDiarios);

    useEffect(() => {
        dispatch(listaEdificio());
    }, [dispatch]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setJornadadaData({
            ...jornadadaData,
            [name]: value,
        });
    };

    const handleIniciarJornada = async () => {
        if (!jornadadaData.persona_id || !jornadadaData.edificio_id) {
            setMensaje("❌ Debes seleccionar una persona y un edificio");
            return;
        }

        const response = await dispatch(iniciarJornada(jornadadaData));
        if (response) {
            setMensaje("✅ Jornada iniciada correctamente");
            setJornadadaActiva(response.data);
            setTimeout(() => setMensaje(""), 3000);
        } else {
            setMensaje("❌ Error al iniciar jornada");
        }
    };

    const handleFinalizarJornada = async () => {
        if (!jornadadaActiva?.id) {
            setMensaje("❌ No hay jornada activa");
            return;
        }

        const response = await dispatch(finalizarJornada(jornadadaActiva.id));
        if (response) {
            setMensaje("✅ Jornada finalizada correctamente");
            setJornadadaActiva(null);
            dispatch(obtenerRegistrodiario(jornadadaData.persona_id));
            setTimeout(() => setMensaje(""), 3000);
        } else {
            setMensaje("❌ Error al finalizar jornada");
        }
    };

    return (
        <div className="registro-trabajo">
            <h2>Registro de Jornada Laboral</h2>

            <div className="jornada-section">
                <h3>Iniciar/Finalizar Jornada</h3>

                <div className="jornada-form">
                    <div className="form-group">
                        <label>Persona ID (Temporal)</label>
                        <input
                            type="number"
                            name="persona_id"
                            placeholder="ID de la persona"
                            value={jornadadaData.persona_id}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Edificio</label>
                        <select
                            name="edificio_id"
                            value={jornadadaData.edificio_id}
                            onChange={handleChange}
                        >
                            <option value="">Seleccionar edificio</option>
                            {edificios?.map((edificio) => (
                                <option key={edificio.id} value={edificio.id}>
                                    {edificio.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="button-group">
                        <button
                            className="btn-iniciar"
                            onClick={handleIniciarJornada}
                            disabled={!jornadadaData.persona_id || !jornadadaData.edificio_id}
                        >
                            ▶️ Iniciar Jornada
                        </button>

                        {jornadadaActiva && (
                            <button
                                className="btn-finalizar"
                                onClick={handleFinalizarJornada}
                            >
                                ⏹️ Finalizar Jornada
                            </button>
                        )}
                    </div>
                </div>

                {mensaje && (
                    <p className={`mensaje ${mensaje.includes("✅") ? "success" : "error"}`}>
                        {mensaje}
                    </p>
                )}

                {jornadadaActiva && (
                    <div className="jornada-info">
                        <h4>Jornada Activa</h4>
                        <p><strong>Fecha:</strong> {jornadadaActiva.fecha}</p>
                        <p><strong>Hora Inicio:</strong> {new Date(jornadadaActiva.hora_inicio).toLocaleTimeString()}</p>
                        <p><strong>Edificio ID:</strong> {jornadadaActiva.edificio_id}</p>
                    </div>
                )}
            </div>

            {registrosDiarios.length > 0 && (
                <div className="registros-section">
                    <h3>Registros del Día</h3>
                    <table className="registros-table">
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Hora Inicio</th>
                                <th>Hora Fin</th>
                                <th>Horas Trabajadas</th>
                            </tr>
                        </thead>
                        <tbody>
                            {registrosDiarios.map((registro) => (
                                <tr key={registro.id}>
                                    <td>{registro.fecha}</td>
                                    <td>{new Date(registro.hora_inicio).toLocaleTimeString()}</td>
                                    <td>{registro.hora_fin ? new Date(registro.hora_fin).toLocaleTimeString() : "-"}</td>
                                    <td>{registro.horas_totales || "-"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default RegistroTrabajo;
