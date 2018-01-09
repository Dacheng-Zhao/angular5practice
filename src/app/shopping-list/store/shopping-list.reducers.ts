import * as ShoppingListActions from './shopping-list.actions';
import { Ingredient } from './../../shared/ingredient.model';

export interface AppState {
    ingredients: Ingredient[],
    editedItem: Ingredient,
    editedItemIndex: number
}

const initalState: AppState = {
    ingredients: [
        new Ingredient('apple', 5),
        new Ingredient('Tomato', 10)
      ],
      editedItem: null,
      editedItemIndex: -1
}


export function shoppingListReducers(state = initalState, action: ShoppingListActions.ShoppingListActions) {
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
        return {
            ...state,
            ingredients: [...state.ingredients, action.payload]
        };
        case ShoppingListActions.ADD_INGREDIENTS:
        return {
            ...state,
            ingredients: [...state.ingredients, ...action.payload]
        };
        case ShoppingListActions.UPDATE_INGREDIENT:
        state.ingredients[state.editedItemIndex] = action.payload;
        const updatedIngredients = state.ingredients;
        return {
          ...state,
            ingredients: updatedIngredients
        };
        case ShoppingListActions.DELETE_INGREDIENT:
        state.ingredients.splice(state.editedItemIndex, 1);
        return {
            ...state,
            ingredients: state.ingredients
        };
        case ShoppingListActions.START_EDIT:
        return {
            ...state,
            editedItemIndex: action.payload,
            editedItem: state.ingredients[action.payload]
        }
        default:
        return state;
    }
}
