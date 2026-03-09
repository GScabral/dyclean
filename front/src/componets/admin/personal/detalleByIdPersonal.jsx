import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { detallePersona } from "../../../redux/action/personalAction";
import "./detalleByIdPersonal.css"

const DetallePersona = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const detalle = useSelector(
        (state) => state.personalState.detallePersona
    );

    useEffect(() => {
        dispatch(detallePersona(id));
    }, [dispatch, id]);

    if (!detalle?.data) {
        return <p className="loading">Cargando datos de la persona...</p>;
    }

    const persona = detalle.data;

    return (
        <div className="detalle-persona">
            {/* HEADER */}
            <div className="detalle-header">
                <h1>{persona.nombre} {persona.apellido}</h1>
                <span className={`rol-badge ${persona.rol}`}>
                    {persona.rol}
                </span>
            </div>

            {/* INFO */}
            <div className="info-grid">
                <div className="info-card">
                    <h4>Email</h4>
                    <p>{persona.email}</p>
                </div>

                <div className="info-card">
                    <h4>Teléfono</h4>
                    <p>{persona.telefono}</p>
                </div>

                <div className="info-card">
                    <h4>Cédula</h4>
                    <p>{persona.cedula}</p>
                </div>

                <div className="info-card">
                    <h4>Estado</h4>
                    <p className={`estado ${persona.activo ? "activo" : "inactivo"}`}>
                        {persona.activo ? "Activo" : "Inactivo"}
                    </p>
                </div>
            </div>

            {/* EDIFICIOS */}
            <div className="section">
                <h2>🏢 Edificios asignados</h2>

                {persona.Edificios && persona.Edificios.length > 0 ? (
                    <div className="edificios-list">
                        {persona.Edificios.map((edificio) => (
                            <div key={edificio.id} className="edificio-card">
                                <strong>{edificio.nombre}</strong>
                                <span>Día: {edificio.PersonaEdificio.day_semana}</span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No tiene edificios asignados</p>
                )}
            </div>
        </div>
    );
};

export default DetallePersona;
