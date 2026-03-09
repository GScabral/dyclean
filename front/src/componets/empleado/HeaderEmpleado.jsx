import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/action/authAction";
import "./HeaderEmpleado.css";

const HeaderEmpleado = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { usuario } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login", { replace: true });
    };

    return (
        <header className="header-empleado">
            <div className="header-content">

                <div className="empleado-info">
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

export default HeaderEmpleado;
