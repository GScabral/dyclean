import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/action/authAction";
import "./HeaderAdmin.css";

const HeaderAdmin = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { usuario } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login", { replace: true });
    };

    return (
        <header className="header-admin">
            <div className="header-container">
                <div className="header-left">
                    <h1 className="header-title">Admin Edificios</h1>
                </div>

                <div className="header-right">
                    {usuario && (
                        <div className="usuario-info">
                            <div className="avatar">
                                {usuario.nombre?.charAt(0).toUpperCase()}
                            </div>
                            <div className="usuario-text">
                                <span className="usuario-nombre">{usuario.nombre}</span>
                                <span className="usuario-rol">{usuario.rol}</span>
                            </div>
                        </div>
                    )}

                    <button
                        className="logout-button"
                        onClick={handleLogout}
                    >
                        Cerrar sesión
                    </button>
                </div>
            </div>
        </header>
    );
};

export default HeaderAdmin;
