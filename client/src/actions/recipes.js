import * as api from "../api";

export const getRecipes = () => async (dispatch) => {
  try {
    const { data } = await api.fetchRecipes();
    dispatch({ type: "FETCH_ALL_RECIPES", payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const createRecipe = (post) => async (dispatch) => {
  try {
    const { data } = await api.createRecipe(post);
    dispatch({ type: "CREATE_RECIPE", payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const updateRecipe = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updateRecipe(id, post);
    dispatch({ type: "UPDATE_RECIPE", payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const deleteRecipe = (id) => async (dispatch) => {
  try {
    await api.deleteRecipe(id);
    dispatch({ type: "DELETE_RECIPE", payload: id });
  } catch (error) {
    console.log(error);
  }
};
