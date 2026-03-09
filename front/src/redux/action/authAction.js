

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: "LOGIN_REQUEST" });

        const response = await fetch("http://localhost:3004/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Error login");
        }

        dispatch({
            type: "LOGIN_SUCCESS",
            payload: data
        });

        localStorage.setItem("auth", JSON.stringify(data));

    } catch (error) {
        dispatch({
            type: "LOGIN_FAIL",
            payload: error.message
        });
    }
};

export const logout = () => (dispatch) => {
    localStorage.removeItem("auth");
    dispatch({ type: "LOGOUT" });
};
