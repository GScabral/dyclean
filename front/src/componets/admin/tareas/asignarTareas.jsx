import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asignarTarea, listarTareasActivas } from "../../../redux/action/tareaAction";
import { listaEdificio } from "../../../redux/action/edificioAction";
import { listAllPersonal } from "../../../redux/action/personalAction";
import "./asignarTarea.css";

const AsignarTarea = () => {
    const dispatch = useDispatch();

    // 🔹 Siempre convertir a array seguro
    const tareas = useSelector((state) =>
        Array.isArray(state.tareaState?.allTareas)
            ? state.tareaState.allTareas
            : []
    );

    const edificios = useSelector((state) =>
        Array.isArray(state.edificioState?.allEdificios)
            ? state.edificioState.allEdificios
            : []
    );

    const personal = useSelector((state) =>
        Array.isArray(state.personalState?.allPersonal)
            ? state.personalState.allPersonal
            : []
    );

    const [form, setForm] = useState({
        persona_id: "",
        edificio_id: "",
        tarea_id: "",
        fecha: "",
    });

    useEffect(() => {
        dispatch(listarTareasActivas());
        dispatch(listaEdificio());
        dispatch(listAllPersonal());
    }, [dispatch]);

    // 🔹 Filtrado seguro usando useMemo
    const filteredPersonal = useMemo(() => {
        if (!form.edificio_id) return [];

        return personal.filter((p) =>
            p &&
            p.id &&
            p.rol !== "admin" &&
            p.rol !== "supervisor" &&
            Array.isArray(p.Edificios) &&
            p.Edificios.some(
                (ed) => ed && ed.id === Number(form.edificio_id)
            )
        );
    }, [personal, form.edificio_id]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => {
            const updated = { ...prev, [name]: value };

            // 🔹 Si cambia edificio, limpiar persona
            if (name === "edificio_id") {
                updated.persona_id = "";
            }

            return updated;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !form.persona_id ||
            !form.edificio_id ||
            !form.tarea_id ||
            !form.fecha
        ) {
            alert("Completa todos los campos");
            return;
        }

        const result = await dispatch(asignarTarea(form));

        if (result && result.success) {
            alert("✅ Tarea asignada correctamente");

            dispatch(listarTareasActivas());

            setForm({
                persona_id: "",
                edificio_id: "",
                tarea_id: "",
                fecha: "",
            });
        } else {
            const msg = result?.error || "No se pudo asignar la tarea";
            alert(`❌ ${msg}`);
        }
    };

    return (
        <div className="asignar-tarea">
            <h2>Asignar Tarea</h2>

            <form onSubmit={handleSubmit}>
                {/* 🔹 EDIFICIO */}
                <select
                    name="edificio_id"
                    value={form.edificio_id}
                    onChange={handleChange}
                    required
                >
                    <option value="">Seleccionar edificio</option>

                    {edificios.map((e) =>
                        e && e.id ? (
                            <option key={e.id} value={e.id}>
                                {e.nombre}
                            </option>
                        ) : null
                    )}
                </select>

                {/* 🔹 PERSONAL */}
                <select
                    name="persona_id"
                    value={form.persona_id}
                    onChange={handleChange}
                    required
                    disabled={!form.edificio_id}
                >
                    <option value="">Seleccionar personal</option>

                    {filteredPersonal.map((p) => (
                        <option key={p.id} value={p.id}>
                            {p.nombre} {p.apellido} ({p.rol})
                        </option>
                    ))}
                </select>

                {/* 🔹 TAREA */}
                <select
                    name="tarea_id"
                    value={form.tarea_id}
                    onChange={handleChange}
                    required
                >
                    <option value="">Seleccionar tarea</option>

                    {tareas.map((t) =>
                        t && t.id ? (
                            <option key={t.id} value={t.id}>
                                {t.nombre} {t.prioritaria ? "⭐" : ""}
                            </option>
                        ) : null
                    )}
                </select>

                {/* 🔹 FECHA */}
                <input
                    type="date"
                    name="fecha"
                    value={form.fecha}
                    onChange={handleChange}
                    required
                />

                <button type="submit">Asignar tarea</button>
            </form>
        </div>
    );
};

export default AsignarTarea;