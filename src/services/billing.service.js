import { user } from '@nextui-org/react';
import axios from 'axios';

const API_URL = `/api/v1/billing`;

// Helper function to handle errors
const handleError = (error) => {
    const message = error.response?.data?.message || error.message || 'An error occurred';
    throw new Error(message);
};
  
// Helper function to handle responses
const handleResponse = (response) => response.data;


const getBanks = async () => {
    try {
        const response = await axios.get(`${API_URL}/banks`);
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
}


const getBankAccountTypes = async () => {
    try {
        const response = await axios.get(`${API_URL}/bank-account-types`);
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
}


const getUserBankAccount = async ( userId, bankAccountId ) => {
    try {
        const response = await axios.get(`${API_URL}/${userId}/bank-account/${bankAccountId}`);
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
}


const getUserBankAccounts = async ( userId ) => {
    try {
        const response = await axios.get(`${API_URL}/user/${userId}/bank-accounts`);
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
}


const getUserPaymentCard = async ( userId, cardId ) => {
    try {
        const response = await axios.get(`${API_URL}/${userId}/payment-card/${cardId}`);
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }

}


const getUserPaymentCards = async ( userId ) => {
    try {
        const response = await axios.get(`${API_URL}/user/${userId}/payment-cards`);
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
}


const createBank = async ( name ) => {
    try {
        const response = await axios.post(
            `${API_URL}/bank`, 
            { name }
        );
        return handleResponse(response);
    }
    catch (error) {
        handleError(error);
    }
}


const createBankAccountType = async ( name ) => {
    try {
        const response = await axios.post(
            `${API_URL}/bank-account-type`, 
            { name }
        );
        return handleResponse(response);
    }
    catch (error) {
        handleError(error);
    }

}


const createUserBankAccount = async ( bankAccountData ) => {
    try {
        const response = await axios.post(
            `${API_URL}/user/create/bank-account`, 
            {...bankAccountData}
        );
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
}


const createUserPaymentCard = async ( cardData ) => {
    try {
        const response = await axios.post(
            `${API_URL}/user/create/payment-card`, 
            {...cardData}
        );
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
}


const updateBank = async ( id, name ) => {
    try {
        const response = await axios.put(
            `${API_URL}/banks/${id}`, 
            { name }
        );
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
}


const updateBankAccountType = async ( id, name ) => {
    try {
        const response = await axios.put(
            `${API_URL}/bank-account-types/${id}`, 
            { name }
        );
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
}


const updateUserBankAccount = async ( bankAccountId, bankAccountData ) => {
    try {
        const response = await axios.put(
            `${API_URL}/user/update/bank-account/${bankAccountId}`, 
            {...bankAccountData}
        );
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
}


const updateUserPaymentCard = async ( cardId, cardData ) => {
    try {
        const response = await axios.put(
            `${API_URL}/user/update/payment-card/${cardId}`, 
            {...cardData}
        );
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
}


const setFavoriteBankAccount = async ( id, userId ) => {
    try {
        const response = await axios.put(
            `${API_URL}/user/set/favorite-bank-account`, 
            {id, userId}
        );
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
}


const setFavoritePaymentCard = async ( userId, id ) => {
    try {
        const response = await axios.put(
            `${API_URL}/user/set/favorite-payment-card`, 
            {userId, id}
        );
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
}


const deleteBank = async ( id ) => {
    try {
        const response = await axios.delete(
            `${API_URL}/banks/${id}`
        );
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
}


const deleteBankAccountType = async ( id ) => {
    try {
        const response = await axios.delete(
            `${API_URL}/bank-account-types/${id}`
        );
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
}

const deleteUserBankAccount = async ( id, userId ) => {
    try {
        const response = await axios.delete(
            `${API_URL}/user/delete/bank-account`,
            {
                data: { id, userId } // Enviar datos en el cuerpo con 'data' para DELETE requests
            }
        );
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
}

const deleteUserPaymentCard = async ( id, userId ) => {
    try {
        const response = await axios.delete(
            `${API_URL}/user/delete/payment-card`,
            { id, userId }
        );
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }

}


const BillingService = {
    getBanks,
    getBankAccountTypes,
    getUserBankAccount,
    getUserBankAccounts,
    getUserPaymentCard,
    getUserPaymentCards, 
    createBank,
    createBankAccountType,
    createUserBankAccount,
    createUserPaymentCard,
    updateBank,
    updateBankAccountType,
    updateUserBankAccount,
    updateUserPaymentCard,
    setFavoriteBankAccount,
    setFavoritePaymentCard,
    deleteBank,
    deleteBankAccountType,
    deleteUserBankAccount,
    deleteUserPaymentCard
}


export default BillingService;