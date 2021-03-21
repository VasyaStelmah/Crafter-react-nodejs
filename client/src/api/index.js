import axios from "axios";
const API = axios.create({ baseUrl: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const fetchRecipes = () => API.get("/recipes/getAll");
export const createRecipe = (newPost) => API.post("/recipes", newPost);
export const updateRecipe = (id, updatedPost) =>
  API.patch(`/recipes/${id}`, updatedPost);
export const deleteRecipe = (id) => {
  API.delete(`/recipes/${id}`);
};

export const fetchSubjects = () => API.get("/subjects/getAll");
export const createSubject = (newPost) => API.post("/subjects", newPost);
export const updateSubject = (id, updatedPost) =>
  API.patch(`/subjects/${id}`, updatedPost);
export const deleteSubject = (id) => {
  API.delete(`/subjects/${id}`);
};

export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
