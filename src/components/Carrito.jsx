import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateCartQuantity } from "../actions/Actions";
import { Link } from "react-router-dom";
import { useState } from "react";

function Carrito() {
  const cartItems = useSelector((state) => state.cartItems);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
    console.log(id);
  };

  const handleQuantityChange = (newQuantity, item) => {
    if (newQuantity < 0) {
      newQuantity = 0;
    }
    dispatch(updateCartQuantity(item.id, newQuantity));
  };

  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <div>
      <h2>Carrito de compras</h2>
      {cartItems.length === 0 ? (
        <p>No hay items en el carrito.</p>
      ) : (
        <div className="gridShowCarrito">
          {cartItems.map((item) => (
            <div key={item.id} className="product">
              <h3>{item.title}</h3>
              <img src={item.image} />
              <p>Precio: {item.price} €</p>
                Cantidad:
              <div>
                <button
                  onClick={() => handleQuantityChange(item.quantity - 1, item)}
                >
                  -
                </button>
                <input
                  type="number"
                  min="0"
                  value={item.quantity}
                  onChange={(event) => handleQuantityChange(event, item)}
                />
                <button
                  onClick={() => handleQuantityChange(item.quantity + 1, item)}
                >
                  +
                </button>
                {console.log(item.quantity)}
              </div>
              <button onClick={() => handleRemoveFromCart(item.id)}>
                Eliminar
              </button>
            </div>
          ))}
        </div>
      )}
      <h2>Total: {totalPrice.toFixed(2)} €</h2>
      <Link to="/">Volver</Link>
    </div>
  );
}

export default Carrito;
