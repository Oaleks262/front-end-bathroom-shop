import React from "react";
import './ProductDetalPopup.css'



const ProductDetalPopup = ( {product , onClose }) => {


    return(
        <div className="ProductDetalPopup">



             <div className="popup-content">
             <span className="close" onClick={onClose}>&times;</span>
                <h2>Детальна інформація про товар</h2>
                <p><strong>Назва товару:</strong> {product.titleProduct}</p>
                <p><strong>Категорія:</strong> {product.category}</p>
                <p><strong>Ціна:</strong> {product.priceProduct} грн</p>
             </div>


        </div>
    )

}


export default ProductDetalPopup;

