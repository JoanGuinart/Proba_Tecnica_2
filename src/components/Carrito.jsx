import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateCartQuantity } from "../actions/Actions";
import { Link } from "react-router-dom";

function Carrito() {
  const cartItems = useSelector((state) => state.cartItems);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
    console.log(id);
  };

  const handleQuantityChange = (quantity, item) => {
    dispatch(updateCartQuantity(item.id, quantity));
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
              <p>
                Cantidad:
                <button
                  onClick={() => handleQuantityChange(item.quantity - 1, item)}
                >
                  -
                </button>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(event) => handleQuantityChange(event, item)}
                />
                <button
                  onClick={() => handleQuantityChange(item.quantity + 1, item)}
                >
                  +
                </button>
                {console.log(item.quantity)}
              </p>
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
