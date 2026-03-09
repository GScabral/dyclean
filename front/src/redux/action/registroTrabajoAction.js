import api from "../api/axiosConfig";

export const iniciarJornada = (jornadadaData) => {
    return async (dispatch) => {
        try {
            const response = await api.post("/registro-trabajo/iniciar", jornadadaData);

            dispatch({
                type: "NEW_JORNADA",
                payload: response.data,
            });

            return response;
        } catch (error) {
            console.error("ERROR_INICIAR_JORNADA", error);
            return null;
        }
    };
};

export const finalizarJornada = (registroId) => {
    return async (dispatch) => {
        try {
            const response = await api.put(`/registro-trabajo/finalizar/${registroId}`);

            dispatch({
                type: "FINALIZAR_JORNADA",
                payload: response.data,
            });

            return response;
        } catch (error) {
            console.error("ERROR_FINALIZAR_JORNADA", error);
            return null;
        }
    };
};

export const obtenerRegistrodiario = (personaId, fecha = null) => {
    return async (dispatch) => {
        try {
            let url = `/registro-trabajo/diario/${personaId}`;
            if (fecha) {
                url += `?fecha=${fecha}`;
            }

            const response = await api.get(url);

            dispatch({
                type: "GET_REGISTRO_DIARIO",
                payload: response.data,
            });

            return response;
        } catch (error) {
            console.error("ERROR_GET_REGISTRO_DIARIO", error);
            return null;
        }
    };
};

export const obtenerRegistrosPorPersona = (personaId) => {
    return async (dispatch) => {
        try {
            const response = await api.get(`/registro-trabajo/persona/${personaId}`);

            dispatch({
                type: "GET_REGISTROS_PERSONA",
                payload: response.data,
            });

            return response;
        } catch (error) {
            console.error("ERROR_GET_REGISTROS_PERSONA", error);
            return null;
        }
    };
};

export const calcularHorasTrabajadas = (personaId, fechaInicio, fechaFin) => {
    return async (dispatch) => {
        try {
            const response = await api.get(`/registro-trabajo/horas`, {
                params: {
                    persona_id: personaId,
                    fecha_inicio: fechaInicio,
                    fecha_fin: fechaFin
                }
            });

            dispatch({
                type: "GET_HORAS_TRABAJADAS",
                payload: response.data,
            });

            return response;
        } catch (error) {
            console.error("ERROR_CALCULAR_HORAS", error);
            return null;
        }
    };
};
