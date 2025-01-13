import { Activity } from "../types";

export type ActivityActions = 
{ type : "save-activity", payload : { newActivity : Activity } } |
{ type : "set-activeId", payload : { id : Activity['id'] } } 

type ActivityState = {
    activities : Activity[],
    activeID: Activity['id']
}


export const inicialState : ActivityState = {
    activities : [],
    activeID: ''
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

    if (action.type === "set-activeId") {
        return {
            ...state,
            activeID: action.payload.id
        }
    }
    return state
}
