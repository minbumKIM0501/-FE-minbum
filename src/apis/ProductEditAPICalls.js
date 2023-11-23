export const callProductEditAPI = ({ productCode, updatedFields }) => {
    console.log('[ProductEditAPICalls] Product Update API Call');
  
    const requestURL = `http://localhost:8000/products/${productCode}`;
  
    const productDTO = {
      productName: updatedFields.productName,
      productThumbAddr: updatedFields.productThumbAddr,
      refCategoryCode: updatedFields.refCategoryCode,
      price: updatedFields.price,
      productDesc: updatedFields.productDesc || '',
      wishPlaceTrade: updatedFields.wishPlaceTrade || '',
    };
    
    console.log(productDTO);
  
    return async (dispatch, getState) => {
      try {
        const response = await fetch(requestURL, {
          method: 'PUT', // PUT 메서드 사용
          headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
            'Authorization': 'Bearer ' + window.localStorage.getItem('accessToken'),
          },
          body: JSON.stringify(productDTO),
        });
  
        if (!response.ok) {
          throw new Error('상품 수정에 실패했습니다.');
        }
  
        const result = await response.json();
        console.log('[ProductEditAPICalls] callProductEditAPI RESULT:', result);
      } catch (error) {
        console.error('[ProductEditAPICalls] 상품 수정 API 호출 중 에러:', error);
      }
    };
  };
  