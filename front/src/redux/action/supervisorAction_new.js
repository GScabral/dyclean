import api from "../api/axiosConfig";

// Obtener empleados asignados al supervisor
export const getEmpleadosSupervisor = () => {
    return async (dispatch) => {
        dispatch({ type: "LOADING_EMPLEADOS_SUPERVISOR" });
        try {
            const response = await api.get("/supervisor/empleados");
            const empleados = response.data?.data || response.data || [];
            dispatch({
                type: "GET_EMPLEADOS_SUPERVISOR",
                payload: empleados
            });
            return response.data;
        } catch (error) {
            console.error("ERROR_GET_EMPLEADOS_SUPERVISOR", error);
            dispatch({
                type: "ERROR_EMPLEADOS_SUPERVISOR",
                payload: error.message || "Error al obtener empleados"
            });
            return null;
        }
    };
};

// Obtener asistencias 
export const getAsistencias = () => {
    return async (dispatch) => {
        dispatch({ type: "LOADING_ASISTENCIAS" });
        try {
            const response = await api.get("/supervisor/asistencias");
            const asistencias = response.data?.data || response.data || [];
            dispatch({
                type: "GET_ASISTENCIAS",
                payload: asistencias
            });
            return response.data;
        } catch (error) {
            console.error("ERROR_GET_ASISTENCIAS", error);
            dispatch({
                type: "ERROR_ASISTENCIAS",
                payload: error.message || "Error al obtener asistencias"
            });
            return null;
        }
    };
};

// Obtener reportes
export const getReportesSupervidor = () => {
    return async (dispatch) => {
        dispatch({ type: "LOADING_REPORTES_SUPERVISOR" });
        try {
            const response = await api.get("/supervisor/reportes");
            const reportes = response.data?.data || response.data || [];
            dispatch({
                type: "GET_REPORTES_SUPERVISOR",
                payload: reportes
            });
            return response.data;
        } catch (error) {
            console.error("ERROR_GET_REPORTES_SUPERVISOR", error);
            dispatch({
                type: "ERROR_REPORTES_SUPERVISOR",
                payload: error.message || "Error al obtener reportes"
            });
            return null;
        }
    };
};

// Obtener estadísticas del supervisor
export const getEstadisticasSupervisor = () => {
    return async (dispatch) => {
        dispatch({ type: "LOADING_ESTADISTICAS_SUPERVISOR" });
        try {
            const response = await api.get("/supervisor/estadisticas");
            const stats = response.data?.data || response.data || {};
            dispatch({
                type: "GET_ESTADISTICAS_SUPERVISOR",
                payload: stats
            });
            return response.data;
        } catch (error) {
            console.error("ERROR_GET_ESTADISTICAS_SUPERVISOR", error);
            dispatch({
                type: "ERROR_ESTADISTICAS_SUPERVISOR",
                payload: error.message || "Error al obtener estadísticas"
            });
            return null;
        }
    };
};
