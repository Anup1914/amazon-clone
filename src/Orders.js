import React, { useEffect, useState } from "react";
import "./Orders.css";
import { useStateValue } from "./StateProvider";
import { db } from "./firebase";
import Order from "./Order";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

function Orders() {
  //console.log("rendered");
  const [{ basket, user }, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      const ordersRef = collection(db, "users", user?.uid, "orders");
      const q = query(ordersRef, orderBy("created", "desc"));

      onSnapshot(q, (snapshot) => {
        const fetchedOrders = snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));

        setOrders(fetchedOrders);
        //console.log("Fetched Orders:", fetchedOrders);
      });
    } else {
      setOrders([]);
    }
  }, [user]);

  return (
    <div className="orders">
      <h1>Your Orders</h1>

      <div className="orders__order">
        {orders?.map((order) => (
          <Order order={order} />
        ))}
      </div>
    </div>
  );
}

export default Orders;
