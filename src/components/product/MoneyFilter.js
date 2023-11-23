
import { useEffect, useState } from 'react';
import ProductFilterCSS from '../../styles/product/ProductFilter.module.css'
import { useDispatch } from 'react-redux';
import { GET_MONEY_SETTING } from '../../modules/ProductModule';
function MoneyFilter() {

    const [ moneyCriteria, setMoneyCriteria ] = useState({
        minPriceValue: '',
        maxPriceValue: ''
    });

    const { minPriceValue, maxPriceValue } = moneyCriteria;

    const dispatch = useDispatch();

    const onChangeHandler = e => {
        if(e.key === 'Enter') {
            dispatch({ type: GET_MONEY_SETTING, payload: 1});
        }
        const changedMoneyValue = {
            ...moneyCriteria,
            [e.target.name]: e.target.value.replace(/[^0-9]/g, '')
        };
        setMoneyCriteria(changedMoneyValue);
        window.localStorage.setItem("moneyCriteriaMin", changedMoneyValue.minPriceValue);
        window.localStorage.setItem("moneyCriteriaMax", changedMoneyValue.maxPriceValue);
    }

    useEffect(
        () => {
            window.localStorage.setItem("moneyCriteriaMin", moneyCriteria.minPriceValue);
            window.localStorage.setItem("moneyCriteriaMax", moneyCriteria.maxPriceValue);
        },[]
    );

    return (
        <>
            <label>
                <input onKeyDown={onChangeHandler} type="text" name="minPriceValue" value={minPriceValue} onChange={onChangeHandler} className={ProductFilterCSS.setMoneyFilter} placeholder="최소 가격"/>
            </label>
            <div className={ProductFilterCSS.moneyBetween}>~</div>
            <label>
                <input onKeyDown={onChangeHandler} type="text" name="maxPriceValue" value={maxPriceValue} onChange={onChangeHandler} className={ProductFilterCSS.setMoneyFilter} placeholder="최대 가격"/>
            </label>
        </>
    );
}

export default MoneyFilter;