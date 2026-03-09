import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3004",
});

// 🔐 Interceptor para agregar token automáticamente
api.interceptors.request.use(
    (config) => {

        const auth = JSON.parse(localStorage.getItem("auth"));

        if (auth?.accessToken) {
            config.headers.Authorization = `Bearer ${auth.accessToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
