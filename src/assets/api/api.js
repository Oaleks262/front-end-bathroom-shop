import axios from "axios";

axios.defaults.baseURL = "https://bathroom-shop-api.onrender.com/api/";
// axios.defaults.baseURL = "http://localhost:2222/api/"

export const lendingData = {
    getProduct() {
       return axios.get("product");
    },
    getFeedback() {
        return axios.get("feedback");
     },
    postFeedback(feedbackData) {
        return axios.post("feedback", feedbackData);
     },
     postOrder(orderData) {
        return axios.post("order", orderData);
    }
};


export const AdminApi = {
    setToken(token) {
        axios.defaults.headers.common["Authorization"] = `${token}`;
        localStorage.setItem('authToken', token);
        return token;
      },
    loginAdmin(body) {
       return axios.post("/auth/login", body);
    },
    logoutAdmin(body) {
       return axios.post("/admin/logout", body);
    },
    getAdminProduct() {
        return axios.get("/admin/product");
    },
    postAdminProduct(body) {
        return axios.post("/admin/product", body);
    },
    putAdminProduct(productId, body) {
        return axios.put(`/admin/product/${productId}`, body);
    },
    deleteAdminProduct(productId) {
        return axios.delete(`/admin/product/${productId}`);
    },
    getAdminOrders() {
        return axios.get("/admin/order");
    },
    putAdminOrder(orderId, body) {
        return axios.put(`/admin/order/${orderId}`, body);
    },
    patchAdminOrderActivePosition(orderId, body) {
        return axios.patch(`/admin/orders/${orderId}/active-position`, body);
    },
    deleteAdminOrder(orderId) {
        return axios.delete(`/admin/orders/${orderId}`);
    },
    getAdminFeedback() {
        return axios.get("/admin/feedback");
    },
    deleteAdminFeedback(feedbackId) {
        return axios.delete(`/admin/feedback/${feedbackId}`);
    },
}
export default { lendingData, AdminApi };