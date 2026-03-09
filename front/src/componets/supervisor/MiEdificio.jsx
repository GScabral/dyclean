import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { listaEdificio } from "../../redux/action/edificioAction";
import HeaderSupervisor from "./HeaderSupervisor";
import "./MiEdificio.css";
import "./miEdificio.css";

const MiEdificio = () => {

    const dispatch = useDispatch();

    const { usuario } = useSelector((state) => state.auth);
    const allEdificios = useSelector(
        (state) => state.edificioState?.allEdificios || []
    );

    useEffect(() => {
        dispatch(listaEdificio());
    }, [dispatch]);

    // edificio del supervisor
    const miEdificio = usuario?.edificio_id
        ? allEdificios.filter(e => e.id === usuario.edificio_id)
        : allEdificios;

    if (allEdificios.length === 0)
        return <div className="no-data">Cargando edificios...</div>;

    if (!miEdificio || miEdificio.length === 0)
        return <div className="no-data">No hay información del edificio</div>;

    return (
        <>
            <HeaderSupervisor />

            <div className="mi-edificio">

                <h2>Mi Edificio</h2>

                <div className="edificios-container">

                    <div className="edificios-grid">

                        {miEdificio.map((edificio) => (

                            <div className="edificio-card" key={edificio.id}>

                                <div className="edificio-header">

                                    <div className="edificio-nombre">
                                        {edificio.nombre}
                                    </div>

                                    <div className={`estado ${edificio.activo ? "activo" : "inactivo"}`}>
                                        {edificio.activo ? "Activo" : "Inactivo"}
                                    </div>

                                </div>

                                <div className="edificio-info">

                                    <span>
                                        <strong>Dirección:</strong> {edificio.direccion || "N/A"}
                                    </span>

                                    <span>
                                        <strong>Encargado:</strong> {edificio.encargado || "N/A"}
                                    </span>

                                    <span>
                                        <strong>Teléfono:</strong> {edificio.telefono_contacto || "N/A"}
                                    </span>

                                    <span>
                                        <strong>Email:</strong> {edificio.email_contacto || "N/A"}
                                    </span>

                                    <span>
                                        <strong>Pisos:</strong> {edificio.cantidad_pisos || "N/A"}
                                    </span>

                                    <span>
                                        <strong>Frecuencia Limpieza:</strong> {edificio.frecuencia_limpieza || "N/A"}
                                    </span>

                                    <span>
                                        <strong>Duración Estimada:</strong> {edificio.duracion_estimada_minutos || "N/A"} min
                                    </span>

                                    <span>
                                        <strong>Litros Estimados:</strong> {edificio.litros_estimados || "N/A"}
                                    </span>

                                    {edificio.observaciones && (
                                        <span className="observaciones">
                                            <strong>Observaciones:</strong> {edificio.observaciones}
                                        </span>
                                    )}

                                </div>

                                <div className="edificio-footer">

                                    Creado el{" "}
                                    {edificio.created_at
                                        ? new Date(edificio.created_at).toLocaleDateString()
                                        : "N/A"}

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

            </div>
        </>
    );
};

export default MiEdificio;