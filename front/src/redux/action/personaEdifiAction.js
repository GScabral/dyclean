import api from "../api/axiosConfig";

// Quitar asignación de persona a edificio
export const quitarAsignacionPersonaEdificio = (id) => {
    return async (dispatch) => {
        try {
            const response = await api.put(`/persona-edificio/quitar/${id}`);
            // Puedes despachar una acción si quieres actualizar el store
            return response;
        } catch (error) {
            console.error("ERROR_QUITAR_ASIGNACION", error);
            return null;
        }
    };
};

// Asignar persona a edificio
export const asignarPersonaEdificio = (data) => {
    return async (dispatch) => {
        try {
            const response = await api.post("/persona-edificio/asignar", data);
            // Puedes despachar una acción si quieres actualizar el store
            return response;
        } catch (error) {
            console.error("ERROR_ASIGNAR_PERSONA_EDIFICIO", error);
            return null;
        }
    };
};
