import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { logout } from "../../redux/action/authAction";
import "./HeaderSupervisor.css";

const HeaderSupervisor = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { usuario } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login", { replace: true });
    };

    return (
        <header className="header-supervisor">
            <div className="header-content">

                <Link to="/supervisor" className="logo">
                    <span className="logo-icon">🏢</span>
                    <span className="logo-text">Admin Edificios</span>
                </Link>

                <nav className="nav-supervisor">
                    <Link to="/supervisor" className="nav-link">Panel</Link>
                    <Link to="/supervisor/empleados" className="nav-link">Empleados</Link>
                    <Link to="/supervisor/edificio" className="nav-link">Edificio</Link>
                    <Link to="/supervisor/reportes" className="nav-link">Reportes</Link>
                    <Link to="/supervisor/asistencias" className="nav-link">Asistencias</Link>
                </nav>

                <div className="supervisor-info">
                    <div className="avatar">
                        {usuario?.nombre?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <div className="nombre">{usuario?.nombre}</div>
                        <div className="rol">{usuario?.rol}</div>
                    </div>
                </div>

                <button className="logout-btn" onClick={handleLogout}>
                    Salir
                </button>

            </div>
        </header>
    );
};

export default HeaderSupervisor;
