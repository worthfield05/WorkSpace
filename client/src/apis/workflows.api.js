import API from ".";
export const listWorkflowsAPI = () =>
  API.get("/api/v1/workflow").then((res) => res.data);

export const getWorkflowAPI = (id) =>
  API.get(`/api/v1/workflow/${id}`).then((res) => res.data);

export const createWorkflowAPI = () =>
  API.post("/api/v1/workflow").then((res) => res.data);

export const updateWorkflowAPI = ({ id, name }) =>
  API.put(`/api/v1/workflow/${id}`, { name }).then((res) => res.data);

export const removeWorkflowAPI = (id) =>
  API.delete(`/api/v1/workflow/${id}`).then((res) => res.data);
