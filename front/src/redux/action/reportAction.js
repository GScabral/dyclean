import api from "../api/axiosConfig";


export const nuevoReporte = (infoReporte) => {
    return async (dispatch) => {
        try {
            const response = await api.post("/report/newreporte", infoReporte)
            const payload = response.data?.reporte ?? response.data ?? {};
            dispatch({
                type: "NEW_REPORT",
                payload,
            })

            return response;
        } catch (error) {
            console.error("ERROR_CREAR_REPORTE", error);
            // return the error response if available so caller can show message
            if (error.response) return error.response;
            return null;
        }
    }
}


export const listReport = () => {
    return async (dispatch) => {
        try {
            const response = await api.get("/report/allReport")
            const reportes = Array.isArray(response.data)
                ? response.data
                : response.data?.data ?? response.data ?? [];

            dispatch({
                type: "GET_ALLREPORT",
                payload: reportes
            })

            return response;
        } catch (error) {
            console.error("ERROR_GET_ALLREPORT", error)
            dispatch({
                type: "ERROR_GET_ALLREPORT",
                payload: error.message
            })
            return null
        }
    }
}


export const reportStock = (dataReport) => {
    return async (dispatch) => {

        console.log(dataReport)
        try {
            const response = await api.post("/report/productoStock", dataReport)
            const payload = response.data?.reporte ?? response.data ?? {};
            dispatch({
                type: "POST_REPORT_STOCK",
                payload,
            })
        } catch (error) {
            console.error("ERROR_POST_REPORTSTOCK");
            return null
        }
    }
}

export const updateEstadoReporte = (id, estado) => {
    return async (dispatch) => {
        try {
            const response = await api.patch(`/report/reporte/${id}/estado`, {
                estado
            });

            dispatch({
                type: "UPDATE_ESTADO_REPORTE",
                payload: response.data.reporte
            });

        } catch (error) {
            console.error("ERROR_UPDATE_ESTADO_REPORTE", error);
        }
    };
};

