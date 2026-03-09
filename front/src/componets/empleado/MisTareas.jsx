import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    listarTareasPendientes,
    marcarTareaRealizada
} from "../../redux/action/tareaAction";
import "./MisTareas.css";

const MisTareas = () => {
    const dispatch = useDispatch();
    const tareas = useSelector((state) => state.tareaState.allTareas);

    useEffect(() => {
        dispatch(listarTareasPendientes());
    }, [dispatch]);

    const handleToggleCompletada = async (registroId) => {
        await dispatch(marcarTareaRealizada(registroId, true));
    };

    console.log("MisTareas tareas state", tareas);

    const lista = Array.isArray(tareas) ? tareas : [];

    if (lista.length === 0) {
        return (
            <div className="mis-tareas">
                <p>No tienes tareas asignadas</p>
            </div>
        );
    }

    return (
        <div className="mis-tareas">
            <h2>Mis Tareas</h2>

            <div className="tareas-grid">
                {lista.map((registro) => {
                    const tarea = registro.Tarea || registro;
                    if (!registro.id || !tarea?.id) return null;

                    return (
                        <div
                            key={registro.id}
                            className={`tarea-card ${
                                registro.realizada ? "completada" : ""
                            }`}
                        >
                            <div className="tarea-header">
                                <h3>{tarea.nombre}</h3>
                                {tarea.prioritaria && (
                                    <span className="badge-prioritaria">
                                        ⭐ Prioritaria
                                    </span>
                                )}
                            </div>

                            <p className="tarea-descripcion">
                                {tarea.descripcion}
                            </p>

                            <div className="tarea-footer">
                                <label className="checkbox-completada">
                                    <input
                                        type="checkbox"
                                        checked={registro.realizada || false}
                                        onChange={() =>
                                            handleToggleCompletada(registro.id)
                                        }
                                    />
                                    <span>
                                        {registro.realizada
                                            ? "✅ Completada"
                                            : "⭕ Pendiente"}
                                    </span>
                                </label>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MisTareas;