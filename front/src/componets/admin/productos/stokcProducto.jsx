import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    listadoProducto,
    asignarProducto,
    desasignarProducto,
    agregarStock,
    obtenerHistorialStock
} from "../../../redux/action/productosAction";

import {
    listaEdificio,
    productoByEdificio
} from "../../../redux/action/edificioAction";

import "./stockProducto.css";

const Stock = () => {
    const dispatch = useDispatch();
    const [agregarStockId, setAgregarStockId] = useState(null);
    const [cantidadCompra, setCantidadCompra] = useState("");

    const { allProductos: productos } = useSelector(
        (state) => state.productoState
    );

    const { historialProducto: historialProduc } = useSelector(
        (state) => state.productoState
    );

    const { productoEdificio, allEdificios: edificios } = useSelector(
        (state) => state.edificioState
    );

    const [asignandoId, setAsignandoId] = useState(null);

    const [form, setForm] = useState({
        edificio_id: "",
        cantidad_actual: "",
        cantidad_minima: ""
    });

    useEffect(() => {
        dispatch(listadoProducto());
        dispatch(listaEdificio());
        dispatch(productoByEdificio());
        dispatch(obtenerHistorialStock());
    }, [dispatch]);


    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleConfirmar = async () => {
        const resp = await dispatch(
            asignarProducto({
                producto_id: asignandoId,
                edificio_id: form.edificio_id,
                cantidad_actual: Number(form.cantidad_actual),
                cantidad_minima: Number(form.cantidad_minima)
            })
        );

        if (resp) {
            dispatch(productoByEdificio());
            dispatch(listadoProducto());
        }

        setAsignandoId(null);
    };

    const handleDesasignar = async (id) => {
        if (!window.confirm("¿Eliminar producto del edificio?")) return;

        await dispatch(desasignarProducto(id));

        dispatch(productoByEdificio());
        dispatch(listadoProducto());
    };


    const handleAgregarStock = async (id) => {

        const resp = await dispatch(
            agregarStock({
                producto_id: id,
                cantidad: Number(cantidadCompra)
            })
        );

        if (resp) {
            dispatch(listadoProducto());
        }

        setAgregarStockId(null);
    };

    const totalProductos = productos.length;

    const bajoStock = productos.filter(
        (p) => p.stock_actual <= p.stock_minima
    ).length;

    return (
        <div className="dashboard-layout">

            <main className="dashboard-main">

                <header className="topbar">
                    <h1>Gestión de Stock</h1>
                </header>

                {/* METRICAS */}

                <section className="metrics">

                    <div className="metric-card">
                        <span>Productos</span>
                        <strong>{totalProductos}</strong>
                    </div>

                    <div className="metric-card warning">
                        <span>Bajo stock</span>
                        <strong>{bajoStock}</strong>
                    </div>

                    <div className="metric-card">
                        <span>Edificios</span>
                        <strong>{edificios.length}</strong>
                    </div>

                </section>

                {/* PRODUCTOS */}

                <section className="productos-section">

                    <h2>Productos disponibles</h2>

                    <div className="productos-grid">

                        {productos.map((prod) => {

                            const bajo = prod.stock_actual <= prod.stock_minima;

                            return (

                                <div
                                    key={prod.id}
                                    className={`producto-card ${bajo ? "low" : ""}`}
                                >

                                    <div className="producto-head">
                                        <h3>{prod.nombre}</h3>
                                        <span className="unidad">{prod.unidad}</span>
                                    </div>

                                    <div className="producto-stock">
                                        <strong>{prod.stock_actual}</strong>
                                        <span>disponibles</span>
                                    </div>

                                    <div className="producto-meta">
                                        <span>
                                            Última modificación:{" "}
                                            {new Date(prod.updatedAt).toLocaleDateString()}
                                        </span>
                                    </div>

                                    {/* BOTONES */}

                                    <div className="producto-actions">

                                        <button
                                            className="btn-primary"
                                            onClick={() => setAsignandoId(prod.id)}
                                        >
                                            Asignar
                                        </button>

                                        <button
                                            className="btn-secondary"
                                            onClick={() => {
                                                setAgregarStockId(prod.id);
                                                setCantidadCompra("");
                                            }}
                                        >
                                            + Comprar stock
                                        </button>

                                    </div>

                                    {/* ASIGNAR PRODUCTO */}

                                    {asignandoId === prod.id && (

                                        <div className="asignar-box">

                                            <select
                                                name="edificio_id"
                                                value={form.edificio_id}
                                                onChange={handleChange}
                                            >
                                                <option value="">
                                                    Seleccionar edificio
                                                </option>

                                                {edificios.map((e) => (
                                                    <option key={e.id} value={e.id}>
                                                        {e.nombre}
                                                    </option>
                                                ))}
                                            </select>

                                            <input
                                                type="number"
                                                placeholder="Cantidad actual"
                                                name="cantidad_actual"
                                                value={form.cantidad_actual}
                                                onChange={handleChange}
                                            />

                                            <input
                                                type="number"
                                                placeholder="Cantidad mínima"
                                                name="cantidad_minima"
                                                value={form.cantidad_minima}
                                                onChange={handleChange}
                                            />

                                            <div className="form-buttons">

                                                <button
                                                    className="btn-success"
                                                    onClick={handleConfirmar}
                                                >
                                                    Confirmar
                                                </button>

                                                <button
                                                    className="btn-cancel"
                                                    onClick={() => {
                                                        setAsignandoId(null);
                                                        setForm({
                                                            edificio_id: "",
                                                            cantidad_actual: "",
                                                            cantidad_minima: ""
                                                        });
                                                    }}
                                                >
                                                    Cancelar
                                                </button>

                                            </div>

                                        </div>

                                    )}

                                    {/* COMPRAR STOCK */}

                                    {agregarStockId === prod.id && (

                                        <div className="stock-box">

                                            <input
                                                type="number"
                                                placeholder="Cantidad comprada"
                                                value={cantidadCompra}
                                                onChange={(e) =>
                                                    setCantidadCompra(e.target.value)
                                                }
                                            />

                                            <div className="form-buttons">

                                                <button
                                                    className="btn-success"
                                                    onClick={() =>
                                                        handleAgregarStock(prod.id)
                                                    }
                                                >
                                                    Confirmar
                                                </button>

                                                <button
                                                    className="btn-cancel"
                                                    onClick={() => {
                                                        setAgregarStockId(null);
                                                        setCantidadCompra("");
                                                    }}
                                                >
                                                    Cancelar
                                                </button>

                                            </div>

                                        </div>

                                    )}

                                </div>

                            );

                        })}

                    </div>

                </section>

                {/* STOCK POR EDIFICIO */}

                <section className="edificios-section">

                    <h2>Stock por edificio</h2>

                    {productoEdificio.map((edificio) => (

                        <div key={edificio.id} className="edificio-card">

                            <div className="edificio-header">
                                <h3>{edificio.nombre}</h3>
                                <span>{edificio.direccion}</span>
                            </div>

                            {edificio.EdificioProductos.length === 0 ? (

                                <p className="empty">
                                    Sin productos asignados
                                </p>

                            ) : (

                                <table>

                                    <thead>
                                        <tr>
                                            <th>Producto</th>
                                            <th>Unidad</th>
                                            <th>Actual</th>
                                            <th>Mínimo</th>
                                            <th>Asignado</th>
                                            <th></th>
                                        </tr>
                                    </thead>

                                    <tbody>

                                        {edificio.EdificioProductos.map((p) => (

                                            <tr key={p.id}>

                                                <td>{p.Producto.nombre}</td>

                                                <td>{p.Producto.unidad}</td>

                                                <td>{p.cantidad_actual}</td>

                                                <td>{p.cantidad_minima}</td>

                                                <td>
                                                    {new Date(
                                                        p.createdAt
                                                    ).toLocaleDateString()}
                                                </td>

                                                <td>

                                                    <button
                                                        className="btn-delete"
                                                        onClick={() =>
                                                            handleDesasignar(p.id)
                                                        }
                                                    >
                                                        Quitar
                                                    </button>

                                                </td>

                                            </tr>

                                        ))}

                                    </tbody>

                                </table>

                            )}

                        </div>

                    ))}

                </section>

            </main>

        </div>
    );
};

export default Stock;