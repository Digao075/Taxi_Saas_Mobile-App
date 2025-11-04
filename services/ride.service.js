import api from './api';

const requestRide = async (rideData) => {
  try {
    const response = await api.post('/rides', rideData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default {
  requestRide,
};