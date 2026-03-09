import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import HeaderEmpleado from "./HeaderEmpleado";
import "./PanelEmpleado.css";

const PanelEmpleado = () => {

    const { usuario } = useSelector((state) => state.auth);

    if (!usuario) return null;

    return (
        <>
            <HeaderEmpleado />

            <div className="panel-empleado">
                <div className="header-empleado">
                    <h1>Hola, {usuario.nombre} 👋</h1>
                    <p className="subtitulo">
                        Panel de empleado
                    </p>
                </div>

                <div className="empleado-cards">

                    <Link to="/empleado/jornada" className="card-link">
                        <div className="card-empleado">
                            <span className="card-icon">⏱️</span>
                            <span>Mi Jornada</span>
                        </div>
                    </Link>

                    <Link to="/empleado/tareas" className="card-link">
                        <div className="card-empleado">
                            <span className="card-icon">✅</span>
                            <span>Mis Tareas</span>
                        </div>
                    </Link>

                    <Link to="/empleado/reporteStock" className="card-link">
                        <div className="card-empleado">
                            <span className="card-icon">📦</span>
                            <span>Reporte Productos</span>
                        </div>
                    </Link>

                    {/* <Link to="/empleado/reportes" className="card-link">
                        <div className="card-empleado">
                            <span className="card-icon">📊</span>
                            <span>Mis Reportes</span>
                        </div>
                    </Link> */}

                    <Link to="/empleado/reporte" className="card-link">
                        <div className="card-empleado">
                            <span className="card-icon">📝</span>
                            <span>Reportar</span>
                        </div>
                    </Link>

                    <Link to="/empleado/perfil" className="card-link">
                        <div className="card-empleado">
                            <span className="card-icon">👤</span>
                            <span>Mi Perfil</span>
                        </div>
                    </Link>

                </div>
            </div>
        </>
    );
};

export default PanelEmpleado;
