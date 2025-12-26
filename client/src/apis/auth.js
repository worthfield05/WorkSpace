import API from ".";
const getMeAPI = async () => {
  try {
    const res = await API.get("/api/v1/auth/getme");
    return res.data;
  } catch (error) {
    if (error.response?.status === 401) {
      return null;
    }
    throw error;
  }
};
const loginAPI = async (payload) => {
  const data = await API.post("/api/v1/auth/login", payload);
  return data.response;
};
const registerAPI = async (payload) => {
  console.log(payload);
  const data = await API.post("/api/v1/auth/signup", payload);
  return data.response;
};
const logoutAPI = async () => {
  const data = await API.post("/api/v1/auth/logout");
  return data.response;
};
export { getMeAPI, registerAPI, loginAPI, logoutAPI };
