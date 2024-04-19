import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppStore } from "../stores/useAppStore";

export default function Header() {

  const [searchFilters, setSearchFilters] = useState({
    ingredient: "",
    category: ""
  })

  const { pathname } = useLocation();

  const isHome = useMemo(() => pathname === "/", [pathname]);

  // const fetchCategories = useAppStore((state) => state.fetchCategories);

  const { categories, fetchCategories, fetchRecipes,showNotification } = useAppStore();

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    setSearchFilters({
      ...searchFilters, [event.target.name] : event.target.value
      
    })
   
    
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) =>{
    event.preventDefault();

    if(Object.values(searchFilters).includes("")){
      //TODO validar
      showNotification({
        text:"Todos los campos son obligatorios",
        error: true
      })
      return
    }else{
     
      fetchRecipes(searchFilters)
    }

  }


  
  return (
    <header
      className={isHome ? " bg-header bg-center bg-cover" : "bg-slate-800"}
    >
      <div className="mx-auto container px-5 py-16">
        <div className="flex justify-between items-center">
          <div>
            <img className="w-32" src="/logo.svg" />
          </div>
          <nav className="flex justify-center gap-4">
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                isActive
                  ? "text-orange-400 uppercase font-bold px-2"
                  : "text-white uppercase font-bold px-2"
              }
            >
              Inicio
            </NavLink>
            <NavLink
              to={"/favorites"}
              className={({ isActive }) =>
                isActive
                  ? "text-orange-400 uppercase font-bold px-2"
                  : "text-white uppercase font-bold px-2"
              }
            >
              Favoritos
            </NavLink>
          </nav>
        </div>
        {isHome && (
          <form className="md:w-1/2 2xl:w-1/3 bg-orange-500 my-2 p-10 rounded-md shadow space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <label
                htmlFor="ingredient"
                className="block text-white uppercase font-extrabold text-lg"
              >
                Nombre o ingredientes
              </label>
              <input
                id="ingredient"
                name="ingredient"
                type="text"
                className="p-3 w-full rounded-md focus:outline-none "
                placeholder="Nombre, Ingrediente"
                onChange={handleChange}
                value={searchFilters.ingredient}
              ></input>
            </div>
            <div className="space-y-4">
              <label
                htmlFor="category"
                className="block text-white uppercase font-extrabold text-lg"
              >
                Categoría
              </label>
              <select
                id="category"
                name="category"
                className="p-3 w-full rounded-md focus:outline-none "
                onChange={handleChange}
                value={searchFilters.category}
              >
                <option value={""} className="text-center">
                  --- Seleccione ---
                </option>
                {categories.drinks.map((category) => (
                  <option
                    key={category.strCategory}
                    value={category.strCategory}
                  >
                    {category.strCategory}
                  </option>
                ))}
              </select>
            </div>
            <input
              type="submit"
              value={"Buscar recetas"}
              className="w-full p-2 cursor-pointer bg-orange-700 hover:bg-orange-800 text-white font-extrabold rounded-md uppercase"
            ></input>
          </form>
        )}
      </div>
    </header>
  );
}
