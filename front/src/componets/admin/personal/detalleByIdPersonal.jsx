import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { detallePersona } from "../../../redux/action/personalAction";
import { eliminarAsignacionPersonaEdificio } from "../../../redux/action/personaEdifiAction";
import "./detalleByIdPersonal.css";

const DetallePersona = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const detalle = useSelector(
        (state) => state.personalState.detallePersona
    );

    useEffect(() => {
        if (id) {
            dispatch(detallePersona(id));
        }
    }, [dispatch, id]);

    if (!detalle?.data) {
        return (
            <div className="detalle-persona">
                <p className="loading">Cargando datos de la persona...</p>
            </div>
        );
    }

    const persona = detalle.data;

    return (
        <div className="detalle-persona">
            {/* HEADER */}
            <div className="detalle-header">
                <div>
                    <h1>
                        {persona.nombre || "Sin nombre"}{" "}
                        {persona.apellido || ""}
                    </h1>
                    <p className="subtitulo">
                        ID: {persona.id} • {persona.rol || "Sin rol"}
                    </p>
                </div>

                <span className={`rol-badge ${persona.rol || ""}`}>
                    {persona.rol || "Sin rol"}
                </span>
            </div>

            {/* INFORMACIÓN PRINCIPAL */}
            <div className="info-grid">
                <div className="info-card">
                    <h4>Email</h4>
                    <p>{persona.email || "No disponible"}</p>
                </div>

                <div className="info-card">
                    <h4>Teléfono</h4>
                    <p>{persona.telefono || "No disponible"}</p>
                </div>

                <div className="info-card">
                    <h4>Cédula</h4>
                    <p>{persona.cedula || "No disponible"}</p>
                </div>

                <div className="info-card">
                    <h4>Estado</h4>
                    <p
                        className={`estado ${persona.activo ? "activo" : "inactivo"
                            }`}
                    >
                        {persona.activo ? "Activo" : "Inactivo"}
                    </p>
                </div>

                <div className="info-card">
                    <h4>Fecha de creación</h4>
                    <p>
                        {persona.created_at
                            ? new Date(persona.created_at).toLocaleDateString(
                                "es-ES",
                                {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                }
                            )
                            : "No disponible"}
                    </p>
                </div>
            </div>

            {/* EDIFICIOS */}
            <div className="section">
                <h2>🏢 Edificios asignados</h2>

                {persona.Edificios?.length > 0 ? (
                    <div className="edificios-list">
                        {persona.Edificios.map((edificio) => (
                            <div key={edificio.id} className="edificio-card">
                                <div className="edificio-header">
                                    <h3>{edificio.nombre}</h3>
                                </div>

                                <div className="edificio-info">
                                    <p>
                                        <strong>Dirección:</strong> {edificio.direccion}
                                    </p>

                                    {edificio.PersonaEdificio && (
                                        <div className="dias-asignados">
                                            <p>
                                                <strong>Día asignado:</strong>{" "}
                                                {edificio.PersonaEdificio.dia_semana}
                                            </p>
                                            <p>
                                                <strong>Estado de asignación:</strong>{" "}
                                                {edificio.PersonaEdificio.activo
                                                    ? "Activa"
                                                    : "Inactiva"}
                                            </p>
                                            <button
                                                style={{
                                                    marginTop: 8,
                                                    background: "#d32f2f",
                                                    color: "white",
                                                    border: "none",
                                                    borderRadius: 4,
                                                    padding: "4px 8px",
                                                    cursor: "pointer"
                                                }}
                                                onClick={async () => {
                                                    if (window.confirm("¿Eliminar asignación de este edificio?")) {
                                                        await dispatch(eliminarAsignacionPersonaEdificio(edificio.PersonaEdificio.id));
                                                        dispatch(detallePersona(persona.id));
                                                    }
                                                }}
                                            >
                                                Eliminar asignación
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="sin-edificios">
                        <p>No tiene edificios asignados</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DetallePersona;