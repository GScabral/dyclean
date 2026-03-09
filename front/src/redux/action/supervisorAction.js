import api from "../api/axiosConfig";

// Obtener empleados usando la misma ruta que admin
export const getEmpleadosSupervisor = () => {
    return async (dispatch) => {
        dispatch({ type: "LOADING_EMPLEADOS_SUPERVISOR" });
        try {
            const response = await api.get("/persona/listPersonal");
            const empleados = Array.isArray(response.data) ? response.data : response.data?.data || [];
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

// Obtener reportes usando la misma ruta que admin
export const getReportesSupervidor = () => {
    return async (dispatch) => {
        dispatch({ type: "LOADING_REPORTES_SUPERVISOR" });
        try {
            const response = await api.get("/report/allReport");
            const reportes = Array.isArray(response.data) ? response.data : response.data?.data || [];
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

// Obtener asistencias/registro de trabajo por empleado
export const getAsistencias = (personaId = null) => {
    return async (dispatch) => {
        dispatch({ type: "LOADING_ASISTENCIAS" });
        try {
            let url = "/diatrabajo/allDias";
            let params = {};
            
            if (personaId) {
                params.persona_id = personaId;
            }
            
            const response = await api.get(url, { params });
            const asistencias = Array.isArray(response.data?.registros) ? response.data.registros : [];
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

// Obtener edificio por ID
export const getEdificioBySupervisor = (edificioId) => {
    return async (dispatch) => {
        dispatch({ type: "LOADING_EDIFICIO_SUPERVISOR" });
        try {
            const response = await api.get(`/edificio/detallesEdificio/${edificioId}`);
            dispatch({
                type: "GET_EDIFICIO_SUPERVISOR",
                payload: response.data
            });
            return response.data;
        } catch (error) {
            console.error("ERROR_GET_EDIFICIO_SUPERVISOR", error);
            dispatch({
                type: "ERROR_EDIFICIO_SUPERVISOR",
                payload: error.message || "Error al obtener edificio"
            });
            return null;
        }
    };
};

