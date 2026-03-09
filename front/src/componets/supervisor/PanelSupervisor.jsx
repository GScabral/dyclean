import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import HeaderSupervisor from "./HeaderSupervisor";
import "./PanelSupervisor.css";

const PanelSupervisor = () => {
    const { usuario } = useSelector((state) => state.auth);

    if (!usuario) return null;

    return (
        <>
            <HeaderSupervisor />

            <div className="panel-supervisor">
                <div className="header-supervisor">
                    <h1>Bienvenido, {usuario.nombre} 👋</h1>
                    <p className="subtitulo">Panel de Supervisor</p>
                </div>

                <div className="supervisor-cards">
                    <Link to="/supervisor/empleados" className="card-link">
                        <div className="card-supervisor">
                            <span className="card-icon">👥</span>
                            <span>Mis Empleados</span>
                        </div>
                    </Link>

                    <Link to="/supervisor/edificio" className="card-link">
                        <div className="card-supervisor">
                            <span className="card-icon">🏢</span>
                            <span>Edificios</span>
                        </div>
                    </Link>

                    <Link to="/supervisor/reportes" className="card-link">
                        <div className="card-supervisor">
                            <span className="card-icon">📊</span>
                            <span>Reportes del Equipo</span>
                        </div>
                    </Link>

                    <Link to="/supervisor/asistencias" className="card-link">
                        <div className="card-supervisor">
                            <span className="card-icon">✅</span>
                            <span>Asistencias</span>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default PanelSupervisor;
