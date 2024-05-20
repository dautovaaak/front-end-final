interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export interface CartState {
  items: CartItem[];
}

class CartReducer {
  initialState: CartState = {
    items: [],
  };

  reduce(state: CartState = this.initialState, action: { type: string; payload: any }): CartState {
    switch (action.type) {
      case 'ADD_TO_CART':
        const existingItem = state.items.find((item) => item.id === action.payload.id);
        if (existingItem) {
          return {
            ...state,
            items: state.items.map((item) =>
              item.id === existingItem.id ? { ...item, quantity: item.quantity + 1 } : item
            ),
          };
        } else {
          return {
            ...state,
            items: [...state.items, action.payload],
          };
        }
      case 'REMOVE_FROM_CART':
        return {
          ...state,
          items: state.items.filter((item) => item.id !== action.payload.id),
        };
      case 'UPDATE_CART_ITEM_QUANTITY':
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
          ),
        };
      default:
        return state;
    }
  }
}

const cartReducerInstance = new CartReducer();
export default cartReducerInstance.reduce.bind(cartReducerInstance);
