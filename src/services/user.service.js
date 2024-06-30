import axios from "axios";

const API_URL = `/api/v1/user/test`;

const getPublicContent = async () => {
  try {
    const response = await axios.get(API_URL + "/all");
    return { status: response.status, data: response.data };
  } catch (error) {
    return { status: error.response?.status || 500, message: error.message };
  }
};

const getUserBoard = async () => {
  try {
    const response = await axios.get(API_URL + "/user");
    return { status: response.status, data: response.data };
  } catch (error) {
    return { status: error.response?.status || 500, message: error.message };
  }
};

const getModeratorBoard = async () => {
  try {
    const response = await axios.get(API_URL + "/mod");
    return { status: response.status, data: response.data };
  } catch (error) {
    return { status: error.response?.status || 500, message: error.message };
  }
};

const getAdminBoard = async () => {
  try {
    const response = await axios.get(API_URL + "/admin");
    return { status: response.status, data: response.data };
  } catch (error) {
    return { status: error.response?.status || 500, message: error.message };
  }
};

const UserService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
};

export default UserService;