import { useReducer } from "react";
import Form from "./components/Form";
import { activityReducer, inicialState } from "./reducers/activityReducer";
import ActivityList from "./components/ActivityList";
function App() {

    const [state, dispatch] = useReducer(activityReducer, inicialState)


  return (
    <>
      <header className="bg-lime-600 py-3">
        <div className="max-w-4xl mx-auto flex justify-between">
          <h1 className="text-center text-2xl font-bold text-white uppercase">
            Contador de Calorias
          </h1>
        </div>
      </header>

      <section
        className="imagin py-20 px-5 bg-cover bg-center h-screen"
        style={{
          backgroundImage:
            'url("https://img.freepik.com/foto-gratis/verduras-frescas-pesas-sobre-fondo-madera_23-2147882039.jpg?t=st=1736107585~exp=1736111185~hmac=b0f25193320384a85c962091395e469ad55a48ebac979c28811efd2e2dd58b93&w=1380")',
        }}
      >
        <div className="max-w-4xl mx-auto">
          <Form 
            dispatch={dispatch}
          />
        </div>
      </section>

      <section className="p-10 mx-auto max-w-4xl">
        <ActivityList 
        activities={state.activities}
        dispatch={dispatch}
        
        />
      </section>
    </>
  );
}

export default App;
