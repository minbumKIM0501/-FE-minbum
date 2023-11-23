import ProductCategory from "../../components/product/ProductCategory";
import ProductFilter from "../../components/product/ProductFilter";
import ProductList from "../../components/product/ProductList";
import MergeLayoutCSS from "../../styles/product/MergeLayout.module.css";

function UsedProduct() {
    return (
        <>
            <div className={MergeLayoutCSS.mergeMain}>
                <ProductCategory type="list"/>
                <ProductFilter/>
                <ProductList type="list" />
            </div>
        </>  
    );
}

export default UsedProduct;