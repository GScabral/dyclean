import { Link } from "react-router-dom";
import { Users, UserPlus, List } from "lucide-react";
import "./Personas.css";

const Personal = () => {
    return (
        <div className="personal-container">
            <header className="personal-header">
                <Users size={42} />
                <h1>Gestión de Personal</h1>
                <p>Administrá el personal del sistema</p>
            </header>

            <div className="personal-actions">
                <Link to="/newPersonal" className="personal-card">
                    <UserPlus size={32} />
                    <h3>Crear personal</h3>
                    <p>Registrar un nuevo empleado</p>
                </Link>

                <Link to="/listPersonal" className="personal-card secondary">
                    <List size={32} />
                    <h3>Listado de personal</h3>
                    <p>Ver y administrar empleados</p>
                </Link>
            </div>
        </div>
    );
};

export default Personal;
