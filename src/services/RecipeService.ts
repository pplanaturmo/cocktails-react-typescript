import axios from "axios";
import {
  CategoriesApiREsponseSchema,
  DrinksApiResponse,
  RecipeAPIResponseSchema,
} from "../schemas/recipes-schema";
import { Drink, Recipes, SearchFilter } from "../types/index";

const baseUrl = "https://www.thecocktaildb.com/api/json/v1/1/"

export async function getCategories() {
  const url = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list";
// const url = {`${baseUrl}list.php?c=list`}
  const { data } = await axios(url);

  const result = CategoriesApiREsponseSchema.safeParse(data);
  if (result.success) {
    return result.data;
  }
}

export async function getRecipes(searchFilters: SearchFilter) {

//   const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${searchFilters.category}&i=${searchFilters.ingredient}`;
  const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchFilters.ingredient}&c=${searchFilters.category}`;

 
  const { data } = await axios(url);
 
  
  const result = DrinksApiResponse.safeParse(data);
  if (result.success) {
    return result.data;
  }
}

export async function getDrinkDetails(id : Drink['idDrink']) {

    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
    const {data} = await axios(url)
    const result = RecipeAPIResponseSchema.safeParse(data.drinks[0])
    console.log(result);
    
    if (result.success) {
        return result.data;
      }
    
}
