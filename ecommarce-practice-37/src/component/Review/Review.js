import React, { useState, useEffect } from "react";
import './Review.css';
import fakeData from "../../fakeData";
import {
  getDatabaseCart,
  removeFromDatabaseCart,
} from "../../utilities/databaseManager";
import ReviewItem from "../ReciewItem/ReviewItem";
import Cart from "../Cart/Cart";
import happyImage from "../../images/giphy.gif"
import { useHistory } from "react-router";

const Review = () => {
  document.title = "Review";

  const [cart, setCart] = useState([]);
  const [orderPlaced] = useState(false);
  const history = useHistory();

  const handleProceedCheckout = () => {
    history.push('/shipment');
  }

  const removeProduct = (productKey) => {
    console.log("removed", productKey);
    const newCart = cart.filter((pd) => pd.key !== productKey);
    setCart(newCart);
    removeFromDatabaseCart(productKey);
  };

  useEffect(() => {
    //cart
    const savedCart = getDatabaseCart();
    const productKey = Object.keys(savedCart);
    const cartProducts = productKey.map((key) => {
      const product = fakeData.find((pd) => pd.key === key);
      product.quantity = savedCart[key];
      return product;
    });
    setCart(cartProducts);
  }, []);

  let thankYou;
  if(orderPlaced){
    thankYou = <img src={happyImage} alt=""/>
  }
  return (
    <div className="review-product">
      <div className="review-item">
        {cart.map(pd => 
          <ReviewItem
            product={pd}
            key={pd.key}
            removeProduct={removeProduct}
          ></ReviewItem>
        )}
        { thankYou }
      </div>
      <div className="review-cart">
            <Cart cart={cart}>
              <button onClick={handleProceedCheckout} className="button">Proceed Checkout</button>
            </Cart>
      </div>
    </div>
  );
};

export default Review;
