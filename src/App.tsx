import { useReducer, useEffect, useMemo } from "react";
import Form from "./components/Form";
import { activityReducer, initialState } from "./reducers/activityReducer";
import ActivityList from "./components/ActivityList";
import { PowerIcon } from "@heroicons/react/24/outline";
import CalorieTracker from "./components/CalorieTracker";

function App() {
  const [state, dispatch] = useReducer(activityReducer, initialState);

  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(state.activities));
  }, [state.activities]);

  const canRestartApp = useMemo(() => state.activities.length > 0, [state.activities]);

  return (
    <>
      <header className="bg-lime-600 py-3">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-center text-2xl font-bold text-white uppercase">
            Contador de Calorias
          </h1>

          <div className="flex items-center gap-2">
            <h3 className="text-2xl font-black text-black text-center">Reiniciar App</h3>
            <button
              className="bg-black cursor-pointer rounded-full flex items-center p-1 disabled:opacity-30"
              disabled={!canRestartApp}
              onClick={() => dispatch({ type: "restart-app" })}
            >
              <PowerIcon className="h-9 w-9 text-gray-500 scale-100
               hover:text-green-400 transition-colors duration-100 hover:scale-105  " />
            </button>
          </div>
        </div>
      </header>

      <section
        className=" py-20 px-5 bg-contain bg-center bg-lime-500"
      >
        <div className="max-w-4xl mx-auto">
          <Form dispatch={dispatch} state={state} />
        </div>
      </section>

      <section className="bg-gray-800 py-10">
        <div className="max-w-4xl mx-auto">
          <CalorieTracker 
          activities={state.activities}
          />
        </div>
      </section>

      <section className="p-10 mx-auto max-w-4xl">
        <ActivityList activities={state.activities} dispatch={dispatch} />
      </section>
    </>
  );
}

export default App;
