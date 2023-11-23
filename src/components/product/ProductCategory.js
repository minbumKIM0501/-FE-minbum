import { useDispatch, useSelector } from 'react-redux';
import { callGetProductCategory } from '../../apis/ProductAPICalls';
import CategoryCSS from '../../styles/product/ProductCategory.module.css'
import ProductFilterCSS from '../../styles/product/ProductFilter.module.css'
import { useEffect, useState } from 'react';
import ButtonCSS from '../../styles/Button.module.css';
import { GET_MERGE_CATEGORY } from '../../modules/MergeModule';
import { GET_CATEGORY_CODE, GET_MONEY_SETTING, GET_RESET_PRODUCT_CATEGERY, GET_SEARCH_AGAIN } from '../../modules/ProductModule';
import { useNavigate } from 'react-router-dom';
import MoneyFilter from './MoneyFilter';

function ProductCategory(type) {
    const [ categoryLists, setCategoryLists ] = useState([]);

    const reset = useSelector(state => state.productReducer.resetProductCategory);

    useEffect(
        () => {
            dispatch(callGetProductCategory());
        },[]
    );

    useEffect(
        () => {
            setCategoryLists([]);
            dispatch({ type: GET_RESET_PRODUCT_CATEGERY, payload: 0});
        },[reset == 1]
    );

    let changeCategoryLists = [];

    const productCategories = useSelector(state => state.productCategoryReducer);

    let checkFive = categoryLists.filter(category => category.categoryChecked === true);

    let upperCategory = [];
        
    let upperCategoryCount = 0;
    for(let category of productCategories) {
        if(category.upperCategoryCode === 0) {
            upperCategoryCount++;
        }
        changeCategoryLists.push({ id: category.categoryCode, categoryName: category.categoryName, categoryChecked: false });
    }
    
    for(let i = 1; i <= upperCategoryCount; i++) {
        let lowerCategory = [];
        for(let category of productCategories) {
            if(category.upperCategoryCode === i || category.categoryCode === i) {
                lowerCategory.push([category.categoryCode, category.categoryName, category.upperCategoryCode]);
            }
        }
        upperCategory.push(lowerCategory);
    }

    const getMoneySetting = useSelector(state => state.productReducer.getMoneySetting);

    useEffect(
        () => {
            if(getMoneySetting === 1) {
                onClickHandler();
            }
            dispatch({ type: GET_MONEY_SETTING, payload: 0});
        },[getMoneySetting === 1]
    );

    const dispatch = useDispatch();

    useEffect(
        () => {
            const url = new URL(window.location.href);
            const categoryId = url.searchParams.get("categoryCode");
            if(changeCategoryLists.length !== 0 && type.type === "list") {
                if(categoryId) {
                    changeCategoryLists.map(categoryList => {
                        if(categoryList.id == categoryId) {
                            categoryList.categoryChecked = !categoryList.categoryChecked;
                        }
                    });
                    changeCategoryLists = [...changeCategoryLists];
                    setCategoryLists(changeCategoryLists);
                } else {
                    changeCategoryLists.map(categoryList => {
                        if(categoryList.id == 6) {
                            categoryList.categoryChecked = !categoryList.categoryChecked;
                        }
                    });
                    changeCategoryLists = [...changeCategoryLists];
                    setCategoryLists(changeCategoryLists);
                }
            }
        },[changeCategoryLists.length !== 0]
    );

    const navigate = useNavigate();

    const curURL = new URL(window.location.href);
    
    const categoryBtnHandler = id => {
        if(categoryLists.length === 0) {
            changeCategoryLists.map(categoryList => {
                if(categoryList.id === id) {
                    categoryList.categoryChecked = !categoryList.categoryChecked;
                }
            });
            changeCategoryLists = [...changeCategoryLists];

            let checkFive = changeCategoryLists.filter(category => category.categoryChecked === true);
            setCategoryLists(changeCategoryLists);
        } else {
            categoryLists.map(categoryList => {
                if(categoryList.id === id) {
                    categoryList.categoryChecked = !categoryList.categoryChecked;
                }
            });
            changeCategoryLists = [...categoryLists];
            
            let checkFive = categoryLists.filter(category => category.categoryChecked === true);
            if(checkFive.length <= 5 && type.type === "merge") {
                setCategoryLists(changeCategoryLists);
            } else {
                if(type.type === "merge") {
                    alert("최대 5개의 카테고리까지 선택할 수 있습니다.");
                    categoryLists.map(categoryList => {
                        if(categoryList.id === id) {
                            categoryList.categoryChecked = !categoryList.categoryChecked;
                        }
                    });
                } else {
                    categoryLists.map(categoryList => {
                        if(categoryList.id !== id && categoryList.categoryChecked === true) {
                            categoryList.categoryChecked = !categoryList.categoryChecked
                        }
                    });
                    setCategoryLists(changeCategoryLists);
                }
            }
        }
        if (type.type === "list") {
            curURL.searchParams.set('categoryCode', id);
            curURL.searchParams.delete('page');
            const minPriceValue = window.localStorage.getItem("moneyCriteriaMin");
            const maxPriceValue = window.localStorage.getItem("moneyCriteriaMax");
            if (maxPriceValue && minPriceValue > maxPriceValue) {
                alert("최대금액은 최소금액보다 크거나 같아야 합니다.");
            } else {
                minPriceValue ? curURL.searchParams.set('minPrice', minPriceValue) : curURL.searchParams.delete('minPrice');
                maxPriceValue ? curURL.searchParams.set('maxPrice', maxPriceValue) : curURL.searchParams.delete('maxPrice');
            }
            dispatch({ type: GET_CATEGORY_CODE, payload: checkFive[0].id });
            navigate(`${curURL.search}`);
            dispatch({ type: GET_SEARCH_AGAIN, payload: 1});
        }
    }

    const onClickHandler = () => {
        if(checkFive.length === 0) {
            alert("최소 1개의 카테고리를 선택해주세요");
        } else if(!window.localStorage.getItem("burget") && type.type === "merge") {
            alert("예산을 설정해주세요");
            dispatch({ type: GET_SEARCH_AGAIN, payload: 1});
        } else if (type.type === "list") {
            curURL.searchParams.set('categoryCode', checkFive[0].id);
            curURL.searchParams.delete('page');
            const minPriceValue = window.localStorage.getItem("moneyCriteriaMin");
            const maxPriceValue = window.localStorage.getItem("moneyCriteriaMax");
            if (maxPriceValue && minPriceValue > maxPriceValue) {
                alert("최대금액은 최소금액보다 크거나 같아야 합니다.");
            } else {
                minPriceValue ? curURL.searchParams.set('minPrice', minPriceValue) : curURL.searchParams.delete('minPrice');
                maxPriceValue ? curURL.searchParams.set('maxPrice', maxPriceValue) : curURL.searchParams.delete('maxPrice');
            }
            dispatch({ type: GET_CATEGORY_CODE, payload: checkFive[0].id });
            navigate(`${curURL.search}`);
            dispatch({ type: GET_SEARCH_AGAIN, payload: 1});
        } else {
            dispatch({ type: GET_MERGE_CATEGORY, payload: checkFive});
            dispatch({ type: GET_CATEGORY_CODE, payload: 0});
            navigate(``);
        }
    }

    let styleObject;

    if(window.location.href.toString().indexOf("merge") !== -1) {
        styleObject = {minWidth: 700};
    } else {
        styleObject = {minWidth: 937};
    }

    return(
        <>
            <div className={CategoryCSS.cateAll}>
                {upperCategory.map(upperCategory => 
                    <div className={CategoryCSS.cate0}>
                    <div className={CategoryCSS.cate1}>
                        <div className={CategoryCSS.cateUpper}>{upperCategory[0][1]}</div>
                    </div>
                    <div className={CategoryCSS.cate2} style={styleObject}>
                        {upperCategory.map(upperCategory => 
                            upperCategory[2] !== 0 ? <div id={upperCategory[0]} className={categoryLists.length !== 0 && categoryLists[upperCategory[0]-1].categoryChecked ? CategoryCSS.cate3Selected : CategoryCSS.cate3} onClick={() => categoryBtnHandler(upperCategory[0])}>{upperCategory[1]}</div> : ""
                        )}
                        
                    </div>
                </div>
                )} 

                <div className={ ProductFilterCSS.listFilterBox}>
                    {styleObject.minWidth === 937 ? <MoneyFilter/> : ""}
                    <button onClick={() => onClickHandler()} className={`${ButtonCSS.smallBtn2} ${CategoryCSS.categorySearchBtn}`}>검색</button>
                </div>
                
            </div>
        </>
    );
}

export default ProductCategory;