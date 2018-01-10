import * as fromShoppingList from 'app/shopping-list/store/shopping-list.reducers';
import * as fromAuth from './auth/store/auth.reducers';
import { ActionReducerMap } from '@ngrx/store/src/models';



export interface AppState {
    shoppingList: fromShoppingList.State,
    auth: fromAuth.State
}

// need to use AppState
export const reducers: ActionReducerMap<any> = {
    shoppingList: fromShoppingList.shoppingListReducers,
    auth: fromAuth.authReducer
};
