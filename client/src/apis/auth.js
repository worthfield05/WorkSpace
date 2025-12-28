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
  const res = await API.post("/api/v1/auth/login", payload);
  return res.data;
};
const registerAPI = async (payload) => {
  console.log(payload);
  const res = await API.post("/api/v1/auth/signup", payload);
  return res.data;
};
const logoutAPI = async () => {
  const res = await API.post("/api/v1/auth/logout");
  return res.data;
};
export { getMeAPI, registerAPI, loginAPI, logoutAPI };
