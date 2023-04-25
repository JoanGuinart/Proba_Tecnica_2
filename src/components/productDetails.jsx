import { Link, useParams } from "react-router-dom";
import useFetch from "../customHooks/useFetch";
import { useDispatch } from "react-redux";
import { addToCartOrUpdateQuantity } from "../actions/Actions";

export default function ProductDetails() {
  let { id } = useParams();

  const { data, error } = useFetch(
    `https://fakestoreapi.com/products/${id}`,
    id
  );

  const dispatch = useDispatch();
  
  const handleAddToCart = (product) => {
    dispatch(addToCartOrUpdateQuantity(product));
  };

  return (
    <div className="product">
      {error && <p>Error: {error}</p>}
      {data && (
        <div>
          <h3>{data.title}</h3>
          <h5>{data.description}</h5>
          <img src={data.image} alt={data.title} style={{ width: "25%" }} />
          <h5>{data.price}€</h5>
          <p>Categoria: {data.category}</p>
          <p>Rating: {data.rating.rate}</p>

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
