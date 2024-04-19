import axios from "axios";
import {
  CategoriesApiREsponseSchema,
  DrinksApiResponse,
  RecipeAPIResponseSchema,
} from "../schemas/recipes-schema";
import { Drink, SearchFilter } from "../types/index";

const baseUrl = "https://www.thecocktaildb.com/api/json/v1/1/";

export async function getCategories() {
  const url = `${baseUrl}list.php?c=list`;
  const { data } = await axios(url);

  const result = CategoriesApiREsponseSchema.safeParse(data);
  if (result.success) {
    return result.data;
  }
}

export async function getRecipes(searchFilters: SearchFilter) {
  const url = `${baseUrl}filter.php?i=${searchFilters.ingredient}&c=${searchFilters.category}`;
  const { data } = await axios(url);
  const result = DrinksApiResponse.safeParse(data);
  if (result.success) {
    return result.data;
  }
}

export async function getDrinkDetails(id: Drink["idDrink"]) {
  const url = `${baseUrl}lookup.php?i=${id}`;
  const { data } = await axios(url);
  const result = RecipeAPIResponseSchema.safeParse(data.drinks[0]);

  if (result.success) {
    return result.data;
  }
}
