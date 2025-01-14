import { Activity } from "../types";

// Tipos de acciones
export type ActivityActions =
    | { type: "save-activity"; payload: { newActivity: Activity } }
    | { type: "set-activeId"; payload: { id: Activity["id"] } }
    | { type: "delete-activity"; payload: { id: Activity["id"] } }
    | { type: "restart-app" }

// Tipo de estado de actividades
export type ActivityState = {
    activities: Activity[];
    activeID: Activity["id"]; // Usamos activeID consistentemente
};

// Función para obtener las actividades de localStorage
const localStorageActivities = (): Activity[] => {
    const activities = localStorage.getItem("activities");
    return activities ? JSON.parse(activities) : [];
};

// Estado inicial
export const initialState: ActivityState = {
    activities: localStorageActivities(),
    activeID: "",
};

// Reducer de actividades
export const activityReducer = (
    state: ActivityState = initialState,
    action: ActivityActions
): ActivityState => {
    switch (action.type) {
        case "save-activity": {
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
                activeID: "",
            };
        }

        case "set-activeId": {
            return {
                ...state,
                activeID: action.payload.id,
            };
        }

        case "delete-activity": {
            return {
                ...state,
                activities: state.activities.filter(
                    (activity) => activity.id !== action.payload.id
                ),
            };
        }

        case "restart-app": {
            return {
                activities: [],
                activeID: "",
            };
        }

        default:
            return state;
    }
};
