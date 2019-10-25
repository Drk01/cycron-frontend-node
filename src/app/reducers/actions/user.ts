import { Action } from '@ngrx/store'

export enum UserActionTypes {
    SET_USER = 'SET_USER',
    FLUSH_USER = 'FLUSH_USER'
}

export class set implements Action {
    readonly type = UserActionTypes.SET_USER
    constructor(public payload: any){}
}

export class flush implements Action {
    readonly type = UserActionTypes.FLUSH_USER
    constructor(public payload: any){}
}

export type UserActions = set | flush