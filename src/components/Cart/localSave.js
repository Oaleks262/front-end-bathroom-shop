

export const getCartFromLocalStorage = () => {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  };
  
  export const setCartToLocalStorage = (newProduct) => {
    const storedCart = getCartFromLocalStorage();
  
    // Перевіряємо, чи продукт вже є в кошику за допомогою його _id
    const existingProductIndex = storedCart.findIndex(item => item._id === newProduct._id);
  
    // Якщо продукт вже є в кошику, збільшуємо кількість на одиницю
    if (existingProductIndex !== -1) {
      storedCart[existingProductIndex].quantity += 1;
    } else {
      // Якщо продукт відсутній в кошику, додаємо його з кількістю 1
      newProduct.quantity = 1;
      storedCart.push(newProduct);
    }
  
    // Зберігаємо кошик у локальному сховищі
    localStorage.setItem('cart', JSON.stringify(storedCart));
  };
  
  export const clearCartFromLocalStorage = () => {
    localStorage.removeItem('cart');
};

// Отримати продукт з локального сховища
export const getProductFromLocalStorage = () => {
  const productData = localStorage.getItem('product');
  return productData ? JSON.parse(productData) : [];
};

// Зберегти продукт у локальному сховищі
export const setProductToLocalStorage = (productObject) => {
  const productData = JSON.stringify(productObject);
  localStorage.setItem('product', productData);
};
