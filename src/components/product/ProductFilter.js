import ProductFilterCSS from '../../styles/product/ProductFilter.module.css';
import ProductCategoryCSS from '../../styles/product/ProductCategory.module.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GET_PRODUCT_FILTER, GET_RESET_FILTER } from '../../modules/ProductModule';
import { useDispatch, useSelector } from 'react-redux';

function ProductFilter() {

    const [checkedBtn, setCheckedBtn ] = useState(1);
   
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const reset = useSelector(state => state.productReducer.resetFilter);

    const url = new URL(window.location.href);

    useEffect( 
        () => {
            if(url.searchParams.get("sortCondition")) {
                switch(url.searchParams.get("sortCondition")) {
                    case "latest":
                        setCheckedBtn(1);
                        break;
                    case "maxPrice":
                        setCheckedBtn(2);
                        break;
                    case "minPrice":
                        setCheckedBtn(3);
                        break;
                    default:
                        setCheckedBtn(1);
                        break;                        
                }
            } else {
                setCheckedBtn(1);
            }
            dispatch({ type: GET_RESET_FILTER, payload: 0});
        },[reset == 1]
    );

    const curURL = new URL(window.location.href);

    const onClickHandler = filterNo => {
        setCheckedBtn(filterNo);
        dispatch({ type: GET_PRODUCT_FILTER, payload: filterNo});
        
        switch(filterNo) {
            case 1:
                curURL.searchParams.set('sortCondition', "latest");
                navigate(`${curURL.search}`);
                break;
            case 2:
                curURL.searchParams.set('sortCondition', "maxPrice");
                navigate(`${curURL.search}`);
                break;
            case 3:
                curURL.searchParams.set('sortCondition', "minPrice");
                navigate(`${curURL.search}`);
                break;
            default:
                curURL.searchParams.set('sortCondition', "latest");
                navigate(`${curURL.search}`);
                break;
        }
    }
    
    return(
        <>
            <div className={ProductFilterCSS.productFilterContainer}>
                <div className={ProductFilterCSS.productFilter}>
                    <div onClick={() => onClickHandler(1)} className={`${ProductFilterCSS.filterName} ${checkedBtn === 1 ? ProductCategoryCSS.cate3Selected : ProductCategoryCSS.cate3}`}>최신순</div>
                    <div onClick={() => onClickHandler(2)} className={`${ProductFilterCSS.filterName} ${checkedBtn === 2 ? ProductCategoryCSS.cate3Selected : ProductCategoryCSS.cate3}`}>고가순</div>
                    <div onClick={() => onClickHandler(3)} className={`${ProductFilterCSS.filterName} ${checkedBtn === 3 ? ProductCategoryCSS.cate3Selected : ProductCategoryCSS.cate3}`}>저가순</div>
                </div>
            </div>
        </>
    )
}

export default ProductFilter;