interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

export const addToCart = (product: Product): { type: string; payload: Product & { quantity: number; }; } => ({
  type: 'ADD_TO_CART',
  payload: {
    ...product,
    quantity: 1,
  },
});

export const removeFromCart = (productId: number): { type: string; payload: { id: number; }; } => ({
  type: 'REMOVE_FROM_CART',
  payload: {
    id: productId,
  },
});

export const updateCartItemQuantity = (productId: number, newQuantity: number): { type: string; payload: { id: number; quantity: number; }; } => ({
  type: 'UPDATE_CART_ITEM_QUANTITY',
  payload: {
    id: productId,
    quantity: newQuantity,
  },
});
