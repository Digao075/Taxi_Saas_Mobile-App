import axios from 'axios';

const API_URL = 'http://192.168.0.115:3333/api';

const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.log()
    throw error;
  }
};

export default {
  login,
};