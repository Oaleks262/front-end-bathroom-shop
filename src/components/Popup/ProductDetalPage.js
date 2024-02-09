import React from "react";
import { getProductFromLocalStorage } from '../Cart/localSave';

const ProductDetailsPage = () => {
    // Отримуємо дані продукту з локального сховища
    const product = getProductFromLocalStorage();

    return (
        <div>
            {/* Відображаємо дані продукту */}
            <h2>{product.titleProduct}</h2>
            <img src={product.avatarUrl} alt={product.titleProduct} />
            <p>{product.aboutProduct}</p>
            <p>Ціна: {product.priceProduct} грн</p>
            {/* Додаткова інформація про продукт */}
        </div>
    );
};

export default ProductDetailsPage;
