import { combineReducers } from 'redux';

import reportReducer from './ReportModule';
import productCategoryReducer from './ProductCategoryModule';
import productListReducer from './ProductListModule';
import pagingReducer from './PagingModule';
import mergeReducer from './MergeModule';
import productReducer from './ProductModule';
import messageReducer from './MessageModule';
import wishListReducer from './WishListModule';
import userReducer from './UserModule';

const rootReducer = combineReducers({
    productCategoryReducer,
    productListReducer,
    reportReducer,
    pagingReducer,
    mergeReducer,
    productReducer,
    messageReducer,
    wishListReducer,
    userReducer
});
export default rootReducer;