import axios from 'axios';

const API_URL = `/api/v1/address`;

// Helper function to handle errors
const handleError = (error) => {
    const message = error.response?.data?.message || error.message || 'An error occurred';
    throw new Error(message);
};
  
// Helper function to handle responses
const handleResponse = (response) => response.data;


const getUserAddress = async ( userId, locationId ) => {
    try {
        const response = axios.get(`${API_URL}/${userId}/${locationId}`);
        handleResponse(response);
    } catch (error) {
        handleError(error);
    }
}


const getUserAddresses = async ( userId ) => {
    try {
        const response = await axios.get(`${API_URL}/${userId}/all`);
        handleResponse(response);
    } catch (error) {
        handleError(error);
    }
}


const createUserAddress = async ( userId, addressData ) => {
    try {
        const response = await axios.post(
            `${API_URL}/${userId}/create`, 
            {...addressData}
        );
        handleResponse(response);
    } catch (error) {
        handleError(error);
    }
}


const setFavoriteAddress = async ( userId, locationId ) => {
    try {
        const response = await axios.put(`${API_URL}/favorite/${userId}/${locationId}`);
        handleResponse(response);
    } catch (error) {
        handleError(error);
    }
}


const updateUserAddress = async ( userId, locationId, addressData ) => {
    try {
        const response = await axios.put(
            `${API_URL}/${userId}/${locationId}`, 
            {...addressData}
        );
        handleResponse(response);
    } catch (error) {
        handleError(error);
    }
}


const deleteUserAddress = async ( userId, locationId ) => {
    try {
        const response = await axios.delete(`${API_URL}/${userId}/${locationId}`);
        handleResponse(response);
    } catch (error) {
        handleError(error);
    }
}


const AddressService = {
    getUserAddress,
    getUserAddresses,
    createUserAddress,
    setFavoriteAddress,
    updateUserAddress,
    deleteUserAddress
};


export default AddressService;