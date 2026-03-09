import api from "../api/axiosConfig";


export const ingresarProducto = (productoData) => {
    return async (dispatch) => {
        dispatch({ type: "PRODUCTO_REQUEST" });
        try {
            const response = await api.post("/producto/newProducto", productoData);

            dispatch({
                type: "NEW_PRODUCTO",
                payload: response.data
            });
            dispatch({ type: "PRODUCTO_SUCCESS", message: "Producto creado" });
            return response;
        } catch (error) {
            console.error("ERROR_NEW_PRODUCTO", error);
            dispatch({ type: "PRODUCTO_FAILURE", error: error.message });
            return null;
        }
    };
}


export const listadoProducto = () => {
    return async (dispatch) => {
        dispatch({ type: "PRODUCTO_REQUEST" });
        try {
            const response = await api.get("/producto/productList");

            dispatch({
                type: "LISTA_PRODUCTO",
                payload: response.data
            });
            dispatch({ type: "PRODUCTO_SUCCESS" });
            return response;
        } catch (error) {
            console.error("ERROR_LISTADO_PRODCUTO", error);
            dispatch({ type: "PRODUCTO_FAILURE", error: error.message });
            return null;
        }
    };
}

export const asignarProducto = (productoData) => {
    return async (dispatch) => {
        dispatch({ type: "PRODUCTO_REQUEST" });
        try {
            const response = await api.post("/producto/asignar-edificio", productoData);

            dispatch({
                type: "POST_ASIGNAR_PRODUCTO",
                payload: response.data
            });
            dispatch({ type: "PRODUCTO_SUCCESS", message: "Producto asignado" });
            return response;
        } catch (error) {
            console.error("ERRO_ASIGNAR_PRODUCTO", error);
            dispatch({ type: "PRODUCTO_FAILURE", error: error.message });
            return null;
        }
    };
}


export const desasignarProducto = (id) => {
    return async (dispatch) => {

        dispatch({ type: "PRODUCTO_REQUEST" });

        try {

            const response = await api.delete(`/producto/desasignar-producto/${id}`);

            dispatch({
                type: "DELETE_ASIGNACION_PRODUCTO",
                payload: response.data
            });

            dispatch({
                type: "PRODUCTO_SUCCESS",
                message: "Producto desasignado correctamente"
            });

            return response;

        } catch (error) {

            console.error("ERROR_DESASIGNAR_PRODUCTO", error);

            dispatch({
                type: "PRODUCTO_FAILURE",
                error: error.message
            });

            return null;
        }
    };
};

export const agregarStock = (data) => {
    return async (dispatch) => {

        dispatch({ type: "PRODUCTO_REQUEST" });

        try {

            const response = await api.post("/producto/agregar-stock", data);

            dispatch({
                type: "AGREGAR_STOCK_PRODUCTO",
                payload: response.data
            });

            dispatch({
                type: "PRODUCTO_SUCCESS",
                message: "Stock agregado correctamente"
            });

            return response;

        } catch (error) {

            console.error("ERROR_AGREGAR_STOCK", error);

            dispatch({
                type: "PRODUCTO_FAILURE",
                error: error.message
            });

            return null;
        }
    };
};



export const obtenerHistorialStock = () => async (dispatch) => {

    try {

        const { data } = await api.get("/producto/historial");

        dispatch({
            type: "SET_HISTORIAL_STOCK",
            payload: data
        });

    } catch (error) {

        console.log("ERROR_HISTORIAL_STOCK", error);

    }

};