import "./Dashboard.css";
import { Link } from "react-router-dom";
const Dashboard = () => {
    return (
        <div className="dashboard">
            <h1>Bienvenido 👋</h1>

            <div className="cards">
                <Link to={'/Edificios'} className="card-link">
                    <div className="card">
                        <span className="card-icon">🏢</span>
                        <span>Edificios</span>
                    </div>
                </Link>

                <Link to={'/Empleados'} className="card-link">
                    <div className="card">
                        <span className="card-icon">👥</span>
                        <span>Empleados</span>
                    </div>
                </Link>

                <Link to={'/tareas'} className="card-link">
                    <div className="card">
                        <span className="card-icon">✅</span>
                        <span>Tareas</span>
                    </div>
                </Link>
                {/* 
                <Link to={'/registro-trabajo'} className="card-link">
                    <div className="card">
                        <span className="card-icon">⏱️</span>
                        <span>Jornadas Laborales</span>
                    </div>
                </Link> */}

                <Link to={'/horarios'} className="card-link">
                    <div className="card">
                        <span className="card-icon">💰</span>
                        <span>Liquidacion</span>
                    </div>
                </Link>

                <Link to={'/productos'} className="card-link">
                    <div className="card">
                        <span className="card-icon">📦</span>
                        <span>Productos</span>
                    </div>
                </Link>

                <Link to={'/reportes'} className="card-link">
                    <div className="card">
                        <span className="card-icon">📊</span>
                        <span>Reportes</span>
                    </div>
                </Link>

                {/* <Link to={'/incidencias'} className="card-link">
                    <div className="card">
                        <span className="card-icon">⚠️</span>
                        <span>Incidencias</span>
                    </div>
                </Link> */}
            </div>
        </div>
    );
};

export default Dashboard;
