export const recipes = (recipes = [], action) => {
  switch (action.type) {
    case "FETCH_ALL_RECIPES":
      return action.payload;
    case "UPDATE_RECIPE":
      return recipes.map((recipe) =>
        recipe._id === action.payload._id ? action.payload : recipe
      );
    case "DELETE_RECIPE":
      return recipes.filter((recipe) => recipe._id !== action.payload);
    case "CREATE_RECIPE":
      return [...recipes, action.payload];
    default:
      return recipes;
  }
};
