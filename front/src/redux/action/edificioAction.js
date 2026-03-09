import api from "../api/axiosConfig";

export const crearEdificios = (edificioData) => {
    return async (dispatch) => {
        try {
            const response = await api.post("/edificio/newEdificio", edificioData);

            dispatch({
                type: "NEW_EDIFICIO",
                payload: response.data,
            })
            return response;

        } catch (error) {
            console.log("ERRO_NEWEDIFICIO", error)
            return null
        }
    }

}

export const listaEdificio = () => {
    return async (dispatch) => {
        try {
            const response = await api.get("/edificio/listEdificio");

            dispatch({
                type: "LIST_EDIFICIO",
                payload: response.data,
            })

            return response;
        } catch (error) {
            console.error("ERRO_LISTEDIFICIO", error)
            dispatch({
                type: "ERROR_LIST_EDIFICIO",
                payload: error.message
            })
            return null
        }
    }
}


export const detalleEdificio = (id) => {
    return async (dispatch) => {
        dispatch({ type: "LOADING_DETALLE_EDIFICIO" });

        try {
            const response = await api.get(`/edificio/detallesEdificio/${id}`);
            dispatch({
                type: "GET_DETALLE_EDIFICIO",
                payload: response.data,
            });
        } catch (error) {
            dispatch({
                type: "ERROR_DETALLE_EDIFICIO",
                payload: error.message,
            });
        }
    };
};


export const productoByEdificio = () => {
    return async (dispatch) => {
        dispatch({ type: "LOADING_PRODUCTOBY_EDIFICIO" })

        try {
            const response = await api.get("/edificio/asiganados")

            dispatch({
                type: "PRODUTO_EDIFICIO_SUCCESS",
                payload: response.data
            })
            return response
        } catch (error) {
            dispatch({
                type: "ERROR_PRODUCTO_BY_EDIFICIO",
                payload: error.message,
            })
            return null

        }
    }
}


