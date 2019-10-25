import { UserActionTypes, UserActions } from "./actions/user";

export let initialState = []

export function reducer(state=initialState, action: UserActions) {
    switch (action.type) {
        case UserActionTypes.SET_USER: 
            return [...state, action.payload]
        case UserActionTypes.FLUSH_USER: 
            return []
        default: 
            return state
    }
}