import { useState } from "react";
import { Link } from "react-router-dom";
import "./tareas.css";

const Tareas = () => {
    return (
        <div className="tareas-container">
            <h1>Gestión de Tareas</h1>
            
            <div className="tareas-menu">
                <Link to="/nuevaTarea" className="btn btn-primary">
                    ➕ Crear Nueva Tarea
                </Link>
                <Link to="/listarTareas" className="btn btn-secondary">
                    📋 Listar Tareas
                </Link>
                <Link to="/tareasEdificio" className="btn btn-info">
                    🏢 Asignar Tareas a Edificios
                </Link>
            </div>
        </div>
    );
};

export default Tareas;
