import { Activity } from "../types";

export type ActivityActions = {

}

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
    

}
