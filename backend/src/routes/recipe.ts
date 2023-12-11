import { Request, Response, NextFunction } from "express";
import { Document } from "mongoose";
import { Recipe, RecipeModel } from "../models/recipe"; // Adjust the path based on your actual structure

export const recipeMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Assuming req.params.id contains the recipe ID from the route
    const recipeId = req.params.id;

    // Fetch the recipe using your Recipe model
    const recipe: Recipe | null = await RecipeModel.findById(recipeId);

    if (!recipe) {
      // If the recipe is not found, send a 404 response
      res.status(404).json({ error: "Recipe not found" });
      return;
    }

    // Return the recipe details in the specified format
    res.json({
      name: recipe.name,
      instructions: recipe.instructions,
      ingredients: recipe.ingredients,
    });
  } catch (error) {
    // Handle errors, log them, and send an appropriate response
    console.error("Error fetching recipe:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};