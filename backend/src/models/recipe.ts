import { Document, Schema, Model, model } from "mongoose";
import { Ingredient, IngredientSchema } from "./ingredient";

export interface Recipe {
  name: string;
  instructions: string;
  ingredients: Ingredient[];
}

export const RecipeSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  instructions: {
    type: String,
    required: true,
  },
  ingredients: [IngredientSchema],
});

export const RecipeModel = model<Recipe & Document>("Recipe", RecipeSchema);