import axios from "axios";

const API_URL = `/api/v1/games`;

// Helper function to handle errors
const handleError = (error) => {
    const message = error.response?.data?.message || error.message || 'An error occurred';
    throw new Error(message);
};
  
// Helper function to handle responses
const handleResponse = (response) => response.data;


const getGameType = async ( gameTypeID ) => {
    try {
        const response = await axios.get(`${API_URL}/type/${gameTypeID}`);
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
}

const getGameTypes = async () => {
    try {
        const response = await axios.get(`${API_URL}/types`);
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
}

const getGame = async ( gameID ) => {
    try {
        const response = await axios.get(`${API_URL}/get/${gameID}`);
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
}


const getGames = async () => {
    try {
        const response = await axios.get(`${API_URL}/all`);
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
}


const getGamesByType = async (typeId) => {
    try {
        const response = await axios.get(`${API_URL}/type/${typeId}/games`);
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
};


const createGameType = async ( gameType ) => {
    try {
        const response = await axios.post(
            `${API_URL}/type/create`, 
            { gameType }
        );
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
}


const createGame = async ( game ) => {
    try {
        const response = await axios.post(
            `${API_URL}/create`, 
            { game }
        );
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
}


const updateGameType = async ( gameTypeID, gameType ) => {
    try {
        const response = await axios.put(
            `${API_URL}/type/update/${gameTypeID}`, 
            { gameType }
        );
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
}


const updateGame = async ( gameID, game ) => {
    try {
        const response = await axios.put(
            `${API_URL}/update/${gameID}`, 
            { game }
        );
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
}


const deleteGameType = async ( gameTypeID ) => {
    try {
        const response = await axios.delete(`${API_URL}/type/delete/${gameTypeID}`);
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
}


const deleteGame = async ( gameID ) => {
    try {
        const response = await axios.delete(`${API_URL}/delete/${gameID}`);
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
}


const GameService = {
    getGameType,
    getGameTypes,
    getGame,
    getGames,
    getGamesByType,
    createGameType,
    createGame,
    updateGameType,
    updateGame,
    deleteGameType,
    deleteGame
}


export default GameService;