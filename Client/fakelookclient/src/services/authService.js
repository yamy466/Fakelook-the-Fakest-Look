import http from "./httpService";

const serviceRoute = "/api/auth";

const login = async (name,password) => {
    const user = await http.post(`${serviceRoute}/login`,{name,password})
    return user.data;
}

export {login}