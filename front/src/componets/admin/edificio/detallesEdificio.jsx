import { useDispatch, useSelector } from "react-redux";
import { detalleEdificio } from "../../../redux/action/edificioAction";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./detallesEdificio.css";

const DetalleEdificio = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const detalles = useSelector(
        (state) => state.edificioState.detalleEdificio
    );

    useEffect(() => {
        dispatch(detalleEdificio(id));
    }, [dispatch, id]);

    if (!detalles?.edificio) {
        return <p className="loading">Cargando edificio...</p>;
    }

    const { edificio, personal, productos, tareas, horasTrabajadas } = detalles;

    return (
        <div className="detalle-edificio">

            {/* HEADER */}
            <header className="edificio-header">
                <div>
                    <h1>{edificio.nombre}</h1>
                    <p>{edificio.direccion}</p>
                    <small>Creado: {new Date(edificio.created_at).toLocaleDateString()}</small>
                </div>

                <span className={`estado ${edificio.activo ? "activo" : "inactivo"}`}>
                    {edificio.activo ? "Activo" : "Inactivo"}
                </span>
            </header>

            {/* INFO GENERAL */}
            <section className="info-grid">
                <div><strong>Frecuencia:</strong> {edificio.frecuencia_limpieza}</div>
                <div><strong>Duración:</strong> {edificio.duracion_estimada_minutos} min</div>
                <div><strong>Litros estimados:</strong> {edificio.litros_estimados} L</div>
                <div><strong>Pisos:</strong> {edificio.cantidad_pisos}</div>
                <div><strong>m²:</strong> {edificio.metros_cuadrados || "No definido"}</div>
                <div><strong>Horario preferido:</strong> {edificio.horario_preferido || "No definido"}</div>
            </section>

            {/* CONTACTO */}
            <section className="section">
                <h2>📞 Contacto</h2>
                <div className="cards">
                    <div className="card-item">
                        <strong>Encargado</strong>
                        <p>{edificio.encargado}</p>
                    </div>
                    <div className="card-item">
                        <strong>Teléfono</strong>
                        <p>{edificio.telefono_contacto}</p>
                    </div>
                    <div className="card-item">
                        <strong>Email</strong>
                        <p>{edificio.email_contacto}</p>
                    </div>
                </div>
            </section>

            {/* OBSERVACIONES */}
            <section className="section">
                <h2>📝 Observaciones</h2>
                <div className="observaciones-box">
                    {edificio.observaciones || "Sin observaciones"}
                </div>
            </section>

            {/* PERSONAL */}
            <section className="section">
                <h2>👥 Personal asignado</h2>
                {personal.length ? (
                    <div className="cards">
                        {personal.map((p) => (
                            <div className="card-item" key={p.persona_id}>
                                <strong>{p.Persona.nombre} {p.Persona.apellido}</strong>
                                <span>{p.Persona.rol}</span>
                                <small>Día: {p.dia_semana}</small>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="empty">Sin personal asignado</p>
                )}
            </section>

            {/* PRODUCTOS */}
            <section className="section">
                <h2>🧴 Productos</h2>
                {productos.length ? (
                    <div className="cards">
                        {productos.map((p) => {
                            const bajoStock =
                                Number(p.cantidad_actual) <= Number(p.cantidad_minima);

                            return (
                                <div
                                    key={p.id}
                                    className={`card-item ${bajoStock ? "alerta" : ""}`}
                                >
                                    <strong>{p.Producto.nombre}</strong>
                                    <small>
                                        {p.cantidad_actual} / mín {p.cantidad_minima}{" "}
                                        {p.Producto.unidad}
                                    </small>
                                    {bajoStock && <span className="warning">⚠ Stock bajo</span>}
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <p className="empty">Sin productos asignados</p>
                )}
            </section>

            {/* TAREAS */}
            <section className="section">
                <h2>🧹 Tareas</h2>
                {tareas.length ? (
                    <ul className="list">
                        {tareas.map((t) => (
                            <li key={t.id}>
                                {t.Tarea.nombre} {t.Tarea.prioritaria && "⭐"}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="empty">No hay tareas registradas</p>
                )}
            </section>

        </div>
    );
};

export default DetalleEdificio;