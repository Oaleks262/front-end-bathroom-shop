import React from "react";
import HeaderWhite from "../Header/HeaderWhite";
import './ProductDetalPage.css'
import { useParams } from 'react-router-dom';



const ProductDetalPage = ( { product } ) => {
    const { id } = useParams(); // Отримання параметру id з URL

    // Отримання інформації про продукт за його id
    const products = product;


    return(
        <div className="ProductDetalPopup">
            <div className='content-padding'>
                <HeaderWhite/>
            <div className="popup-content">
                <h2>Детальна інформація про товар</h2>
                <p><strong>Назва товару:</strong> {products.titleProduct}</p>
                <p><strong>Категорія:</strong> {products.category}</p>
                <p><strong>Ціна:</strong> {products.priceProduct} грн</p>
             </div>
            </div>

        </div>
    )

}


export default ProductDetalPage;

