import { useEffect, useState } from 'react';
import MergeCategoryCSS from '../../styles/product/MergeCategory.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { GET_CATEGORY_CODE, GET_RESET_MERGE_CATEGERY_ALL } from '../../modules/ProductModule';
import { GET_MERGE_CATEGORY } from '../../modules/MergeModule';
import { useNavigate } from 'react-router-dom';
import { GET_PAGING } from '../../modules/PagingModule';

function MergeCategory() {

    const mergeCategory = useSelector(state => state.mergeReducer);

    const [ mergeCategoryBtn, setMergeCategoryBtn ] = useState("");

    const resetAll = useSelector(state => state.productReducer.resetMergeCategoryAll);

    const dispatch = useDispatch();

    useEffect( 
        () => {
            setMergeCategoryBtn(0);
        },[mergeCategory]
    );

    useEffect( 
        () => {
            setMergeCategoryBtn(0);
            dispatch({ type: GET_RESET_MERGE_CATEGERY_ALL, payload: 0});
            dispatch({ type: GET_MERGE_CATEGORY, payload: []});
        },[resetAll == 1]
    );

    const navigate = useNavigate();

    const curURL = new URL(window.location.href);

    const onClickHandler = filterNo => {
        setMergeCategoryBtn(filterNo);
        curURL.searchParams.set('categoryCode', filterNo);
        curURL.searchParams.delete('page');
        navigate(`${curURL.search}`);
        dispatch({ type: GET_CATEGORY_CODE, payload: filterNo});
        window.localStorage.setItem("remainMoneySearch", window.localStorage.getItem("remainMoney"));
    }

    return(
        <>
            <div className={MergeCategoryCSS.selectedCategories}>
                {mergeCategory.map(
                    category => <div onClick={() => onClickHandler(category.id)} className={mergeCategoryBtn === category.id ? MergeCategoryCSS.clickedSelectedCategory : MergeCategoryCSS.selectedCategory}>{category.categoryName}</div>
                )}
            </div>
        </>
    );
}

export default MergeCategory;
