import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { getAsistencias, getEmpleadosSupervisor } from "../../redux/action/supervisorAction";
import { selectAsistencias, selectEmpleados, selectLoadingAsistencias, selectErrorAsistencias } from "../../redux/selectors/supervisorSelectors";
import HeaderSupervisor from "./HeaderSupervisor";
import "./Asistencias.css";

const Asistencias = () => {

    const dispatch = useDispatch();

    const asistencias = useSelector(selectAsistencias) || [];
    const empleados = useSelector(selectEmpleados) || [];
    const loading = useSelector(selectLoadingAsistencias);
    const error = useSelector(selectErrorAsistencias);

    const [filtroEmpleado, setFiltroEmpleado] = useState("");
    const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());
    const [vista, setVista] = useState("calendario");

    useEffect(() => {
        dispatch(getAsistencias());
        dispatch(getEmpleadosSupervisor());
    }, [dispatch]);

    // FILTRAR EMPLEADOS (SIN ADMIN NI SUPERVISOR)
    const empleadosFiltrados = useMemo(() => {
        return empleados.filter(emp => {

            const rol =
                emp.rol ??
                emp.persona?.rol ??
                emp.Persona?.rol ??
                "";

            return rol === "empleado"; // solo empleados

        });
    }, [empleados]);

    // NORMALIZAR DATOS DE ASISTENCIAS
    const asistenciasNorm = useMemo(() => {
        return asistencias.map((a) => {

            const personaId =
                a.persona_id ??
                a.personaId ??
                a.Persona?.id ??
                null;

            const personaObj =
                a.Persona ??
                empleadosFiltrados.find(e => (e.persona_id ?? e.id) === personaId)?.persona ??
                null;

            return {
                id: a.id ?? null,
                fecha: a.fecha ?? null,
                horasTotales: a.horas_totales ?? a.horasTotales ?? 0,
                persona_id: personaId,
                Persona: personaObj
            };

        });
    }, [asistencias, empleadosFiltrados]);

    // FILTRO POR EMPLEADO
    const asistenciasEmpleado = filtroEmpleado
        ? asistenciasNorm.filter(a => a.persona_id === parseInt(filtroEmpleado))
        : asistenciasNorm;

    // MARCAR DÍAS TRABAJADOS EN CALENDARIO
    const marcarDiaTrabajado = ({ date, view }) => {

        if (view !== "month") return null;

        const trabajado = asistenciasEmpleado.some(a => {
            if (!a.fecha) return false;
            const fecha = new Date(a.fecha);
            return fecha.toDateString() === date.toDateString();
        });

        return trabajado ? "dia-trabajado" : null;
    };

    // MES ACTUAL
    const mesActual =
        fechaSeleccionada.getFullYear() +
        "-" +
        String(fechaSeleccionada.getMonth() + 1).padStart(2, "0");

    const asistenciasDelMes = asistenciasEmpleado.filter(a => {
        if (!a.fecha) return false;
        return a.fecha.substring(0, 7) === mesActual;
    });

    // ESTADÍSTICAS
    const totalDias = asistenciasDelMes.length;

    if (loading) return <div className="loading">Cargando asistencias...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <>
            <HeaderSupervisor />

            <div className="asistencias-container">

                <h1>📅 Registro de Asistencias</h1>

                {/* TABS */}

                <div className="tabs">

                    <button
                        className={vista === "calendario" ? "active" : ""}
                        onClick={() => setVista("calendario")}
                    >
                        Calendario
                    </button>

                    <button
                        className={vista === "tabla" ? "active" : ""}
                        onClick={() => setVista("tabla")}
                    >
                        Tabla
                    </button>

                </div>

                {/* FILTRO EMPLEADO */}

                <div className="filtros-asistencias">

                    <div className="filtro-grupo">

                        <label>Seleccionar Empleado:</label>

                        <select
                            value={filtroEmpleado}
                            onChange={(e) => setFiltroEmpleado(e.target.value)}
                            className="filtro-select"
                        >

                            <option value="">Todos los empleados</option>

                            {empleadosFiltrados.map((emp) => {

                                const id =
                                    emp.persona_id ??
                                    emp.id ??
                                    emp.persona?.id;

                                const nombre =
                                    emp.persona?.nombre ??
                                    emp.nombre ??
                                    `ID ${id}`;

                                const apellido =
                                    emp.persona?.apellido ??
                                    emp.apellido ??
                                    "";

                                return (
                                    <option key={id} value={id}>
                                        {nombre} {apellido}
                                    </option>
                                );

                            })}

                        </select>

                    </div>

                </div>

                {/* CALENDARIO */}

                {vista === "calendario" && filtroEmpleado && (

                    <div className="dashboard-asistencias">

                        <div className="cards-asistencias">

                            <div className="card-asistencia">
                                <h4>Días Asistidos</h4>
                                <p className="numero">{totalDias}</p>
                            </div>

                        </div>

                        <div className="calendar-box">

                            <h3>
                                Días Trabajados en {fechaSeleccionada.getMonth() + 1}/
                                {fechaSeleccionada.getFullYear()}
                            </h3>

                            <Calendar
                                onChange={setFechaSeleccionada}
                                value={fechaSeleccionada}
                                tileClassName={marcarDiaTrabajado}
                            />

                        </div>

                    </div>

                )}

                {vista === "calendario" && !filtroEmpleado && (

                    <div className="sin-seleccion">
                        <p>Selecciona un empleado para ver el calendario</p>
                    </div>

                )}

                {/* TABLA */}

                {vista === "tabla" && (

                    <>
                        {asistenciasEmpleado.length === 0 ? (

                            <p className="sin-datos">
                                No hay registros de asistencia
                            </p>

                        ) : (

                            <div className="asistencias-tabla">

                                <table>

                                    <thead>
                                        <tr>
                                            <th>Empleado</th>
                                            <th>Fecha</th>
                                            <th>Estado</th>
                                        </tr>
                                    </thead>

                                    <tbody>

                                        {asistenciasEmpleado.map((asistencia) => {

                                            const nombrePersona =
                                                asistencia.Persona?.nombre ??
                                                "Sin nombre";

                                            const apellidoPersona =
                                                asistencia.Persona?.apellido ??
                                                "";

                                            const estado =
                                                asistencia.horasTotales > 0
                                                    ? "Completado"
                                                    : "Registrado";

                                            return (

                                                <tr key={asistencia.id}>

                                                    <td>
                                                        {nombrePersona} {apellidoPersona}
                                                    </td>

                                                    <td>
                                                        {asistencia.fecha
                                                            ? new Date(asistencia.fecha).toLocaleDateString()
                                                            : "-"}
                                                    </td>

                                                    <td>

                                                        <span
                                                            className={`estado-asistencia ${estado === "Completado"
                                                                ? "salida-registrada"
                                                                : "en-curso"
                                                                }`}
                                                        >
                                                            {estado}
                                                        </span>

                                                    </td>

                                                </tr>

                                            );

                                        })}

                                    </tbody>

                                </table>

                            </div>

                        )}

                    </>

                )}

            </div>
        </>
    );
};

export default Asistencias;