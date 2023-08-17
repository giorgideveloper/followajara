// Add more functions for other API requests
import axios from 'axios';
import { RegistrationType, RegistrationResponse } from './api.types';
import { refreshAccessToken } from '@/components/Auth/utils/api';

const baseURL = 'https://follow.geoevents.ge/api';
// Get all object
export const objectApi = async () => {
	try {
		const response = await axios.get(`${baseURL}/object/`);
		if (response.status === 400) {
			refreshAccessToken();
		}
		if (response.status === 401) {
			refreshAccessToken();
		}
		return response.data.results;
	} catch (error) {
		throw error;
	}
};
//Get info Text

export const infoText = async () => {
	try {
		const response = await axios.get(`${baseURL}/info/`);
		return response.data.results;
	} catch (error) {
		throw error;
	}
};

// Dashboard Api

export const dashboardApi = async () => {
	try {
		const accessToken = localStorage.getItem('access_token');
		const userId = localStorage.getItem('userId');
		if (!accessToken) {
			throw new Error('Access token not found');
		}
		const response = await axios.get(`${baseURL}/object/${userId}`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
		return response.data;
	} catch (error) {
		throw error;
	}
};

// Registration
export const postUserData = async (
	userData: RegistrationType
): Promise<RegistrationResponse> => {
	try {
		const response = await axios.post<RegistrationResponse>(
			`${baseURL}/user/registration/`,
			userData,

			{
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			}
		);

		const accessToken = response.data.access_data.access;
		const refreshToken = response.data.access_data.refresh;
		const user_id = response.data.user.id;

		// Store tokens in local storage or cookies
		localStorage.setItem('access_token', accessToken);
		localStorage.setItem('refresh_token', refreshToken);
		localStorage.setItem('userId', user_id);

		return accessToken;
	} catch (error) {
		throw error;
	}
};

// Editing

export const postEditUserData = async (
	userData: RegistrationType
): Promise<RegistrationResponse> => {
	try {
		const accessToken = localStorage.getItem('access_token');
		const userId = localStorage.getItem('userId');
		const response = await axios.put<RegistrationResponse>(
			`${baseURL}/user/update`,
			userData,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);

		return response.data;
	} catch (error) {
		console.log(error);
	}
};

// Add more functions for other API requests
// export const postEditUserData = async (
// 	userData: RegistrationType
// ): Promise<RegistrationResponse> => {
// 	try {
// 		const response = await axios.put<RegistrationResponse>(
// 			`${baseURL}/user/update`,
// 			userData,
// 			{
// 				headers: {
// 					'Content-Type': 'multipart/form-data',
// 				},
// 			}
// 		);
// };
