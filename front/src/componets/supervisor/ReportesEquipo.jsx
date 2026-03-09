import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { listReport, updateEstadoReporte } from "../../redux/action/reportAction";
import HeaderSupervisor from "./HeaderSupervisor";
import "./ReportesEquipo.css";

const ReportesEquipo = () => {
    const dispatch = useDispatch();
    const [filtroFecha, setFiltroFecha] = useState("todos");

    const allReport = useSelector((state) => state.reportState.allReport) || [];


    useEffect(() => {
        dispatch(listReport());
    }, [dispatch]);

    const filtrarPorFecha = (reportes) => {
        const lista = Array.isArray(reportes) ? reportes : [];
        if (filtroFecha === "todos") return lista;

        const hoy = new Date();

        return lista.filter(r => {
            const fechaReporte = new Date(r.created_at || r.createdAt);
            const diffTime = hoy - fechaReporte;
            const diffDays = diffTime / (1000 * 60 * 60 * 24);

            if (filtroFecha === "dia") return diffDays <= 1;
            if (filtroFecha === "semana") return diffDays <= 7;
            if (filtroFecha === "mes") return diffDays <= 30;

            return true;
        });
    };

    const handleActualizarEstado = (id, nuevoEstado) => {
        dispatch(updateEstadoReporte(id, nuevoEstado));
    };

    const reportesFiltrados = filtrarPorFecha(allReport);

    return (
        <>
            <HeaderSupervisor />

            <div className="reportes-container">
                <h1>📊 Reportes del Equipo</h1>

                {/* FILTRO FECHA */}
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

                {/* TABLA DE REPORTES */}
                {reportesFiltrados?.length > 0 ? (
                    <table className="reportes-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Fecha</th>
                                <th>Tipo</th>
                                <th>Descripción</th>
                                <th>Edificio</th>
                                <th>Empleado</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reportesFiltrados.map((r) => (
                                <tr key={r.id}>
                                    <td>#{r.id}</td>
                                    <td>{new Date(r.created_at || r.createdAt).toLocaleDateString()}</td>
                                    <td>{r.tipo || r.tipo_reporte || "N/A"}</td>
                                    <td>{r.descripcion}</td>
                                    <td>{r.Edificio?.nombre}</td>
                                    <td>{r.Persona?.nombre} {r.Persona?.apellido}</td>
                                    <td>
                                        <span className={`estado ${r.estado}`}>
                                            {r.estado}
                                        </span>
                                    </td>
                                    <td>
                                        {r.estado !== "resuelto" && (
                                            <div className="btn-acciones">
                                                {r.estado !== "aprobado" && (
                                                    <button
                                                        className="btn-aprobar"
                                                        onClick={() => handleActualizarEstado(r.id, "aprobado")}
                                                    >
                                                        ✅ Aprobar
                                                    </button>
                                                )}
                                                {r.estado !== "rechazado" && (
                                                    <button
                                                        className="btn-rechazar"
                                                        onClick={() => handleActualizarEstado(r.id, "rechazado")}
                                                    >
                                                        ❌ Rechazar
                                                    </button>
                                                )}
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="no-data">No hay reportes para mostrar</p>
                )}
            </div>
        </>
    );
};

export default ReportesEquipo;
