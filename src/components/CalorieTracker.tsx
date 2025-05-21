
import CalorieDisplay from "./CalorieDisplay";
import { useActivity } from "../hooks/useActivity";


export default function CalorieTracker() {

  const { caloriesConsumed, caloriesBurned, netCalories  } = useActivity()
 


  return (
    <>
      <h2 className="text-4xl font-black text-white text-center">
        Resumen de Calorias
        
      </h2>
      <p className="text-2xl font-black text-green-500 text-center">
          {netCalories < 0
            ? `Estás en déficit calórico`
            : netCalories > 0
            ? `Estás en superávit calórico`
            : `Estás en balance calórico`}
        </p>
      <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
        <CalorieDisplay calories={caloriesConsumed} text="Consumidas" />
        <CalorieDisplay calories={caloriesBurned} text="Quemadas" />
        <CalorieDisplay calories={netCalories} text="Diferencia" />
      </div>
    </>
  );
}
