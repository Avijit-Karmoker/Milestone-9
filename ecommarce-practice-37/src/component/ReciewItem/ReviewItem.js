import React from 'react';

const ReviewItem = (props) => {
    const {name, quantity, key, price} = props.product;
    const reviewItemStyle = {
        borderBottom: '1px solid lightgray',
        marginBottom: '10px',
        paddingBottom: '5px',
        marginLeft: '5px'
    }
    return (
        <div style = {reviewItemStyle}>
            <h4 className="product-name">Name: {name}</h4>
            <p>Quantity: {quantity}</p>
            <p style = {{color: 'red'}}><small>$ {price}</small></p>
            <button className="button" onClick={() => props.removeProduct(key)}>Remove</button>
        </div>
    );
};

export default ReviewItem;