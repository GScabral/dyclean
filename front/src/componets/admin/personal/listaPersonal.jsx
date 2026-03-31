import { useEffect, useState } from "react";
import { listAllPersonal } from "../../../redux/action/personalAction";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listaEdificio } from "../../../redux/action/edificioAction";
import { quitarAsignacionPersonaEdificio, asignarPersonaEdificio } from "../../../redux/action/personaEdifiAction";
import "./listaPersonal.css";

const ListPersonal = () => {


    const dispatch = useDispatch();
    const listaDePersonal = useSelector((state) => state.personalState.allPersonal);
    const edificios = useSelector((state) => state.edificioState.allEdificios);
    const [personaSeleccionada, setPersonaSeleccionada] = useState(null);
    const [showReasignar, setShowReasignar] = useState(false);
    const [nuevoEdificio, setNuevoEdificio] = useState("");
    const [nuevosDias, setNuevosDias] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

    useEffect(() => {
        dispatch(listAllPersonal());
        dispatch(listaEdificio());
    }, [dispatch]);

    const handleReasignar = (persona) => {
        setPersonaSeleccionada(persona);
        setShowReasignar(true);
        setNuevoEdificio("");
        setNuevosDias([]);
        setError("");
        setSuccess("");
    };

    const handleSubmitReasignar = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");
        try {
            // Solo reasignamos el primer edificio asignado (puedes mejorar esto para elegir cuál si hay varios)
            // Buscar la asignación actual que tenga PersonaEdificio y un id válido
            const asignacionActual = (personaSeleccionada.Edificios || []).find(ed => ed.PersonaEdificio && ed.PersonaEdificio.id);
            if (!asignacionActual || !asignacionActual.PersonaEdificio || !asignacionActual.PersonaEdificio.id) {
                setError("No se pudo obtener el id de la asignación actual");
                setLoading(false);
                return;
            }
            const personaEdificioId = asignacionActual.PersonaEdificio.id;
            // 1. Quitar asignación actual
            await dispatch(quitarAsignacionPersonaEdificio(personaEdificioId));
            // 2. Asignar nueva con múltiples días
            const data = {
                persona_id: personaSeleccionada.id,
                edificio_id: nuevoEdificio,
                dias_semana: nuevosDias,
                activo: true
            };
            await dispatch(asignarPersonaEdificio(data));
            setSuccess("Reasignación exitosa");
            setShowReasignar(false);
            setPersonaSeleccionada(null);
            dispatch(listAllPersonal());
        } catch (err) {
            setError("Error al reasignar");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="personal-container">
            <h2>Personal registrado</h2>

            {listaDePersonal && listaDePersonal.length > 0 ? (
                <div className="personal-grid">
                    {listaDePersonal.map((persona) => (
                        <div className="personal-card" key={persona.id}>
                            <Link to={`/detallePersona/${persona.id}`}>
                                <div className="personal-header">
                                    <h3>{persona.nombre} {persona.apellido}</h3>
                                    <span className={`rol ${persona.rol}`}>
                                        {persona.rol}
                                    </span>
                                </div>
                            </Link>

                            <p><strong>Email:</strong> {persona.email}</p>
                            <p><strong>Teléfono:</strong> {persona.telefono}</p>

                            <p>
                                <strong>Estado:</strong>{" "}
                                <span className={persona.activo ? "activo" : "inactivo"}>
                                    {persona.activo ? "Activo" : "Inactivo"}
                                </span>
                            </p>

                            <div className="edificios">
                                <strong>Edificio asignado:</strong>
                                {persona.Edificios && persona.Edificios.length > 0 ? (
                                    persona.Edificios.map((ed) => (
                                        <div key={ed.id} className="edificio">
                                            🏢 {ed.nombre}
                                            <span>{ed.direccion}</span>
                                        </div>
                                    ))
                                ) : (
                                    <p className="sin-edificio">Sin asignar</p>
                                )}
                            </div>
                            {persona.Edificios && persona.Edificios.length > 0 && (
                                <button
                                    className="btn-reasignar"
                                    style={{ marginTop: '10px', background: '#1976d2', color: 'white', border: 'none', borderRadius: '4px', padding: '6px 12px', cursor: 'pointer' }}
                                    onClick={() => handleReasignar(persona)}
                                >
                                    Reasignar edificio
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <p>No hay personal registrado</p>
            )}
            {/* MODAL DE REASIGNACIÓN */}
            {showReasignar && personaSeleccionada && (
                <div className="modal-reasignar" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <form onSubmit={handleSubmitReasignar} style={{ background: 'white', padding: 24, borderRadius: 8, minWidth: 320, boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
                        <h3>Reasignar edificio a {personaSeleccionada.nombre} {personaSeleccionada.apellido}</h3>
                        <label>Nuevo edificio:</label>
                        <select value={nuevoEdificio} onChange={e => setNuevoEdificio(e.target.value)} required style={{ width: '100%', marginBottom: 12 }}>
                            <option value="">Seleccionar edificio</option>
                            {edificios.filter(e => !personaSeleccionada.Edificios.some(ed => ed.id === e.id)).map(e => (
                                <option key={e.id} value={e.id}>{e.nombre}</option>
                            ))}
                        </select>
                        <label>Días de trabajo:</label>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
                            {diasSemana.map(dia => {
                                const seleccionado = nuevosDias.includes(dia);
                                return (
                                    <label
                                        key={dia}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 4,
                                            background: seleccionado ? '#1976d2' : 'transparent',
                                            color: seleccionado ? 'white' : 'inherit',
                                            borderRadius: 4,
                                            padding: '2px 8px',
                                            cursor: 'pointer',
                                            transition: 'background 0.2s'
                                        }}
                                    >
                                        <input
                                            type="checkbox"
                                            value={dia}
                                            checked={seleccionado}
                                            onChange={e => {
                                                if (e.target.checked) {
                                                    setNuevosDias(prev => [...prev, dia]);
                                                } else {
                                                    setNuevosDias(prev => prev.filter(d => d !== dia));
                                                }
                                            }}
                                            style={{ accentColor: seleccionado ? '#fff' : undefined }}
                                        />
                                        {dia}
                                    </label>
                                );
                            })}
                        </div>
                        {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
                        {success && <div style={{ color: 'green', marginBottom: 8 }}>{success}</div>}
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                            <button type="button" onClick={() => setShowReasignar(false)} style={{ background: '#aaa', color: 'white', border: 'none', borderRadius: 4, padding: '6px 12px' }}>Cancelar</button>
                            <button type="submit" disabled={loading} style={{ background: '#1976d2', color: 'white', border: 'none', borderRadius: 4, padding: '6px 12px' }}>Confirmar</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ListPersonal;
