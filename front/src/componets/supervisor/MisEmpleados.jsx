import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getEmpleadosSupervisor } from "../../redux/action/supervisorAction";
import {
    selectEmpleados,
    selectLoadingEmpleados,
    selectErrorEmpleados,
} from "../../redux/selectors/supervisorSelectors";
import HeaderSupervisor from "./HeaderSupervisor";
import "./MisEmpleados.css";
import "./misEmpleados.css";

const MisEmpleados = () => {
    const dispatch = useDispatch();
    const empleados = useSelector(selectEmpleados) || [];
    const loading = useSelector(selectLoadingEmpleados);
    const error = useSelector(selectErrorEmpleados);

    useEffect(() => {
        dispatch(getEmpleadosSupervisor());
    }, [dispatch]);

    if (loading)
        return (
            <>
                <HeaderSupervisor />
                <div className="mis-empleados">
                    <div className="loading">Cargando empleados...</div>
                </div>
            </>
        );

    if (error)
        return (
            <>
                <HeaderSupervisor />
                <div className="mis-empleados">
                    <div className="error">{error}</div>
                </div>
            </>
        );

    return (
        <>
            <HeaderSupervisor />

            <div className="mis-empleados">
                <h2>Mis Empleados Asignados</h2>

                {empleados.length === 0 ? (
                    <p className="sin-empleados">No hay empleados asignados</p>
                ) : (
                    <div className="empleados-tabla">
                        <table>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Apellido</th>
                                    <th>Email</th>
                                    <th>Cédula</th>
                                    <th>Teléfono</th>
                                    <th>Edificios</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {empleados.map((emp) => (
                                    <tr key={emp.id}>
                                        <td>{emp.nombre || "N/A"}</td>
                                        <td>{emp.apellido || "N/A"}</td>
                                        <td>{emp.email || "N/A"}</td>
                                        <td>{emp.cedula || "N/A"}</td>
                                        <td>{emp.telefono || "N/A"}</td>
                                        <td>
                                            {emp.Edificios && emp.Edificios.length > 0
                                                ? emp.Edificios.map((ed) => ed.nombre).join(", ")
                                                : "Sin asignar"}
                                        </td>
                                        <td>
                                            <span
                                                className={`estado ${emp.activo ? "activo" : "inactivo"
                                                    }`}
                                            >
                                                {emp.activo ? "Activo" : "Inactivo"}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </>
    );
};

export default MisEmpleados;