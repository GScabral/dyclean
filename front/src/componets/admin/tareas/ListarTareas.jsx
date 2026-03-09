import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listarTareasActivas, marcarTareaPrioritaria, editarTarea } from "../../../redux/action/tareaAction";
import "./listarTareas.css";

const ListarTareas = () => {
    const dispatch = useDispatch();
    const tareas = useSelector((state) => state.tareaState.allTareas);
    const [editando, setEditando] = useState(null);
    const [formEdit, setFormEdit] = useState({});

    useEffect(() => {
        dispatch(listarTareasActivas());
    }, [dispatch]);

    const handleTogglePrioritaria = async (tareaId, estadoActual) => {
        await dispatch(marcarTareaPrioritaria(tareaId, !estadoActual));
        dispatch(listarTareasActivas());
    };

    const handleEditClick = (tarea) => {
        setEditando(tarea.id);
        setFormEdit({
            nombre: tarea.nombre,
            descripcion: tarea.descripcion,
            prioritaria: tarea.prioritaria,
            activo: tarea.activo
        });
    };

    const handleGuardarEdicion = async (tareaId) => {
        await dispatch(editarTarea(tareaId, formEdit));
        setEditando(null);
        dispatch(listarTareasActivas());
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormEdit({
            ...formEdit,
            [name]: type === "checkbox" ? checked : value
        });
    };

    if (!tareas || tareas.length === 0) {
        return <div className="tareas-list"><p>No hay tareas registradas</p></div>;
    }

    return (
        <div className="tareas-list">
            <h2>Lista de Tareas Activas</h2>
            
            <table className="tareas-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Prioritaria</th>
                        <th>Activa</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {tareas.map((tarea) => (
                        <tr key={tarea.id} className={tarea.prioritaria ? "prioritaria" : ""}>
                            <td>{tarea.id}</td>
                            <td>
                                {editando === tarea.id ? (
                                    <input
                                        type="text"
                                        name="nombre"
                                        value={formEdit.nombre}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    tarea.nombre
                                )}
                            </td>
                            <td>
                                {editando === tarea.id ? (
                                    <textarea
                                        name="descripcion"
                                        value={formEdit.descripcion}
                                        onChange={handleChange}
                                        rows="2"
                                    ></textarea>
                                ) : (
                                    tarea.descripcion
                                )}
                            </td>
                            <td>
                                <button
                                    className={`btn-prioritaria ${tarea.prioritaria ? "active" : ""}`}
                                    onClick={() => handleTogglePrioritaria(tarea.id, tarea.prioritaria)}
                                >
                                    {tarea.prioritaria ? "⭐" : "☆"}
                                </button>
                            </td>
                            <td>{tarea.activo ? "✅" : "❌"}</td>
                            <td>
                                {editando === tarea.id ? (
                                    <>
                                        <button
                                            className="btn-guardar"
                                            onClick={() => handleGuardarEdicion(tarea.id)}
                                        >
                                            Guardar
                                        </button>
                                        <button
                                            className="btn-cancelar"
                                            onClick={() => setEditando(null)}
                                        >
                                            Cancelar
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        className="btn-editar"
                                        onClick={() => handleEditClick(tarea)}
                                    >
                                        ✏️
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListarTareas;
