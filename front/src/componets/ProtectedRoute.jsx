import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ element, requiredRole }) => {

    const { isAuthenticated, usuario } = useSelector(
        (state) => state.auth
    );

    if (!isAuthenticated || !usuario) {
        return <Navigate to="/login" replace />;
    }

    if (requiredRole && usuario.rol !== requiredRole) {
        return <Navigate to="/login" replace />;
    }

    return element;
};

export default ProtectedRoute;
