import { useState } from "react";
import { useDispatch } from "react-redux";
import { crearEdificios } from "../../../redux/action/edificioAction";
import "./newEdifico.css";

const campos = [
    { name: "nombre", label: "Nombre", type: "text", required: true },
    { name: "direccion", label: "Dirección", type: "text", required: true },
    { name: "frecuencia_limpieza", label: "Frecuencia de limpieza", type: "text", required: true },
    { name: "litros_estimados", label: "Litros estimados", type: "number", required: true },
    { name: "duracion_estimada_minutos", label: "Duración estimada (min)", type: "number", required: true },

    { name: "telefono_contacto", label: "Teléfono", type: "text" },
    { name: "email_contacto", label: "Email", type: "email" },
    { name: "encargado", label: "Encargado", type: "text" },
    { name: "latitud", label: "Latitud", type: "number" },
    { name: "longitud", label: "Longitud", type: "number" },
    { name: "tipo_limpieza", label: "Tipo de limpieza", type: "text" },
    { name: "metros_cuadrados", label: "Metros cuadrados", type: "number" },
    { name: "cantidad_pisos", label: "Cantidad de pisos", type: "number" },
    { name: "horario_preferido", label: "Horario preferido", type: "text" },
    { name: "observaciones", label: "Observaciones", type: "textarea" },
];

const initialState = campos.reduce((acc, campo) => {
    acc[campo.name] = "";
    return acc;
}, { activo: true });

const NewEdificio = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState(initialState);
    const [mensaje, setMensaje] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const validar = () => {
        const obligatorios = campos.filter(c => c.required);
        return obligatorios.every(c => formData[c.name].toString().trim() !== "");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje(null);

        if (!validar()) {
            setMensaje("❌ Complete todos los campos obligatorios");
            return;
        }

        setLoading(true);

        const payload = Object.fromEntries(
            Object.entries(formData).map(([key, value]) => {
                if (value === "") return [key, null];
                if (!isNaN(value)) return [key, Number(value)];
                return [key, value.trim()];
            })
        );

        const response = await dispatch(crearEdificios(payload));

        if (response) {
            setMensaje("✅ Edificio creado correctamente");
            setFormData(initialState);
        } else {
            setMensaje("❌ Error al crear el edificio");
        }

        setLoading(false);
    };

    return (
        <div className="new-edificio">
            <h2>Crear nuevo edificio</h2>

            <form onSubmit={handleSubmit} className="form-grid">

                {campos.map(campo => (
                    campo.type === "textarea" ? (
                        <textarea
                            key={campo.name}
                            name={campo.name}
                            placeholder={campo.label}
                            value={formData[campo.name]}
                            onChange={handleChange}
                        />
                    ) : (
                        <input
                            key={campo.name}
                            type={campo.type}
                            name={campo.name}
                            placeholder={campo.label}
                            value={formData[campo.name]}
                            onChange={handleChange}
                        />
                    )
                ))}

                <label className="checkbox">
                    <input
                        type="checkbox"
                        name="activo"
                        checked={formData.activo}
                        onChange={handleChange}
                    />
                    Edificio activo
                </label>

                <button type="submit" disabled={loading}>
                    {loading ? "Creando..." : "Crear edificio"}
                </button>

            </form>

            {mensaje && <p className="mensaje">{mensaje}</p>}
        </div>
    );
};

export default NewEdificio;