import api from "../api/axiosConfig";

export const getResumenGeneral = () => {
    return async (dispatch) => {
        try {
            const response = await api.get("/admin/resumen");

            dispatch({
                type: "GET_RESUMEN_GENERAL",
                payload: response.data,
            });

            return response;
        } catch (error) {
            console.error("ERROR_RESUMEN_GENERAL", error);
            return null;
        }
    };
};

export const getHorasTrabajadas = () => {
    return async (dispatch) => {
        try {
            const response = await api.get("/admin/horas");

            dispatch({
                type: "GET_HORAS_TRABAJADAS",
                payload: response.data,
            });

            return response;
        } catch (error) {
            console.error("ERROR_HORAS_TRABAJADAS", error);
            return null;
        }
    };
};

export const getAusencias = () => {
    return async (dispatch) => {
        try {
            const response = await api.get("/admin/ausencias");

            dispatch({
                type: "GET_AUSENCIAS",
                payload: response.data,
            });

            return response;
        } catch (error) {
            console.error("ERROR_AUSENCIAS", error);
            return null;
        }
    };
};

export const getIncidencias = () => {
    return async (dispatch) => {
        try {
            const response = await api.get("/admin/incidencias");

            dispatch({
                type: "GET_INCIDENCIAS",
                payload: response.data,
            });

            return response;
        } catch (error) {
            console.error("ERROR_INCIDENCIAS", error);
            return null;
        }
    };
};

export const getEstadisticas = () => {
    return async (dispatch) => {
        try {
            const response = await api.get("/admin/estadisticas");

            dispatch({
                type: "GET_ESTADISTICAS",
                payload: response.data,
            });

            return response;
        } catch (error) {
            console.error("ERROR_ESTADISTICAS", error);
            return null;
        }
    };
};

export const exportarHorasExcel = () => {
    return async (dispatch) => {
        try {
            const response = await api.get("/admin/horasExel", {
                responseType: 'blob'
            });

            // Crear un blob URL y descargar
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `reporte-horas-${new Date().toISOString().split('T')[0]}.xlsx`);
            document.body.appendChild(link);
            link.click();

            dispatch({
                type: "EXPORT_EXCEL_SUCCESS",
                payload: { message: "Reporte descargado correctamente" },
            });

            return response;
        } catch (error) {
            console.error("ERROR_EXPORT_EXCEL", error);
            return null;
        }
    };
};
