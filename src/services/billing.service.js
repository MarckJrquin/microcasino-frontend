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


const createCheckoutSessionForProducts = async ( product, userId) => {
    try {
        const response = await axios.post(`${API_URL}/create-checkout-session-for-products`, { ...product, userId });
        console.log(response);
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
}


const createCheckoutSessionForCredits = async ( amount, userId) => {
    try {
        const response = await axios.post(`${API_URL}/create-checkout-session-for-credits`, { amount, userId });
        console.log(response);
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
}


const getTrasactionDetails = async () => {
    try {
        const response = await axios.get(`${API_URL}/transaction-details`);
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
}


const getUserCreditsBalance = async ( userId ) => {
    try {
        const response = await axios.get(`${API_URL}/user/${userId}/credits`);
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }

}


const getCreditTransactionsHistory = async ( userId ) => {
    try {
        const response = await axios.get(`${API_URL}/user/${userId}/transactions`);
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
}

const getGameTransactionsHistory = async ( userId ) => {
    try {
        const response = await axios.get(`${API_URL}/user/${userId}/games`);
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
}


const withdrawCredits = async ( credits, userId ) => {
    try {
        const response = await axios.post(`${API_URL}/user/withdraw-credits`, { credits, userId });
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
}

const recordWin = async ( userId, credits ) => {
    try {
        const response = await axios.post(`${API_URL}/user/record-win`, { credits });
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
}

const recordBet = async ( userId, credits ) => {
    try {
        const response = await axios.post(`${API_URL}/user/record-bet`, { credits });
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
    createBank,
    createBankAccountType,
    createUserBankAccount,
    updateBank,
    updateBankAccountType,
    updateUserBankAccount,
    setFavoriteBankAccount,
    deleteBank,
    deleteBankAccountType,
    deleteUserBankAccount,
    createCheckoutSessionForProducts,
    createCheckoutSessionForCredits,
    getTrasactionDetails,
    getUserCreditsBalance,
    getCreditTransactionsHistory,
    getGameTransactionsHistory,
    withdrawCredits,
    recordWin,
    recordBet
}


export default BillingService;