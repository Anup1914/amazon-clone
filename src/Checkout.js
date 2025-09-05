import React from "react";
import "./Checkout.css";
import Subtotal from "./Subtotal";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { motion, AnimatePresence } from "framer-motion";

function Checkout() {
  const [{ basket, user }, dispatch] = useStateValue();

  return (
    <div className="checkout">
      <div className="checkout__left">
        <img
          className="checkout__ad"
          alt=""
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
        ></img>
        <div>
          <h3>Hello, {user?.email}</h3>
          <h2 className="checkout__title">Your shopping Basket</h2>
          <AnimatePresence>
            {basket.map((item) => (
              <motion.div
                key={item.id} // 🔑 important for animations
                initial={{ opacity: 0, y: 20 }} // start state
                animate={{ opacity: 1, y: 0 }} // animate to
                exit={{ opacity: 0, y: -20 }} // when removed
                transition={{ duration: 0.5 }} // smoothness
              >
                <CheckoutProduct
                  id={item.id}
                  title={item.title}
                  image={item.image}
                  price={item.price}
                  rating={item.rating}
                  quantity={item.quantity}
                  hideQuantity
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
  );
}

export default Checkout;
