import http from "./httpService";
const serverRoute = "/api/users/";

const getUsersByQuery = async (query, token) => {
  return await http.get(`${serverRoute}search/?query=${query}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

export { getUsersByQuery };
