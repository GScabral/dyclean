import { useSelector } from "react-redux";
import "./MiPerfil.css";

const MiPerfil = () => {
    const usuario = useSelector((state) => state.auth.usuario);

    if (!usuario) {
        return (
            <div className="mi-perfil">
                <div className="perfil-container">
                    <p className="error-message">No hay usuario autenticado. Por favor inicia sesión.</p>
                </div>
            </div>
        );
    }


    return (
        <div className="mi-perfil">
            <h2>Mi Perfil</h2>

            <div className="perfil-container">
                <div className="perfil-header">
                    <div className="avatar">
                        <span>{usuario.nombre.charAt(0)}{usuario.nombre.split(" ")[1]?.charAt(0) || ""}</span>
                    </div>
                    <div className="perfil-titulo">
                        <h1>{usuario.nombre}</h1>
                        <p className="rol">{usuario.rol}</p>
                        <p>Edificio asignado:{usuario.edificios[0].nombre}</p>

                    </div>
                </div>

                <div className="perfil-datos">
                    <div className="seccion-datos">
                        <h3>Información Personal</h3>
                        <div className="dato-item">
                            <label>Nombre Completo</label>
                            <p>{usuario.nombre}</p>
                        </div>
                        {usuario.apellido && (
                            <div className="dato-item">
                                <label>Apellido</label>
                                <p>{usuario.apellido}</p>
                            </div>
                        )}
                        {usuario.cedula && (
                            <div className="dato-item">
                                <label>Número de Cédula</label>
                                <p>{usuario.cedula}</p>
                            </div>
                        )}
                        {usuario.telefono && (
                            <div className="dato-item">
                                <label>Teléfono</label>
                                <p>{usuario.telefono}</p>
                            </div>
                        )}
                        <div className="dato-item">
                            <label>Email</label>
                            <p>{usuario.email}</p>
                        </div>
                    </div>

                    <div className="seccion-datos">
                        <h3>Información Laboral</h3>
                        <div className="dato-item">
                            <label>Rol</label>
                            <p>{usuario.rol}</p>
                        </div>
                        {usuario.Edificios && usuario.Edificios.length > 0 && (
                            <div className="dato-item">
                                <label>Edificios Asignados</label>
                                <div className="edificios-list">
                                    {usuario.Edificios.map((ed) => (
                                        <span key={ed.id} className="edificio-badge">
                                            🏢 {ed.nombre}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                        {usuario.created_at && (
                            <div className="dato-item">
                                <label>Fecha de Ingreso</label>
                                <p>{new Date(usuario.created_at).toLocaleDateString()}</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="perfil-acciones">
                    <button className="btn-editar">✏️ Editar Perfil</button>
                    <button className="btn-cambiar-password">🔑 Cambiar Contraseña</button>
                </div>
            </div>
        </div>
    );
};

export default MiPerfil;
