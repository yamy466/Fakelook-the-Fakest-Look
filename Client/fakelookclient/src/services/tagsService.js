import http from "./httpService";
const serverRoute = "/api/tags/";

const getTagsByQuery = async (query, token) => {
  return await http.get(`${serverRoute}search/?query=${query}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

const addTag = async (tag,token) => {
  return await http.post(`${serverRoute}add`, {
    tag,
  },
  {
    headers: {
      Authorization: "Bearer " + token,
    },
  })
}

export { getTagsByQuery,addTag };
