// utils/api.js
import axios from 'axios';

const API_BASE_URL = 'https://follow.geoevents.ge/api'; // Replace with your actual API base URL

export const loginUser = async (email, password) => {
	try {
		const response = await axios.post(`${API_BASE_URL}/user/login/`, {
			email,
			password,
		});

		// Assuming the server returns an access token
		const accessToken = response.data.access;
		const refreshToken = response.data.refresh;
		const user_id = response.data.user_id;

		// Store tokens in local storage or cookies
		localStorage.setItem('access_token', accessToken);
		localStorage.setItem('refresh_token', refreshToken);
		localStorage.setItem('userId', user_id);

		return accessToken;
	} catch (error) {
		throw error;
	}
};
export const refreshAccessToken = async () => {
	try {
		const refreshToken = localStorage.getItem('refresh_token');

		if (!refreshToken) {
			throw new Error('Refresh token not found');
		}

		const response = await axios.post(`${API_BASE_URL}/user/login/refresh/`, {
			refresh_token: refreshToken,
		});

		const newAccessToken = response.data.access_token;

		// Update the access token in storage
		localStorage.setItem('access_token', newAccessToken);

		return newAccessToken;
	} catch (error) {
		throw error;
	}
};
