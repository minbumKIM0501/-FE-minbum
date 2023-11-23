import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { callProductEditAPI } from '../../apis/ProductEditAPICalls';

function ProductEdit({ productCode }) {
    const [productName, setProductName] = useState('');
    const [productThumbAddr, setProductThumbAddr] = useState([]);
    const [refCategoryCode, setRefCategoryCode] = useState('');
    const [price, setPriceOption] = useState('sell');
    const [productDesc, setProductDesc] = useState('');
    const [wishPlaceTrade, setWishPlaceTrade] = useState('');

    useEffect(() => {
        const fetchProductInfo = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/products/${productCode}`);
                console.log('API Response:', response.data);
                const fetchedProductName = response.data.productName;
                setProductName(fetchedProductName);
            } catch(error) {
                console.error('상품 정보를 가져오는 도중 에러 발생: ', error);
            }
        };

        if (productCode) {
            fetchProductInfo();
        }
    }, [productCode]);

    const handleProductUpdate = () => {
        const updatedFields = {
            productCode,
            productName,
            productThumbAddr,
            refCategoryCode,
            price,
            productDesc,
            wishPlaceTrade
        };

        callProductEditAPI({ productCode, updatedFields });
    };

    return (
        <>
            <div>
                <h3>상품 수정</h3>
                <hr />
                <label htmlFor="product_name" id="product_name" className="font_all">
                    상품명 *
                </label>
                <input
                    type="text"
                    name="productName"
                    id="product_name"
                    className="input_box"
                    required
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                />
                <br />
                
            </div>
        </>
    );
}
export default ProductEdit;