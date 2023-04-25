import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const initialState = {
  cartItems: []
}

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload]
      }
      case 'REMOVE_FROM_CART':
        const newCartItems = state.cartItems.filter(item => item.id !== action.payload.id)
        console.log("New cart items:", newCartItems)
        return {
          ...state,
          cartItems: newCartItems
        }
      
    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cartItems: state.cartItems.map(item => item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item)
      }
    default:
      return state;
  }
}

const store = createStore(cartReducer, applyMiddleware(thunk));

export default store;

