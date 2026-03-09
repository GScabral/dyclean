import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/action/authAction";
import "./Login.css";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const { loading, error, isAuthenticated, usuario } = useSelector(
        (state) => state.auth
    );

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    };

    // ✅ Redirección correcta SIN useEffect
    if (isAuthenticated && usuario) {
        if (usuario.rol === "admin") {
            return <Navigate to="/" replace />;
        }
        if (usuario.rol === "supervisor") {
            return <Navigate to="/supervisor" replace />;
        }
        return <Navigate to="/empleado" replace />;
    }

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h1>🏢 Admin Edificios</h1>
                    <p>Sistema de Gestión</p>
                </div>

                <form onSubmit={handleLogin} className="login-form">

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group">
                        <label>Contraseña</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>

                    {error && (
                        <div className="error-message">
                            ❌ {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="login-button"
                    >
                        {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
                    </button>

                </form>
            </div>
        </div>
    );
};

export default Login;
