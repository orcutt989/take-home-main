import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../actions";
import RecipeComponent from "../../Components/recipe";

const RecipeContainer = ({ selectedRecipe, match, fetchRecipe }) => {
  useEffect(() => {
    // Fetch the recipe when the component mounts
    const recipeId = match.params.id;
    fetchRecipe(recipeId);
  }, [match.params.id, fetchRecipe]);

  return <RecipeComponent selectedRecipe={selectedRecipe} />;
};

const mapStateToProps = (state) => ({
  selectedRecipe: state.selectedRecipe, // Replace with the actual property name in your Redux state
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchRecipe: actions.fetchRecipe, // Assuming you have a fetchRecipe action
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(RecipeContainer);