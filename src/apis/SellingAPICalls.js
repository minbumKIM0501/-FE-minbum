export const callProductRegistAPI = ({ form }) => {
  console.log('[ProduceAPICalls] SellingAPI Call');

  const requestURL = 'http://localhost:8000/products';

  const productDTO = {
    refUserCode: form.refUserCode,
    productName: form.productName,
    productThumbAddr: form.productThumbAddr,
    refCategoryCode: form.refCategoryCode,
    productPrice: form.productPrice,
    productDesc: form.productDesc || '',
    wishPlaceTrade: form.wishPlaceTrade || '',
  };
    console.log(productDTO);
    

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: 'POST', // POST 메서드 사용
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'Authorization': 'Bearer ' + window.localStorage.getItem('accessToken'), // 공백 추가
      },
      body: JSON.stringify(productDTO),
    })
      .then((response) => response.json());

    console.log('[ProduceAPICalls] callProductRegistAPI RESULT : ', result);

    // dispatch({ type: POST_PRODUCT, payload: result });
  };
};
