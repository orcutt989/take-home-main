export const GET_RECIPE = "GET_RECIPE";
export const RECEIVE_RECIPE = "RECEIVE_RECIPE";
export const FAIL_RECIPE = "FAIL_RECIPE";

const fetchingRecipe = () => ({
  type: GET_RECIPE,
});

const fetchedRecipe = (payload) => ({
  type: RECEIVE_RECIPE,
  payload,
});

const failedRecipe = (payload) => ({
  type: FAIL_RECIPE,
  payload,
});

export const executeRecipeFetch = async (id) => {
  try {
    // Set loading state to true while fetching data
    dispatch(fetchingRecipe());

    // Example using fetch:
    const response = await fetch(`/api/recipe/${id}`);
    const data = await response.json();

    // Dispatch action with the fetched data
    dispatch(fetchedRecipe(data));
  } catch (error) {
    // Dispatch action if there's an error
    dispatch(failedRecipe(error.message));
  }
};