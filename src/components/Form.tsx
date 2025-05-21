import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { categories } from "../data/categories";
import type { Activity } from "../types";

import { useActivity } from "../hooks/useActivity";



const initialState: Activity = {
  id: uuidv4(),
  category: 1,
  name: "",
  calories: 0, // Inicializamos como una cadena vacía
};

export default function Form() {

  const { state, dispatch  } = useActivity()
  const [activity, setActivity] = useState<Activity>(initialState);

  useEffect(() => {
    if (state.activeID) {
      const selectActivity = state.activities.filter(stateActivity => stateActivity.id === state.activeID)[0];
      setActivity(selectActivity);
    }
  }, [state.activeID]);

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>
  ) => {
    const { id, value } = e.target;

    const isNumberField = ["category", "calories"].includes(id);
    const newValue = isNumberField
      ? id === "calories"
        ? value === "" // Si el campo de calorías está vacío, lo dejamos como una cadena vacía
          ? ""
          : +value
        : +value
      : value;

    setActivity({
      ...activity,
      [id]: newValue,
    });
  };

  const isValidActivity = () => {
    const { name, calories } = activity;
    return name.trim() !== "" && calories !== 0;
  };

  const hadleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch({
      type: "save-activity",
      payload: { newActivity: activity },
    });
    setActivity({
      ...initialState,
      id: uuidv4(),
    });
  };

  return (
    <form
      className="space-y-5 bg-white shadow p-10 rounded-lg"
      onSubmit={hadleSubmit}
    >
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category" className="font-bold">
          Categoría:
        </label>
        <select
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          id="category"
          value={activity.category}
          onChange={handleChange}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="activity" className="font-bold">
          Actividad:
        </label>
        <input
          type="text"
          id="name"
          className="border border-slate-300 p-2 rounded-lg placeholder-black"
          placeholder="Ej. Comida, Jugo de Naranja, Ensalada, Ejercicio, Pesas, Bicicleta"
          value={activity.name}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calories" className="font-bold">
          Calorías:
        </label>
        <input
          id="calories"
          type="number"
          className="border border-slate-300 p-2 rounded-lg placeholder-black"
          placeholder="Calorías Ej. 300 o 500"
          value={activity.calories}
          onChange={handleChange}
        />
      </div>
      <input
        type="submit"
        className="bg-black border  disabled:opacity-25 text-white text-xl  w-full p-2 font-bold uppercase hover:bg-green-700 cursor-pointer transition-all duration-1000"
        value={activity.category === 1 ? "Guardar Comida" : "Guardar Ejercicio"}
        disabled={!isValidActivity()}
      />
    </form>
  );
}
