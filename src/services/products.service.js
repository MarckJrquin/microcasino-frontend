import axios from "axios";

const API_URL = `/api/v1/products`;

// Helper function to handle errors
const handleError = (error) => {
    const message = error.response?.data?.message || error.message || 'An error occurred';
    throw new Error(message);
};
  
// Helper function to handle responses
const handleResponse = (response) => response.data;


const getProduct = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/get/${id}`);
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
};


const getAllProducts = async () => {
    try {
        const response = await axios.get(`${API_URL}/list`);
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
};


const createProduct = async (productData) => {
    try {
        const response = await axios.post(`${API_URL}/create`, productData);
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
};


const updateProduct = async (id, productData) => {
    try {
        const response = await axios.put(`${API_URL}/update/${id}`, productData);
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
};


const deleteProduct = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/delete/${id}`);
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
};

const ProductService = {
    getProduct,
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct
};

export default ProductService;