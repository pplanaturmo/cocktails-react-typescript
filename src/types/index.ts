import {z} from "zod"
import { CategoriesApiREsponseSchema, DrinkApiResponse, DrinksApiResponse, RecipeAPIResponseSchema, SearchFilterSchema } from "../schemas/recipes-schema"

export type Categories =  z.infer<typeof CategoriesApiREsponseSchema>

export type SearchFilter = z.infer<typeof SearchFilterSchema>

export type Recipes = z.infer<typeof DrinksApiResponse>

export type Drink = z.infer<typeof DrinkApiResponse>

export type DrinkDetails = z.infer<typeof RecipeAPIResponseSchema>
