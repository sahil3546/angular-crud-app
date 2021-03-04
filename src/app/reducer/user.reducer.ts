import * as UserActions from '../actions/user.action';
import { User } from '../model/user.model';

export function reducer(state: User[] = [], action: UserActions.Actions){
    switch(action.type) {
        case UserActions.ADD_USER:
            return [...state, action.payload];
        default:
            return state;
    }
}
