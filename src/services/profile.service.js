import axios from 'axios';

const API_URL = `/api/v1/user`;


// Helper function to handle errors
const handleError = (error) => {
    const message = error.response?.data?.message || error.message || 'An error occurred';
    throw new Error(message);
};
  
// Helper function to handle responses
const handleResponse = (response) => response.data;


const getProfileData = async () => {
    try {
        const response = await axios.get(`${API_URL}/profile`);
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
}


const getProfilePhoto = async () => {
    try {
        const response = await axios.get(`${API_URL}/profile/photo`);
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
}


const editProfile = async ( profileData ) => {
    try {
        const response = await axios.put(`${API_URL}/edit/profile`, {...profileData});
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
}


const editPassword = async (oldPassword, newPassword) => {
    try {
        const response = await axios.put(`${API_URL}/changepassword`, {oldPassword, newPassword});
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
}


const ProfileService = {
    getProfileData,
    getProfilePhoto,
    editProfile,
    editPassword
}


export default ProfileService;