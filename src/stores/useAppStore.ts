import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { RecipesSliceType, createRecipesSlice } from "./recipeSlice";
import { FavoritesSliceType, createFavoritesSlice } from "./favoritesSlice";
import {
  NotificationsSliceType,
  createNotificationsSlice,
} from "./notificationsSlice";

export const useAppStore = create<
  RecipesSliceType & FavoritesSliceType & NotificationsSliceType
>()(
  devtools((...a) => ({
    ...createRecipesSlice(...a),
    ...createFavoritesSlice(...a),
    ...createNotificationsSlice(...a),
  }))
);
