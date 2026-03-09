import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { obtenerHorarioPorPersona } from "../../redux/action/horarioAction";
import "./MiHorario.css";

const MiHorario = () => {
    const dispatch = useDispatch();
    const [personaId] = useState(1); // Placeholder

    const horarios = useSelector((state) => state.horarioState.horariosPorPersona);

    useEffect(() => {
        dispatch(obtenerHorarioPorPersona(personaId));
    }, [dispatch, personaId]);

    const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

    return (
        <div className="mi-horario">
            <h2>Mi Horario Laboral</h2>

            {horarios && horarios.length > 0 ? (
                <div className="horario-container">
                    <table className="horario-table">
                        <thead>
                            <tr>
                                <th>Hora Inicio</th>
                                <th>Hora Fin</th>
                                <th>Duración</th>
                            </tr>
                        </thead>
                        <tbody>
                            {horarios.map((horario) => {
                                const inicio = new Date(`2000-01-01 ${horario.hora_inicio}`);
                                const fin = new Date(`2000-01-01 ${horario.hora_fin}`);
                                const duracion = Math.round((fin - inicio) / (1000 * 60));

                                return (
                                    <tr key={horario.id}>
                                        <td>{horario.hora_inicio}</td>
                                        <td>{horario.hora_fin}</td>
                                        <td>{duracion} minutos</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="sin-horario">
                    <p>No tienes horarios asignados aún</p>
                </div>
            )}

            <div className="dias-trabajo">
                <h3>Días de Trabajo</h3>
                <div className="dias-grid">
                    {diasSemana.map((dia) => (
                        <div key={dia} className="dia-item">
                            <span>{dia}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MiHorario;
