import http from "./httpService";

const serviceRoute = "/api/auth";

const login = async (name,password) => {
    const user = await http.post(`${serviceRoute}/login`,{name,password})
    return user.data;
}

const register = async (user) => {
    user = await http.post(`${serviceRoute}/register`,user)
    return user.data;
}

export {login,register}