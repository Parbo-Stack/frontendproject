import http from '../http'

// const API_URL = "http://localhost:8081/api/auth/";

const register = (username, email, password) => {
    return http.post("/auth/signup/", {
        username,
        email,
        password,
    });
};

const login =  async (username, password) => {
    return http
        .post( "/auth/login/", {
            username,
            password,
        })
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem("user");
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

export default {
    register,
    login,
    logout,
    getCurrentUser,
};