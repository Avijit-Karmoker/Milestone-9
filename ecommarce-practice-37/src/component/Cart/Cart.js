import React from "react";

const Cart = (props) => {
  const cart = props.cart;
  // console.log(cart);
  // const total = cart.reduce((total, pdr) => total + pdr.price , 0)
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    const product = cart[i];
    total = total + product.price * product.quantity;
  }

  const tax = (total / 10).toFixed(2);
  const grandTotal = (total + Number(tax)).toFixed(2);
  const formatNumber = (num) => {
    const precision = num.toFixed(2);
    return Number(precision);
  };
  return (
    <div>
      <h4>Order Summery</h4>
      <p>Items Ordered: {cart.length}</p>
      <p>Product Price: {formatNumber(total)}</p>
      <p>Tax + Vat: {tax}</p>
      <p>Total Price: {grandTotal}</p>
      <br/>
      {
        props.children
      }
    </div>
  );
};

export default Cart;
