import axios from "axios";

const API_URL = `/api/v1/help-center`;

// Helper function to handle errors
const handleError = (error) => {
    const message = error.response?.data?.message || error.message || 'An error occurred';
    throw new Error(message);
};
  
// Helper function to handle responses
const handleResponse = (response) => response.data;

const createRequest = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/request`, data);
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
}

const getRequests = async () => {
    try {
        const response = await axios.get(`${API_URL}/requests`);
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
}

const getRequest = async (requestID) => {
    try {
        const response = await axios.get(`${API_URL}/request/${requestID}`);
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
}

const updateRequest = async (requestID, data) => {
    try {
        const response = await axios.put(`${API_URL}/request/${requestID}`, data);
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
}

const deleteRequest = async (requestID) => {
    try {
        const response = await axios.delete(`${API_URL}/request/${requestID}`);
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
}

const HelpCenterService = {
    createRequest,
    getRequests,
    getRequest,
    updateRequest,
    deleteRequest
};

export default HelpCenterService;