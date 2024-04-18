import { StateCreator } from "zustand";
import {
  getCategories,
  getDrinkDetails,
  getRecipes,
} from "../services/RecipeService";
import type {
  Categories,
  Drink,
  DrinkDetails,
  Recipes,
  SearchFilter,
} from "../types";

export type RecipesSliceType = {
  categories: Categories;
  recipes: Recipes;
  selectedRecipe: DrinkDetails;
  modal: boolean;
  fetchCategories: () => Promise<void>;
  fetchRecipes: (searchFilter: SearchFilter) => Promise<void>;
  fetchDrinkDetails: (id: Drink["idDrink"]) => Promise<void>;
  closeModal: () => void;
};

export const createRecipesSlice: StateCreator<RecipesSliceType> = (set) => ({
  categories: { drinks: [] },
  recipes: {
    drinks: [],
  },
  selectedRecipe: {} as DrinkDetails,
  modal: false,
  
  fetchCategories: async () => {
    const categories = await getCategories();
    set({
      categories,
    });
  },

  fetchRecipes: async (searchFilters) => {
    const recipes = await getRecipes(searchFilters);

    set({
      recipes,
    });
  },
  fetchDrinkDetails: async (id) => {
    const selectedRecipe = await getDrinkDetails(id);

    set({
      selectedRecipe,
      modal: true
    });
  },
  closeModal: () => {
    set({
      selectedRecipe: {} as DrinkDetails,
      modal:false,
    })

  }
});
