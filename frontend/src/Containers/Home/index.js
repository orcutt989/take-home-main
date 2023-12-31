import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { HomeWrapper } from "./styles";
import Input from "@material-ui/core/Input";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import * as actions from "../../actions";
import Recipe from "../../Components/recipe";
import { clearRecipe } from "../../actions/recipe"

const ingredientList = ["flour", "sugar", "salt", "butter", "milk"];

class Home extends Component {
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleIngredient = this.handleIngredient.bind(this);
    this.fetchSearch = this.fetchSearch.bind(this);
    this.state = {
      term: "",
      ingredients: ["milk"],
    };
  }

  async fetchSearch() {
    const { term, ingredients } = this.state;

    // Dispatch the searchRecipes action with the provided term and ingredients
    await this.props.searchRecipes(term, ingredients);

    // Log the updated state with search results
    console.log(this.props);
  }

  handleSearch(event) {
    const term = event.target.value;
    this.setState({ term });
  }

  handleIngredient(ingredient, event) {
    const { ingredients } = { ...this.state };
    if (event.target.checked) {
      ingredients.push(ingredient);
    } else {
      const foundIngredient = ingredients.indexOf(ingredient);
      ingredients.splice(foundIngredient, 1);
    }
    this.setState({ ingredients });
  }

  render() {
    const { term, ingredients } = this.state;
    const { recipes, isLoading, selectedRecipe } = this.props;

    return (
      <HomeWrapper>
        <Input
          autoFocus={true}
          fullWidth={true}
          onChange={this.handleSearch}
          value={term}
        />
        <div>
          <h3>Ingredients on hand</h3>
          {ingredientList.map((ingredient) => (
            <FormControlLabel
              key={ingredient}
              control={
                <Checkbox
                  checked={ingredients.includes(ingredient)}
                  onChange={this.handleIngredient.bind(this, ingredient)}
                  value={ingredient}
                />
              }
              label={ingredient}
            />
          ))}
        </div>
        <Button onClick={this.fetchSearch}>search</Button>
        <Divider />
        {recipes && (
          <List>
            {recipes.map((recipe) => (
              <ListItem key={recipe.id}>
                <ListItemText primary={recipe.name} />
              </ListItem>
            ))}
          </List>
        )}
        {isLoading && <LinearProgress />}
        <Divider />
        {selectedRecipe && <Recipe recipe={selectedRecipe} />}
      </HomeWrapper>
    );
  }
}

const mapStateToProps = (state) => {
  const { search } = state;
  return { ...search };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      searchRecipes: actions.searchRecipes,
      clearRecipe,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Home);