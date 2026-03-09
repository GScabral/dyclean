import api from "../api/axiosConfig";

export const asignarHorario = (horarioData) => {
    return async (dispatch) => {
        try {
            const response = await api.post("/horario/asignar", horarioData);

            dispatch({
                type: "NEW_HORARIO",
                payload: response.data,
            });

            return response;
        } catch (error) {
            console.error("ERROR_ASIGNAR_HORARIO", error);
            return null;
        }
    };
};

export const modificarHorario = (horarioId, horarioData) => {
    return async (dispatch) => {
        try {
            const response = await api.put(`/horario/modificar/${horarioId}`, horarioData);

            dispatch({
                type: "EDIT_HORARIO",
                payload: response.data,
            });

            return response;
        } catch (error) {
            console.error("ERROR_EDIT_HORARIO", error);
            return null;
        }
    };
};

export const obtenerHorarioPorPersona = (personaId) => {
    return async (dispatch) => {
        try {
            const response = await api.get(`/horario/persona/${personaId}`);

            dispatch({
                type: "GET_HORARIOS_PERSONA",
                payload: response.data,
            });

            return response;
        } catch (error) {
            console.error("ERROR_GET_HORARIOS", error);
            return null;
        }
    };
};
