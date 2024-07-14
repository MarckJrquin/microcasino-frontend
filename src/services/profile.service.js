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


const editPassword = async ( data ) => {
    try {
        const response = await axios.put(`${API_URL}/changepassword`, data );
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
}


const uploadProfilePicture = async (profilePictureFile) => {
    // Crea un objeto FormData para enviar la imagen al servidor
    const formData = new FormData();
    formData.append("profilePicture", profilePictureFile);
  
    try {
        // Realiza la solicitud POST utilizando Axios
        const response = await axios.post(`${API_URL}/profile/upload`, formData, {
            headers: {
                "Content-Type": "multipart/form-data", // Asegúrate de configurar el encabezado correcto para datos multipartes
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}

const deleteProfilePicture = async () => {
    try {
        const response = await axios.delete(`${API_URL}/profile/delete`);
        return response.data;
    } catch (error) {
        throw new Error(error.response);
    }
}


const ProfileService = {
    getProfileData,
    getProfilePhoto,
    editProfile,
    editPassword,
    uploadProfilePicture,
    deleteProfilePicture
}


export default ProfileService;