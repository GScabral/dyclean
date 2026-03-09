import { Link } from "react-router-dom";
import { Building2, PlusCircle, List } from "lucide-react";
import "./Edificios.css";

const Edificio = () => {
    return (
        <div className="edificio-container">
            <header className="edificio-header">
                <Building2 size={42} />
                <h1>Gestión de Edificios</h1>
                <p>Administrá los edificios del sistema</p>
            </header>

            <div className="edificio-actions">
                <Link to="/newEdificio" className="edificio-card">
                    <PlusCircle size={32} />
                    <h3>Crear edificio</h3>
                    <p>Registrar un nuevo edificio</p>
                </Link>

                <Link to="/listaedificio" className="edificio-card secondary">
                    <List size={32} />
                    <h3>Listado de edificios</h3>
                    <p>Ver y administrar edificios</p>
                </Link>
            </div>
        </div>
    );
};

export default Edificio;
