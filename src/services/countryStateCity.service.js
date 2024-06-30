import axios from 'axios';
import apiConfig from '../config/api.config';


const headers = {
    'X-CSCAPI-KEY': apiConfig.apiKey
};

const getCountries = async () => {
    const response = await axios.get(`${apiConfig.baseUrl}/countries`, { headers });
    return response.data;
};

const getStates = async (countryCode) => {
    const response = await axios.get(`${apiConfig.baseUrl}/countries/${countryCode}/states`, { headers });
    return response.data;
};

const getCities = async (countryCode, stateCode) => {
    const response = await axios.get(`${apiConfig.baseUrl}/countries/${countryCode}/states/${stateCode}/cities`, { headers });
    return response.data;
};

const CountryStateCityService = {
    getCountries,
    getStates,
    getCities
};

export default CountryStateCityService;