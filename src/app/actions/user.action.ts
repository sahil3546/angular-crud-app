import { Action } from '@ngrx/store';
import { User} from '../model/user.model';

export const ADD_USER = '[ADD] Make';

export class AddUser implements Action {
    readonly type = ADD_USER;
    constructor(public payload: User) {}
};

export type Actions = AddUser ;