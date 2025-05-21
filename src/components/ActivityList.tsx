
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";

import { useActivity } from "../hooks/useActivity";



export default function ActivityList() {


    const { state, dispatch, isEmptyActivity, categoryName } = useActivity()
   
  

  return (
    <>
      <h2 className="text-4xl font-bold text-slate-600 text-center">
        Comida y Actividades
      </h2>

      {isEmptyActivity ? (
        <p className="text-center my-5">No hay actividades aún...</p>
      ) : (
        state.activities.map((activity) => (
          <div
            key={activity.id}
            className="px-8 py-8 bg-white mt-5 flex justify-between shadow-zinc-300 shadow-md rounded-lg"
          >
            <div className=" space-y-2 relative">
              <p
                className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold 
    ${activity.category === 1 ? "bg-lime-400" : "bg-orange-400"} `}
              >
                {categoryName(+activity.category)}
              </p>
              <p className="text-2xl font-bold pt-5">{activity.name}</p>
              <p className="font-black text-4xl text-lime-500">
                {activity.calories} {""}
                <span>Calorias</span>
              </p>
            </div>

            <div className="flex gap-5 items-center">
              <button
                onClick={() =>
                  dispatch({
                    type: "set-activeId",
                    payload: { id: activity.id },
                  })
                }
              >
                <PencilSquareIcon className="h-8 w-8 text-amber-400" />
              </button>

              <button
                onClick={() =>
                  dispatch({
                    type: "delete-activity",
                    payload: { id: activity.id },
                  })
                }
              >
                <TrashIcon className="h-8 w-8 text-red-500" />
              </button>
            </div>
          </div>
        ))
      )}
    </>
  );
}
