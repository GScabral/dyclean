
const authFromStorage = JSON.parse(localStorage.getItem("auth"));

const initialState = {
    loading: false,
    isAuthenticated: authFromStorage ? true : false,
    usuario: authFromStorage ? authFromStorage.usuario : null,
    token: authFromStorage ? authFromStorage.accessToken : null,
    error: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {

        case "LOGIN_REQUEST":
            return { ...state, loading: true };

        case "LOGIN_SUCCESS":
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                usuario: action.payload.usuario,
                token: action.payload.accessToken,
                error: null
            };

        case "LOGIN_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        case "LOGOUT":
            return initialState;

        default:
            return state;
    }
};

export default authReducer;
