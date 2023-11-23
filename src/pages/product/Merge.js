import { useSelector } from "react-redux";
import MergeBox from "../../components/product/MergeBox";
import MergeCategory from "../../components/product/MergeCategory";
import ProductCategory from "../../components/product/ProductCategory";
import ProductFilter from "../../components/product/ProductFilter";
import ProductList from "../../components/product/ProductList";
import MergeLayoutCSS from "../../styles/product/MergeLayout.module.css";

function Merge() {

    let getCategoryCode = useSelector(state => state.productReducer.getCategoryCode);

    const url = new URL(window.location.href);


    let styleObject;

    if(window.location.href.toString().indexOf("merge") !== -1) {
        styleObject = {height: 1200};
    } else {
        styleObject = {height: 1260};
    }

    return(
        <>
            <div className={MergeLayoutCSS.mergeMain} style={styleObject}>
                <ProductCategory type="merge"/>
                <MergeCategory/>
                {url.searchParams.get("categoryCode") && getCategoryCode ? <ProductFilter/> : ""}
                {url.searchParams.get("categoryCode") && getCategoryCode ? <ProductList type="merge"/> : ""}
                <MergeBox/>
            </div>
        </>
    );
}

export default Merge;