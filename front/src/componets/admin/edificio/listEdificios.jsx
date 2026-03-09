import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listaEdificio } from "../../../redux/action/edificioAction";
import { Link } from "react-router-dom";
import "./listEdificios.css"

const ListEdificios = () => {
    const dispatch = useDispatch();
    const listadoEdificios = useSelector((state) => state.edificioState.allEdificios)

    useEffect(() => {
        dispatch(listaEdificio())
    }, [dispatch])





    return (
        <>
            <div className="edificios-container">
                <div className="edificios-grid">
                    {listadoEdificios?.map((edificio) => (
                        <div className="edificio-card" key={edificio.id}>
                            <div className="edificio-header">
                                <Link to={`/detalleEdicio/${edificio.id}`}>
                                    <div className="edificio-nombre">{edificio.nombre}</div>
                                </Link>
                                <div className={`estado ${edificio.activo ? "activo" : "inactivo"}`}>
                                    {edificio.activo ? "Activo" : "Inactivo"}
                                </div>
                            </div>

                            <div className="edificio-info">
                                <span><strong>Dirección:</strong> {edificio.direccion}</span>
                                <span><strong>Limpieza:</strong> {edificio.frecuencia_limpieza}</span>
                                <span><strong>Duración:</strong> {edificio.duracion_estimada_minutos} min</span>
                                <span><strong>Litros:</strong> {edificio.litros_estimados}</span>
                            </div>

                            <div className="edificio-footer">
                                Creado el {new Date(edificio.created_at).toLocaleDateString()}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </>
    )
}



export default ListEdificios