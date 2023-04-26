import { Link, useParams } from "react-router-dom";
import useFetch from "../customHooks/useFetch";
import { useDispatch, useSelector } from "react-redux";
import { addToCartOrUpdateQuantity } from "../actions/Actions";
import { FiShoppingCart } from "react-icons/fi";

export default function ProductDetails() {
  let { id } = useParams();

  const { data, error } = useFetch(
    `https://fakestoreapi.com/products/${id}`,
    id
  );
  const cartItems = useSelector((state) => state.cartItems);

  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCartOrUpdateQuantity(product));
    alert(`${data.title} se ha añadido correctamente al carrito`);
  };

  return (
    <div className="product">
      <Link to="/carrito" className="divCartButton">
        <FiShoppingCart />
        {cartItems.length > 0 && (
          <div className="cartItemCount">
            {cartItems.reduce((total, item) => total + item.quantity, 0)}
          </div>
        )}
      </Link>
      {error && <p>Error: {error}</p>}
      {data && (
        <div>
          <h3>{data.title}</h3>
          <h5>{data.description}</h5>
          <img src={data.image} alt={data.title} className="imageData" />
          <h5>{data.price}€</h5>
          <p>Categoria: {data.category}</p>
          <p>Rating: {data.rating.rate}</p>
          <p>aqui</p>

          <button onClick={() => handleAddToCart(data)}>
            Agregar al carrito
          </button>
        </div>
      )}
      <hr />
      <Link to="/carrito">Ir al Carrito</Link>
      <hr />
      <Link to="/">Volver</Link>
    </div>
  );
}
