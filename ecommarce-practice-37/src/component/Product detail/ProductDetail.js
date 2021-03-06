import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetail = () => {
    const {productKey} = useParams();
    const [loading, setLoading] = useState(true);
    const product = fakeData.find(pd => pd.key === productKey);
    // console.log(product);
    document.title = "Product Details";
    return (
        <div>
            <h2>{productKey} detail coming soon</h2>
            <Product showAddToCart={false} product={product}></Product>
        </div>
    );
};

export default ProductDetail;