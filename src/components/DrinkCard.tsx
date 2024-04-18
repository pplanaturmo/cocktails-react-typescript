import { useAppStore } from "../stores/useAppStore";
import type { Drink } from "../types";

type DrinkCardProps = {
  drink: Drink;
};

export default function DrinkCard({ drink }: DrinkCardProps) {

const {fetchDrinkDetails} = useAppStore()

  return (
    <div className="border shadow-md">
      <div className="p-6 overflow-hidden">
        <img src={drink.strDrinkThumb} alt={`Imagen de ${drink.strDrink}`} 
        className="hover:scale-125 transition transform translate-x-4"
        />
      </div>
      <div className="p-5 text-center">
        <h2 className="text-2xl truncate">{drink.strDrink}</h2>
        <button
          type="button"
          className="bg-orange-400 hover:bg-orange-600 text-white mt-5 w-full p-3 font-bold text-lg rounded-md"
            onClick={()=> fetchDrinkDetails(drink.idDrink)}
        >Ver Receta</button>
      </div>
    </div>
  );
}
