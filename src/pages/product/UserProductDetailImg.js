import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "../../styles/product/ProductDetailImg.css";



// const onErrorImg = (e) => {
//     e.target.src = "/images/home.svg";
// }

function UserProductDetailImg(productDetailImg) {
    console.log(productDetailImg.productDetailImg.detailImg1);

    const images = [
        {
            original: productDetailImg.productDetailImg.detailImg1
        },
    ];

    return(
        <>
            <ImageGallery items={images} showBullets={true} showFullscreenButton={false} showPlayButton={false} showThumbnails={false}/>
            {/* <img src={productDetailImg && productDetailImg} alt="상품 이미지" className={ProductDetailCSS.productDetailLeftImage} onError={onErrorImg}/> */}
        </>
    );
}

export default UserProductDetailImg;
