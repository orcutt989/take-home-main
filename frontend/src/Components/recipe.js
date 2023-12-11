import React from "react";
import { connect } from "react-redux";
import { RecipeWrapper } from "../Containers/Recipe/styles"; // Import the styled component

const Recipe = ({ selectedRecipe }) => {
  if (!selectedRecipe) {
    // If there's no selected recipe, return null or placeholder component
    return null;
  }

  // Extract recipe details
  const { name, instructions, ingredients } = selectedRecipe;

  return (
    <RecipeWrapper>
      <h2>{name}</h2>
      <p>Instructions: {instructions}</p>
      <h3>Ingredients</h3>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
    </RecipeWrapper>
  );
};

// Map the selectedRecipe from the Redux state to props
const mapStateToProps = (state) => ({
  selectedRecipe: state.selectedRecipe, // Replace with the actual property name in your Redux state
});

// Connect the component to the Redux state
export default connect(mapStateToProps)(Recipe);