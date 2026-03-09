import api from "../api/axiosConfig";

export const crearTarea = (tareaData) => {
    return async (dispatch) => {
        try {
            const response = await api.post("/tarea/new", tareaData);

            dispatch({
                type: "NEW_TAREA",
                payload: response.data,
            });

            return response;
        } catch (error) {
            console.error("ERROR_NEW_TAREA", error);
            return null;
        }
    };
};

export const listarTareasActivas = () => {
    return async (dispatch) => {
        try {
            const response = await api.get("/tarea/activas");

            dispatch({
                type: "LIST_TAREAS_ACTIVAS",
                payload: response.data,
            });

            return response;
        } catch (error) {
            console.error("ERROR_LIST_TAREAS", error);
            if (error.response) {
                console.error("Server response", error.response.data);
                if (error.response.status === 401 || error.response.status === 403) {
                    // token expired/forbidden: clear auth so UI can redirect
                    localStorage.removeItem("auth");
                    dispatch({ type: "LOGOUT" });
                }
            }
            return null;
        }
    };
};

export const editarTarea = (tareaId, tareaData) => {
    return async (dispatch) => {
        try {
            const response = await api.put(`/tarea/editar/${tareaId}`, tareaData);

            dispatch({
                type: "EDIT_TAREA",
                payload: response.data,
            });

            return response;
        } catch (error) {
            console.error("ERROR_EDIT_TAREA", error);
            return null;
        }
    };
};

export const marcarTareaPrioritaria = (tareaId, prioritaria) => {
    return async (dispatch) => {
        try {
            const response = await api.patch(`/tarea/prioritaria/${tareaId}`, {
                prioritaria,
            });

            dispatch({
                type: "MARK_TAREA_PRIORITARIA",
                payload: response.data,
            });

            return response;
        } catch (error) {
            console.error("ERROR_MARK_PRIORITARIA", error);
            return null;
        }
    };
};


export const listarTareasPendientes = () => {
    return async (dispatch) => {
        try {
            const response = await api.get("/registro-tarea/pendientes");

            // log for debugging

            // backend returns an array of RegistroTarea entries with a nested Tarea
            const tareas = Array.isArray(response.data)
                ? response.data.map((r) => r.Tarea || r)
                : [];

            // log processed tasks

            dispatch({
                type: "LIST_TAREAS_PENDIENTES",
                payload: tareas,
            });

            return response;
        } catch (error) {
            console.error("ERROR_LIST_TAREAS_PENDIENTES", error);
            if (error.response) {
                // log server body
                console.error("Server response", error.response.data);
                if (error.response.status === 401 || error.response.status === 403) {
                    localStorage.removeItem("auth");
                    dispatch({ type: "LOGOUT" });
                }
            }
            // you may still want to notify the UI
            dispatch({
                type: "ERROR_TAREAS",
                payload: error.response?.data || error.message,
            });
            return null;
        }
    };
};

export const asignarTarea = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: "LOADING_TAREAS" });

            const response = await api.post("/tarea/asignar", data);

            dispatch({
                type: "NEW_TAREA",
                payload: response.data.tarea
            });

            return response.data;
        } catch (error) {
            dispatch({
                type: "ERROR_TAREAS",
                payload: error.response?.data || error.message
            });
            return null;
        }
    };
};

// marca un registro de tarea como realizada o no (usa el id del registro, no de la tarea)
export const marcarTareaRealizada = (registroId, realizada = true) => {
    return async (dispatch) => {
        try {
            const response = await api.put(`/registro-tarea/${registroId}/realizada`, {
                realizada
            });

            dispatch({
                type: "MARK_TAREA_REALIZADA",
                payload: response.data
            });

            return response;
        } catch (error) {
            console.error("ERROR_MARK_TAREA_REALIZADA", error);
            dispatch({
                type: "ERROR_TAREAS",
                payload: error.response?.data || error.message
            });
            return null;
        }
    };
};