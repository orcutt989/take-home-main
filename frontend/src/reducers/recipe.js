export const RECEIVE_RECIPE = "RECEIVE_RECIPE";
export const CLEAR_RECIPE = "CLEAR_RECIPE";

// Action creators
export const receiveRecipe = (recipe) => ({
  type: RECEIVE_RECIPE,
  payload: recipe,
});

export const clearRecipe = () => ({
  type: CLEAR_RECIPE,
});