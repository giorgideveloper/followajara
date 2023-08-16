// Add more functions for other API requests
import axios from 'axios';
import { RegistrationType, RegistrationResponse } from './api.types';

const baseURL = 'https://follow.geoevents.ge/api';
// Get all object
export const objectApi = async () => {
	try {
		const response = await axios.get(`${baseURL}/object/`);
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

		return response.data;
	} catch (error) {
		throw error;
	}
};

// Editing

export const postEditUserData = async (
	userData: RegistrationType
): Promise<RegistrationResponse> => {
	try {
		const response = await axios.put<RegistrationResponse>(
			`${baseURL}/user/update`,
			userData,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			}
		);

		return response.data;
	} catch (error) {
		throw error;
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