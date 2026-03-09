import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts";

import { obtenerDiasTrabajados, getAllDiasTrabajo } from "../../../redux/action/registroDiaTrabajoActions";
import {
    generarLiquidacion,
    getLiquidaciones,
    pagarLiquidacion,
} from "../../../redux/action/liquidacionAction";
import { listAllPersonal } from "../../../redux/action/personalAction";

import "./AsignarHorario.css";

const ListaDiasTrabajo = () => {

    const dispatch = useDispatch();

    const { registros = [] } = useSelector(state => state.diaTrabajoState);
    const { liquidaciones = [], loading: loadingLiquidaciones } = useSelector(state => state.liquidacionState);
    const listaDePersonal = useSelector(state => state.personalState.allPersonal) || [];

    const [vista, setVista] = useState("dashboard");
    const [personaId, setPersonaId] = useState("");
    const [fechaFiltro, setFechaFiltro] = useState(new Date().toISOString().slice(0, 7));
    const [precioDia, setPrecioDia] = useState("");
    const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());


    useEffect(() => {
        dispatch(getLiquidaciones());
        dispatch(listAllPersonal());
        dispatch(getAllDiasTrabajo());
    }, [dispatch]);

    useEffect(() => {
        if (personaId && fechaFiltro) {
            const [anio, mes] = fechaFiltro.split("-");
            dispatch(obtenerDiasTrabajados(Number(personaId), Number(anio), Number(mes)));
        }
    }, [personaId, fechaFiltro, dispatch]);

    const totalDiasEmpleado = registros.length;
    const totalEstimado = totalDiasEmpleado * Number(precioDia || 0);

    const marcarDiaTrabajado = ({ date, view }) => {
        if (view !== "month") return null;

        const trabajado = registros.some(r => {
            const fecha = new Date(r.fecha);
            return fecha.toDateString() === date.toDateString();
        });

        return trabajado ? "dia-trabajado" : null;
    };

    const handleGenerarLiquidacion = async () => {
        if (!personaId || !precioDia)
            return alert("Complete todos los campos");

        const [anio, mes] = fechaFiltro.split("-");

        const response = await dispatch(
            generarLiquidacion({
                persona_id: Number(personaId),
                mes: Number(mes),
                anio: Number(anio),
                precio_dia: Number(precioDia)
            })
        );

        if (response) {
            dispatch(getLiquidaciones());
            alert("Liquidación generada correctamente");
        } else {
            alert("Error al generar liquidación");
        }
    };

    const handlePagar = (id) => {
        dispatch(pagarLiquidacion(id));
    };

    // ✅ DATA DEL GRÁFICO MEJORADA
    const dataGrafico = useMemo(() => {
        return liquidaciones
            .filter(l => personaId ? l.persona_id === Number(personaId) : true)
            .sort((a, b) => new Date(a.anio, a.mes - 1) - new Date(b.anio, b.mes - 1))
            .map(l => ({
                mes: `${l.mes}/${l.anio}`,
                total: l.total
            }));
    }, [liquidaciones, personaId]);

    const totalHistorico = useMemo(() => {
        return dataGrafico.reduce((acc, l) => acc + l.total, 0);
    }, [dataGrafico]);

    return (
        <div className="admin-container">

            <div className="tabs">
                <button
                    className={vista === "dashboard" ? "active" : ""}
                    onClick={() => setVista("dashboard")}
                >
                    Dashboard
                </button>
                <button
                    className={vista === "liquidaciones" ? "active" : ""}
                    onClick={() => setVista("liquidaciones")}
                >
                    Liquidaciones
                </button>
            </div>

            {vista === "dashboard" && (
                <>
                    <div className="filtros">

                        <select value={personaId} onChange={(e) => setPersonaId(e.target.value)}>
                            <option value="">Seleccionar empleado</option>
                            {listaDePersonal.map((persona) => (
                                <option key={persona.id} value={persona.id}>
                                    {persona.nombre} - {persona.email}
                                </option>
                            ))}
                        </select>

                        <input
                            type="month"
                            value={fechaFiltro}
                            onChange={(e) => setFechaFiltro(e.target.value)}
                        />

                        <input
                            type="number"
                            placeholder="Precio por día"
                            value={precioDia}
                            onChange={(e) => setPrecioDia(e.target.value)}
                        />

                    </div>

                    <div className="dashboard-grid">

                        <div className="cards">
                            <div className="card">
                                <h4>Días trabajados</h4>
                                <p>{totalDiasEmpleado}</p>
                            </div>

                            <div className="card total">
                                <h4>Total estimado</h4>
                                <p>${totalEstimado}</p>
                            </div>

                            <div className="card total">
                                <h4>Total histórico</h4>
                                <p>${totalHistorico}</p>
                            </div>
                        </div>

                        {personaId && (
                            <div className="calendar-box">
                                <Calendar
                                    onChange={setFechaSeleccionada}
                                    value={fechaSeleccionada}
                                    tileClassName={marcarDiaTrabajado}
                                />
                            </div>
                        )}
                    </div>

                    <div className="grafico-box">
                        <h3>Liquidación mensual</h3>

                        {loadingLiquidaciones && <p>Cargando gráfico...</p>}

                        {!loadingLiquidaciones && dataGrafico.length === 0 && (
                            <p>No hay datos para mostrar</p>
                        )}

                        {!loadingLiquidaciones && dataGrafico.length > 0 && (
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={dataGrafico}>
                                    <XAxis dataKey="mes" />
                                    <YAxis />
                                    <Tooltip formatter={(v) => `$${v}`} />
                                    <Bar
                                        dataKey="total"
                                        label={{ position: "top" }}
                                        animationDuration={1000}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        )}
                    </div>

                    <button
                        className="btn-generar"
                        onClick={handleGenerarLiquidacion}
                    >
                        Generar Liquidación
                    </button>
                </>
            )}

            {vista === "liquidaciones" && (
                <div className="tabla-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Persona</th>
                                <th>Mes</th>
                                <th>Total</th>
                                <th>Estado</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {liquidaciones.map(l => (
                                <tr key={l.id}>
                                    <td>{l.persona_id}</td>
                                    <td>{l.Persona?.nombre}</td>
                                    <td>{l.mes}/{l.anio}</td>
                                    <td>${l.total}</td>
                                    <td className={
                                        l.estado === "pagado"
                                            ? "estado-pagado"
                                            : "estado-pendiente"
                                    }>
                                        {l.estado}
                                    </td>
                                    <td>
                                        {l.estado === "pendiente" && (
                                            <button
                                                className="btn-pagar"
                                                onClick={() => handlePagar(l.id)}
                                            >
                                                Marcar Pagado
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

        </div>
    );
};

export default ListaDiasTrabajo;