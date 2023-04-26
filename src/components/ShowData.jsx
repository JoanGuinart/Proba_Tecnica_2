import React, { useState } from "react";
import useFetch from "../customHooks/useFetch";
import { useDispatch, useSelector } from "react-redux";
import { addToCartOrUpdateQuantity } from "../actions/Actions";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";

function ShowData() {
  const { data, error } = useFetch("https://fakestoreapi.com/products");

  const cartItems = useSelector((state) => state.cartItems);
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCartOrUpdateQuantity(product));
  };

  return (
    <div className="grid-container">
      {cartItems.length > 0 && (
        <Link to="/carrito" className="divCartButton">
          <FiShoppingCart />
          {cartItems.length > 0 && (
            <div className="cartItemCount">
              {cartItems.reduce((total, item) => total + item.quantity, 0)}
            </div>
          )}
        </Link>
      )}

      <h1>Shopping with REDUX</h1>
      <div className="product-grid">
        {error && <div>Error: {error}</div>}
        <div className={`gridShowData`}>
          {data &&
            data.map((product) => (
              <div key={product.id} className="product">
                <Link
                  className="LinkShowData"
                  to={`/product/${product.id}`}
                  key={product.id}
                >
                  <div className="overlay">
                    <p>Haz clic para ver más</p>
                  </div>
                  <img src={product.image} alt={product.title} />

                  <h5>{product.title}</h5>
                  <h4>{product.price} €</h4>
                  <h5>Stock: {product.rating.count}</h5>
                </Link>
                <button onClick={() => handleAddToCart(product)}>
                  Agregar al carrito
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default ShowData;
