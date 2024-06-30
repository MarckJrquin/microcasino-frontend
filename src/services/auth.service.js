import axios from 'axios';

const API_URL = `/api/v1/auth`;


// Helper function to handle errors
const handleError = (error) => {
    const message = error.response?.data?.message || error.message || 'An error occurred';
    throw new Error(message);
};
  
// Helper function to handle responses
const handleResponse = (response) => response.data;


const signin = async (username, password) => {
    try {
        console.log(API_URL);
        const response = await axios.post(`${API_URL}/signin`, { username, password });
        const user = handleResponse(response);
    
        if (user.username) {
            // Almacenar el usuario y la fecha de expiración en 24 horas
            const now = new Date();
            const expirationTime = now.getTime() + 24 * 60 * 60 * 1000; // 24 horas en milisegundos
            const userWithExpiration = { user, expirationTime };
            localStorage.setItem('user', JSON.stringify(userWithExpiration));
        }
    
        return user;
    } catch (error) {
        handleError(error);
    }
};


const signup = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/signup`, userData);
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
}


const signout = async () => {
    localStorage.removeItem('user');
    try {
        const response = await axios.post(`${API_URL}/signout`);
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
}


const forgotPassword = async (username, password) => {
    try {
        const response = await axios.put(`${API_URL}/forgotpassword`, { username, password });
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
}


const verifyRegistration = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/confirm/${token}`);
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
}


const getCurrentUser = () => {
    const userCookie = Cookies.get('user');
    return userCookie ? JSON.parse(userCookie) : null;
}


const AuthService = {
    signin,
    signup,
    signout,
    forgotPassword,
    verifyRegistration,
    getCurrentUser
}


export default AuthService;