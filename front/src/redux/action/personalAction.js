import api from "../api/axiosConfig";


export const crearPersona = (data) => {
    return async (dispatch) => {
        try {
            const response = await api.post(
                "/auth/crear-usuario",
                data
            );

            dispatch({
                type: "NEW_PERSONA",
                payload: response.data,
            });

            return response;
        } catch (error) {
            console.error("ERROR_NEW_PERSONA", error);
            return null;
        }
    };
};

export const listAllPersonal = () => {
    return async (dispatch) => {
        try {
            const response = await api.get("/persona/listPersonal")

            dispatch({
                type: "GET_ALLPERSONAL",
                payload: response.data
            })

            return response;
        } catch (error) {
            console.error("ERRO_GETPERSONAL", error);
            dispatch({
                type: "GET_ALLPERSONAL_ERROR",
                payload: error.message
            });
            return null;
        }
    }
}


export const detallePersona=(id)=>{
    return async(dispatch)=>{
        dispatch({type:"LOADING_DETALLE_PERSONA"});
        try{
            const response = await api.get(`/persona/detallesPersona/${id}`)
            dispatch({
                type:"GET_DETALLE_PERSONA",
                payload:response.data,
            })
        }catch(error){
            dispatch({
                type:"ERROR_DETALLE_PERSONA",
                payload:error.message
            })
        }
    }
}