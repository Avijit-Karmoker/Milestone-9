import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "./Product.css";
import { Link } from "react-router-dom";

const Product = (props) => {
  // console.log(props);
  const { img, name, url, seller, price, stock, key } = props.product;
  return (
    <div className="product">
      <div className="product-img">
        <img src={img} alt="img" />
      </div>
      <div>
        <h4 className="product-name" href={url}>
          <Link to={"/product/"+key}>{name}</Link>
        </h4>
        <br />
        <p className="seller">By: {seller}</p>
        <p className="price">Price: ${price}</p>
        <br />
        <p className = "order-left">Only {stock} left in stoke - Order soon</p>
        { props.showAddToCart === true && <button
          className="button"
          onClick={() => {
            props.handleAddProduct(props.product);
          }}
        >
          <FontAwesomeIcon icon={faShoppingCart} />
          <span style={{ color: "white" }}> Add to cart</span>
        </button>}
      </div>
    </div>
  );
};

export default Product;
