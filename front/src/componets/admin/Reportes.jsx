import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getResumenGeneral,
    getHorasTrabajadas,
    getAusencias,
    getIncidencias,
    getEstadisticas
} from "../../redux/action/adminAction";
import { listReport, updateEstadoReporte } from "../../redux/action/reportAction";
import "./Reportes.css";

const Reportes = () => {

    const dispatch = useDispatch();

    const [filtro, setFiltro] = useState("resumen");
    const [filtroFecha, setFiltroFecha] = useState("todos");

    const allReport = useSelector((state) => state.reportState.allReport);

    const {
        resumenGeneral,
        horasTrabajadas,
        ausencias,
        incidencias
    } = useSelector((state) => state.adminState);

    const stockProductos = allReport?.filter(r => r.tipo === "producto") || [];

    const totalStockAlertas = stockProductos?.filter(r => r.estado !== "resuelto").length;

    useEffect(() => {
        dispatch(getResumenGeneral());
        dispatch(getHorasTrabajadas());
        dispatch(getAusencias());
        dispatch(getIncidencias());
        dispatch(getEstadisticas());
        dispatch(listReport());
    }, [dispatch]);

    const handleResolver = (id) => {
        dispatch(updateEstadoReporte(id, "resuelto"));
    };

    const filtrarPorFecha = (reportes = []) => {

        if (filtroFecha === "todos") return reportes;

        const hoy = new Date();

        return reportes.filter(r => {

            const fechaReporte = new Date(r.created_at);

            const diffTime = hoy - fechaReporte;

            const diffDays = diffTime / (1000 * 60 * 60 * 24);

            if (filtroFecha === "dia") return diffDays <= 1;
            if (filtroFecha === "semana") return diffDays <= 7;
            if (filtroFecha === "mes") return diffDays <= 30;

            return true;
        });
    };

    const ticketsFiltrados = filtrarPorFecha(allReport);
    const stockFiltrado = filtrarPorFecha(stockProductos);

    return (
        <div className="reportes-container">

            <h1>📊 Reportes y Estadísticas</h1>

            {/* FILTROS PRINCIPALES */}

            <div className="filtro-buttons">

                <button
                    className={filtro === "resumen" ? "active" : ""}
                    onClick={() => setFiltro("resumen")}
                >
                    Resumen
                </button>

                {/* <button
                    className={filtro === "ausencias" ? "active" : ""}
                    onClick={() => setFiltro("ausencias")}
                >
                    Ausencias
                </button> */}

                <button
                    className={filtro === "tickets" ? "active" : ""}
                    onClick={() => setFiltro("tickets")}
                >
                    🧾 Tickets
                </button>

                <button
                    className={filtro === "stock" ? "active" : ""}
                    onClick={() => setFiltro("stock")}
                >
                    📦 Stock Bajo ({totalStockAlertas})
                </button>

            </div>

            {/* FILTRO POR FECHA */}

            {(filtro === "tickets" || filtro === "stock") && (

                <div className="filtro-fecha">

                    <button
                        onClick={() => setFiltroFecha("todos")}
                        className={filtroFecha === "todos" ? "active" : ""}
                    >
                        Todos
                    </button>

                    <button
                        onClick={() => setFiltroFecha("dia")}
                        className={filtroFecha === "dia" ? "active" : ""}
                    >
                        Hoy
                    </button>

                    <button
                        onClick={() => setFiltroFecha("semana")}
                        className={filtroFecha === "semana" ? "active" : ""}
                    >
                        Semana
                    </button>

                    <button
                        onClick={() => setFiltroFecha("mes")}
                        className={filtroFecha === "mes" ? "active" : ""}
                    >
                        Mes
                    </button>

                </div>

            )}

            {/* RESUMEN */}

            {filtro === "resumen" && resumenGeneral && (

                <div className="resumen-section">

                    <div className="stats-grid">

                        <div className="stat-card">
                            <h3>🏢 Edificios</h3>
                            <p>{resumenGeneral.total_edificios || 0}</p>
                        </div>

                        <div className="stat-card">
                            <h3>👥 Personal</h3>
                            <p>{resumenGeneral.total_personal || 0}</p>
                        </div>

                        <div className="stat-card">
                            <h3>⚠️ Incidencias</h3>
                            <p>{resumenGeneral.total_incidencias || 0}</p>
                        </div>

                    </div>

                </div>

            )}

            {/* AUSENCIAS */}

            {filtro === "ausencias" && ausencias?.length > 0 && (

                <table className="reportes-table">

                    <thead>
                        <tr>
                            <th>Empleado</th>
                            <th>Edificio</th>
                            <th>Día</th>
                        </tr>
                    </thead>

                    <tbody>

                        {ausencias.map((a) => (
                            <tr key={a.id || `${a.nombre}-${a.apellido}-${a.dia_semana}`}>
                                <td>{a.nombre} {a.apellido}</td>
                                <td>{a.edificio}</td>
                                <td>{a.dia_semana}</td>
                            </tr>
                        ))}

                    </tbody>

                </table>

            )}

            {/* TICKETS */}

            {filtro === "tickets" && ticketsFiltrados?.length > 0 && (

                <table className="reportes-table">

                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Fecha</th>
                            <th>Tipo</th>
                            <th>Descripción</th>
                            <th>Estado</th>
                        </tr>
                    </thead>

                    <tbody>

                        {ticketsFiltrados.map((r) => (

                            <tr key={r.id}>

                                <td>#{r.id}</td>

                                <td>{new Date(r.created_at).toLocaleDateString()}</td>

                                <td>{r.tipo}</td>

                                <td>{r.descripcion}</td>

                                <td>

                                    <span className={`estado ${r.estado}`}>
                                        {r.estado}
                                    </span>

                                    {r.estado !== "resuelto" && (

                                        <button
                                            className="btn-resolver"
                                            onClick={() => handleResolver(r.id)}
                                        >
                                            ✅ Resolver
                                        </button>

                                    )}

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            )}

            {/* STOCK BAJO */}

            {filtro === "stock" && stockFiltrado?.length > 0 && (

                <table className="reportes-table">

                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Fecha</th>
                            <th>Edificio</th>
                            <th>Descripción</th>
                            <th>Estado</th>
                        </tr>
                    </thead>

                    <tbody>

                        {stockFiltrado.map((r) => (

                            <tr key={r.id}>

                                <td>#{r.id}</td>

                                <td>{new Date(r.created_at).toLocaleDateString()}</td>

                                <td>{r.Edificio?.nombre || "No asignado"}</td>

                                <td>{r.descripcion}</td>

                                <td>

                                    <span className={`estado ${r.estado}`}>
                                        {r.estado}
                                    </span>

                                    {r.estado !== "resuelto" && (

                                        <button
                                            className="btn-resolver"
                                            onClick={() => handleResolver(r.id)}
                                        >
                                            ✅ Resolver
                                        </button>

                                    )}

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            )}

            {filtro === "tickets" && ticketsFiltrados?.length === 0 && (
                <p>No hay reportes</p>
            )}

            {filtro === "stock" && stockFiltrado?.length === 0 && (
                <p>No hay alertas de stock</p>
            )}

        </div>
    );
};

export default Reportes;