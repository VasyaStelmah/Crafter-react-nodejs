import * as api from "../api";

export const getSubjects = () => async (dispatch) => {
  try {
    const { data } = await api.fetchSubjects();
    dispatch({ type: "FETCH_ALL_SUBJECTS", payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const createSubject = (post) => async (dispatch) => {
  try {
    const { data } = await api.createSubject(post);
    dispatch({ type: "CREATE_SUBJECT", payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const updateSubject = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updateSubject(id, post);
    dispatch({ type: "UPDATE_SUBJECT", payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const deleteSubject = (id) => async (dispatch) => {
  try {
    await api.deleteSubject(id);
    dispatch({ type: "DELETE_SUBJECT", payload: id });
  } catch (error) {
    console.log(error);
  }
};
