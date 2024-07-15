import axios from "axios";

const API_URL = `/api/v1/banner-add`;

// Helper function to handle errors
const handleError = (error) => {
    const message = error.response?.data?.message || error.message || 'An error occurred';
    throw new Error(message);
};
  
// Helper function to handle responses
const handleResponse = (response) => response.data;


const getBannerAdd = async ( id ) => {
    try {
        const response = await axios.get(`${API_URL}/get/${id}`);
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
}

const getAllBannerAdds = async () => {
    try {
        const response = await axios.get(`${API_URL}/all`);
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
}

const getBannerAddsByType = async ( type ) => {
    try {
        const response = await axios.get(`${API_URL}/type/${type}`);
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
}

const getActiveBannerAdds = async () => {   
    try {
        const response = await axios.get(`${API_URL}/list/active`);
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
}

const getInactiveBannerAdds = async () => {
    try {
        const response = await axios.get(`${API_URL}/list/inactive`);
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
}

const createBannerAdd = async ( bannerAdd ) => {
    try {
        const response = await axios.post(
            `${API_URL}/create`, 
            bannerAdd
        );
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
}

const updateBannerAdd = async ( id, bannerAdd ) => {
    try {
        const response = await axios.put(
            `${API_URL}/update/${id}`, 
            bannerAdd
        );
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
}

const deleteBannerAdd = async ( id ) => {
    try {
        const response = await axios.delete(`${API_URL}/delete/${id}`);
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
}

const BannerAddService = {
    getBannerAdd,
    getAllBannerAdds,
    getBannerAddsByType,
    getActiveBannerAdds,
    getInactiveBannerAdds,
    createBannerAdd,
    updateBannerAdd,
    deleteBannerAdd
};

export default BannerAddService;