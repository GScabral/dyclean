import { useState } from "react";
import { useDispatch } from "react-redux";
import { crearTarea } from "../../../redux/action/tareaAction";
import "./nuevaTarea.css";

const NuevaTarea = () => {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        nombre: "",
        descripcion: "",
        prioritaria: false
    });

    const [mensaje, setMensaje] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMensaje("");

        const response = await dispatch(
            crearTarea({
                ...formData,
                activo: true // Siempre se crea activa
            })
        );

        if (response) {
            setMensaje("✅ Tarea creada correctamente");
            setFormData({
                nombre: "",
                descripcion: "",
                prioritaria: false
            });
            setTimeout(() => setMensaje(""), 3000);
        } else {
            setMensaje("❌ Error al crear la tarea");
        }

        setLoading(false);
    };

    return (
        <div className="nueva-tarea">
            <h2>Crear Nueva Tarea</h2>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nombre de la tarea *</label>
                    <input
                        type="text"
                        name="nombre"
                        placeholder="Ej: Limpiar pisos"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Descripción</label>
                    <textarea
                        name="descripcion"
                        placeholder="Descripción detallada de la tarea"
                        value={formData.descripcion}
                        onChange={handleChange}
                        rows="4"
                    />
                </div>

                <div className="form-group checkbox-group">
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            name="prioritaria"
                            checked={formData.prioritaria}
                            onChange={handleChange}
                        />
                        Tarea prioritaria
                    </label>
                </div>

                <button type="submit" disabled={loading} className="btn-submit">
                    {loading ? "Creando..." : "Crear Tarea"}
                </button>
            </form>

            {mensaje && (
                <p className={`mensaje ${mensaje.includes("✅") ? "success" : "error"}`}>
                    {mensaje}
                </p>
            )}
        </div>
    );
};

export default NuevaTarea;