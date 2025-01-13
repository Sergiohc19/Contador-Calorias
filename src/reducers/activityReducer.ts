import { Activity } from "../types";

export type ActivityActions = 
{ type : "save-activity", payload : { newActivity : Activity } }

type ActivityState = {
    activities : Activity[]
}


export const inicialState : ActivityState = {
    activities : []
}
 
export const activityReducer = (
    state : ActivityState = inicialState,
    action : ActivityActions
) =>  {
    
    if (action.type === "save-activity") {
        // Este código maneja la lógica para actualizar el state
       
       
        return {
            ...state,
            activities : [...state.activities, action.payload.newActivity]
        }
    }

    return state
}
