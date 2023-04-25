export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const UPDATE_CART_QUANTITY = "UPDATE_CART_QUANTITY";

export const removeFromCart = (id) => {
  return {
    type: REMOVE_FROM_CART,
    payload: {
      id,
    },
    
  };
};

export const updateCartQuantity = (id, quantity) => {
  return {
    type: UPDATE_CART_QUANTITY,
    payload: {
      id,
      quantity,
    },
  };
};

export const addToCartOrUpdateQuantity = (product) => {
  console.log("Item added to cart:", product);
  return (dispatch, getState) => {
    const { cartItems } = getState();
    const existingCartItem = cartItems.find((item) => item.id === product.id);

    if (!existingCartItem) {
      dispatch({
        type: ADD_TO_CART,
        payload: {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          quantity: 1,
        },
      });
    } else {
      const newQuantity = existingCartItem.quantity += 1;
      dispatch(updateCartQuantity(existingCartItem.id, newQuantity));
      console.log("nueva cantidad:",newQuantity)
    }
  };
};

