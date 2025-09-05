import React from "react";
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "./StateProvider";
import { getBasketTotalPrice, totalQuantity } from "./reducer";
import { useNavigate } from "react-router-dom";

function Subtotal() {
  const navigate = useNavigate();
  const [{ basket, user }, dispatch] = useStateValue();

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({totalQuantity(basket)} items):
              <strong>{value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" />
              This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotalPrice(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
      <button
        onClick={(e) => {
          if (totalQuantity(basket) !== 0) {
            if (user) {
              navigate("/payment");
            } else {
              navigate("/login");
            }
          } else {
            navigate("/");
          }
        }}
      >
        {totalQuantity(basket) !== 0
          ? user
            ? "Proceed to checkout"
            : "Login to Proceed"
          : "Add Items to Cart"}
      </button>
    </div>
  );
}

export default Subtotal;
