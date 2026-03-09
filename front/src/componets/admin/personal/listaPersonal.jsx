import { useEffect } from "react";
import { listAllPersonal } from "../../../redux/action/personalAction";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./listaPersonal.css";

const ListPersonal = () => {
    const dispatch = useDispatch();

    const listaDePersonal = useSelector(
        (state) => state.personalState.allPersonal
    );

    


    useEffect(() => {
        dispatch(listAllPersonal());
    }, [dispatch]);

    return (
        <div className="personal-container">
            <h2>Personal registrado</h2>

            {listaDePersonal && listaDePersonal.length > 0 ? (
                <div className="personal-grid">
                    {listaDePersonal.map((persona) => (
                        <div className="personal-card" key={persona.id}>
                            <Link to={`/detallePersona/${persona.id}`}>
                                <div className="personal-header">
                                    <h3>{persona.nombre} {persona.apellido}</h3>
                                    <span className={`rol ${persona.rol}`}>
                                        {persona.rol}
                                    </span>
                                </div>
                            </Link>

                            <p><strong>Email:</strong> {persona.email}</p>
                            <p><strong>Teléfono:</strong> {persona.telefono}</p>

                            <p>
                                <strong>Estado:</strong>{" "}
                                <span className={persona.activo ? "activo" : "inactivo"}>
                                    {persona.activo ? "Activo" : "Inactivo"}
                                </span>
                            </p>

                            <div className="edificios">
                                <strong>Edificio asignado:</strong>
                                {persona.Edificios && persona.Edificios.length > 0 ? (
                                    persona.Edificios.map((ed) => (
                                        <div key={ed.id} className="edificio">
                                            🏢 {ed.nombre}
                                            <span>{ed.direccion}</span>
                                        </div>
                                    ))
                                ) : (
                                    <p className="sin-edificio">Sin asignar</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No hay personal registrado</p>
            )}
        </div>
    );
};

export default ListPersonal;
