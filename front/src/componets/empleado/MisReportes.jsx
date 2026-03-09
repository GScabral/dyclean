import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { calcularHorasTrabajadas } from "../../redux/action/registroTrabajoAction";
import "./MisReportes.css";

const MisReportes = () => {
    const dispatch = useDispatch();
    let usuario = null;
    try { usuario = JSON.parse(localStorage.getItem("usuario")); } catch (e) { usuario = null; }
    const [personaId] = useState(usuario?.id ?? 1);
    const [fechaInicio, setFechaInicio] = useState(new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0]);
    const [fechaFin, setFechaFin] = useState(new Date().toISOString().split('T')[0]);

    const horasTrabajadas = useSelector((state) => state.registroTrabajoState.horasTrabajadas);

    useEffect(() => {
        dispatch(calcularHorasTrabajadas({ persona_id: personaId, fecha_inicio: fechaInicio, fecha_fin: fechaFin }));
    }, [dispatch, personaId, fechaInicio, fechaFin]);

    return (
        <div className="mis-reportes">
            <h2>Mis Reportes</h2>

            <div className="reportes-container">
                <div className="filtros">
                    <h3>Filtros</h3>
                    <div className="filtro-grupo">
                        <label>Fecha Inicio</label>
                        <input
                            type="date"
                            value={fechaInicio}
                            onChange={(e) => setFechaInicio(e.target.value)}
                        />
                    </div>
                    <div className="filtro-grupo">
                        <label>Fecha Fin</label>
                        <input
                            type="date"
                            value={fechaFin}
                            onChange={(e) => setFechaFin(e.target.value)}
                        />
                    </div>
                </div>

                <div className="reportes-stats">
                    <div className="stat-card">
                        <div className="stat-icon">⏰</div>
                        <div className="stat-content">
                            <h4>Total Horas</h4>
                            <p className="stat-value">{horasTrabajadas?.totalHoras || 0}h</p>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">📅</div>
                        <div className="stat-content">
                            <h4>Días Trabajados</h4>
                            <p className="stat-value">{horasTrabajadas?.diasTrabajados || 0}</p>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">📊</div>
                        <div className="stat-content">
                            <h4>Promedio Diario</h4>
                            <p className="stat-value">{horasTrabajadas?.promedioDiario || 0}h</p>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">⚠️</div>
                        <div className="stat-content">
                            <h4>Faltas</h4>
                            <p className="stat-value">{horasTrabajadas?.ausencias || 0}</p>
                        </div>
                    </div>
                </div>

                <div className="detalle-reportes">
                    <h3>Detalle por Semana</h3>
                    <table className="reportes-table">
                        <thead>
                            <tr>
                                <th>Semana</th>
                                <th>Horas</th>
                                <th>Días</th>
                                <th>Promedio</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Semana 1</td>
                                <td>40h</td>
                                <td>5</td>
                                <td>8h</td>
                            </tr>
                            <tr>
                                <td>Semana 2</td>
                                <td>38h</td>
                                <td>5</td>
                                <td>7.6h</td>
                            </tr>
                            <tr>
                                <td>Semana 3</td>
                                <td>40h</td>
                                <td>5</td>
                                <td>8h</td>
                            </tr>
                            <tr>
                                <td>Semana 4</td>
                                <td>36h</td>
                                <td>4</td>
                                <td>9h</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MisReportes;
