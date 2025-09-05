import React from "react";
import "./CheckoutProduct.css";
import { useStateValue } from "./StateProvider";

function CheckoutProduct({
  id,
  image,
  title,
  price,
  rating,
  quantity,
  hideButton,
  hideQuantity,
}) {
  const [{ basket }, dispatch] = useStateValue();

  const removeFromBasket = () => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
  };

  const updateQuantity = (newQuantity) => {
    dispatch({
      type: "UPDATE_QUANTITY",
      item: {
        id: id,
        quantity: newQuantity,
      },
    });
  };

  return (
    <div className="checkoutProduct">
      <img className="checkoutProduct__image" alt="" src={image}></img>

      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">{title}</p>
        <p className="checkoutProduct__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="checkoutProduct__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>⭐</p>
            ))}
        </div>
        <div className="checkoutProduct__quantity">
          <span>Quantity: </span>
          {!hideButton && (
            <div className="checkoutProduct__quantity__box">
              <button
                onClick={() => {
                  if (quantity > 1) {
                    updateQuantity(quantity - 1);
                  } else {
                    removeFromBasket();
                  }
                }}
              >
                -
              </button>
              <span>{quantity}</span>
              <button onClick={() => updateQuantity(quantity + 1)}>+</button>
            </div>
          )}
          {!hideQuantity && <span>{quantity}</span>}
        </div>
        {!hideButton && (
          <button
            className="checkoutProduct__info__button"
            onClick={removeFromBasket}
          >
            Remove from basket
          </button>
        )}
      </div>
    </div>
  );
}

export default CheckoutProduct;
