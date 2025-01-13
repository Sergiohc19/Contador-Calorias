import { Activity } from "../types";

export type ActivityActions =
    { type: "save-activity"; payload: { newActivity: Activity } } |
    { type: "set-activeId"; payload: { id: Activity["id"] } } |
    { type: "delete-activity"; payload: { id: Activity["id"] } }

export type ActivityState = {
    activities: Activity[];
    activeID: Activity["id"];
};

export const inicialState: ActivityState = {
    activities: [],
    activeID: "",
};

export const activityReducer = (
    state: ActivityState = inicialState,
    action: ActivityActions
) => {
    if (action.type === "save-activity") {
        // Este código maneja la lógica para actualizar el state

        let updateActivities: Activity[] = [];
        if (state.activeID) {
            updateActivities = state.activities.map((activity) =>
                activity.id === state.activeID ? action.payload.newActivity : activity
            );
        } else {
            updateActivities = [...state.activities, action.payload.newActivity];
        }

        return {
            ...state,
            activities: updateActivities,
            activeId: "",
        };
    }

    if (action.type === "set-activeId") {
        return {
            ...state,
            activeID: action.payload.id,
        };
    }

    if (action.type === "delete-activity") {
        return { 
            ...state,
            activities: state.activities.filter( activity => activity.id !== action.payload.id)
        }
    }

    return state;
};
