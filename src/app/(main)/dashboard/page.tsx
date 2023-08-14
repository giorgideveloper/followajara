'use client';

// import Image from 'next/image';
// import anbani from '../object/img/anbani.png';
// import location from '../object/icon/location.svg';
// import clock from '../object/icon/clock.svg';
// import localFont from 'next/font/local';
// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { refreshAccessToken } from '@/components/Auth/utils/api';

// const Page: React.FC = params => {
// 	interface Item {
// 		id: number;
// 		object_name: string;
// 		last_name: string;
// 		address: string;
// 		id_number: string;
// 		email: string;
// 		mobile: string;
// 		facebook: string;
// 		instagram: string;
// 		description: string;
// 		image1: string;
// 	}

// 	console.log(params);
// 	const API_URL = 'https://follow.geoevents.ge/api/object/'; // object API
// 	const [data, setData] = useState<Item[]>([]);

// 	useEffect(() => {
// 		const fetchData = async () => {
// 			try {
// 				const response = await axios.get(`${API_URL}`, {
// 					headers: {
// 						Authorization: `Bearer ${localStorage.getItem('access_token')}`,
// 					},
// 				});
// 				setData(response.data.results);
// 			} catch (error) {
// 				if (error.response && error.response.status === 401) {
// 					try {
// 						// Attempt to refresh the access token
// 						await refreshAccessToken();

// 						// Retry fetching user data
// 						// fetchUserData();
// 					} catch (refreshError) {
// 						// Handle refresh token error
// 						// Redirect to login or show an error message
// 					}
// 				}
// 			}
// 		};
// 		fetchData();
// 	}, []);
// 	return (
// 		<></>
{
	/* <div>
	<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4'>
		{data.map(item => (
			// eslint-disable-next-line react/jsx-key
			<Link href={`/object/${item.id}`}>
				<div className='card card-compact  cursor-pointer ' key={item.id}>
					<div className={`card-body `}>
						<div className='avatar'>
							<div className='w-full h-80 rounded-t-lg border-b-4 border-[#D98200] relative'>
								<div className='top-left absolute  '>
									<div className='top-left-bg'>
										<span>Free</span>
									</div>
								</div>
								<div className='bottom-left absolute'>განთავსება</div>
								<Image className='w-full' src={anbani} alt={item.object_name} />
							</div>
						</div>
						<div className='card-content '>
							<div className='card-title '>
								<h1 className={`text-3xl Banner_caps pt-3 pl-2 `}>
									{item.object_name}
								</h1>
							</div>

							<div className='card-info'>
								<ul className='ul'>
									<li className='li'>
										<Image className='w-4' src={location} alt='' />

										<span className='pl-2 '>{item.address}</span>
									</li>
									<li className='li'>
										<Image className='w-5 ' src={clock} alt='' />

										<span className='pl-2'>10:00-00:00</span>
									</li>
								</ul>
							</div>

							<div className='card-description'>
								<p className='font-banner-caps text-gray-500 pl-2'>
									{item.description}
								</p>
							</div>
						</div>
					</div>
				</div>
			</Link>
		))}
	</div>
</div>; */
}
// 	);
// };
// export default Page;

import anbani from '../object/img/anbani.png';
import location from '../object/icon/location.svg';
import clock from '../object/icon/clock.svg';
// pages/dashboard.tsx
import { useState, useEffect } from 'react';

import { refreshAccessToken } from '@/components/Auth/utils/api';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';

const API_BASE_URL = 'https://follow.geoevents.ge/api/object/'; // object API
const Page = () => {
	interface Item {
		id?: number;
		object_name?: string;
		last_name?: string;
		name?: string;
		address?: string;
		id_number?: string;
		email?: string;
		mobile?: string;
		time_from?: string;
		time_to?: string;
		discount?: number;
		facebook?: string;
		instagram?: string;
		description?: string;
		image1?: string | null;
		image2?: string | null;
		image3?: string | null;
		object_type?: number;
	}
	const [userData, setUserData] = useState<Item[]>([]);

	useEffect(() => {
		async function fetchUserData() {
			try {
				const accessToken = localStorage.getItem('access_token');
				const userId = localStorage.getItem('userId');
				if (!accessToken) {
					throw new Error('Access token not found');
				}

				const response = await axios.get(`${API_BASE_URL}${userId}`, {
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				});

				setUserData(response.data);
			} catch (error) {
				if (error.response && error.response.status === 401) {
					try {
						await refreshAccessToken();
						fetchUserData();
					} catch (refreshError) {
						// Handle refresh token error
						// Redirect to login or show an error message
					}
				}
			}
		}

		fetchUserData();
	}, []);

	return (
		<div>
			{/* Display user-specific content */}
			<div>
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4'>
					<Link href={`/object/${userData.id}`}>
						<div
							className='card card-compact  cursor-pointer '
							key={userData.id}
						>
							<div className={`card-body `}>
								<div className='avatar'>
									<div className='w-full h-80 rounded-t-lg border-b-4 border-[#D98200] relative'>
										<div className='top-left absolute  '>
											<div className='top-left-bg'>
												<span>Free</span>
											</div>
										</div>
										<div className='bottom-left absolute'>განთავსება</div>
										<Image className='w-full' src={userData.image1} alt='' />
									</div>
								</div>
								<div className='card-content '>
									<div className='card-title '>
										<h1 className={`text-3xl Banner_caps pt-3 pl-2 `}>
											{userData.object_name}
										</h1>
									</div>

									<div className='card-info'>
										<ul className='ul'>
											<li className='li'>
												<Image className='w-4' src={location} alt='' />

												<span className='pl-2 '>{userData.address}</span>
											</li>
											<li className='li'>
												<Image className='w-5 ' src={clock} alt='' />

												<span className='pl-2'>10:00-00:00</span>
											</li>
										</ul>
									</div>

									<div className='card-description'>
										<p className='font-banner-caps text-gray-500 pl-2'>
											{userData.description}
										</p>
									</div>
								</div>
							</div>
						</div>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Page;
