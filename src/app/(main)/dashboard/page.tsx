'use client';
// pages/dashboard.tsx
import location from '../object/icon/location.svg';
import clock from '../object/icon/clock.svg';
import { useState, useEffect } from 'react';
import { refreshAccessToken } from '@/components/Auth/utils/api';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { dashboardApi } from '../api/api';
import { Banner_caps } from '../object/fonts/fonts';

const Page = () => {
	const router = useRouter();
	interface Item {
		id: number;
		object_name: string;
		object_type: 3;
		name: string;
		last_name: string;
		address: string;
		id_number: string;
		email: string;
		mobile: string;
		time_from: string;
		time_to: string;
		discount: null;
		facebook: string;
		instagram: string;
		description: string;
		image1: null;
	}

	const [userData, setUserData] = useState<Item[]>([]);

	useEffect(() => {
		async function fetchUserData() {
			try {
				const response = await dashboardApi();
				setUserData(response);
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
	const clearLocal = () => {
		localStorage.clear();
		router.replace('/');
	};

	return (
		<div>
			{/* Display user-specific content */}

			<div>
				<div
					className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4${Banner_caps.className} `}
				>
					<div className=' portfolio'>
						<h2 className='text-white text-center	font-bold text-lg pt-4'>
							{userData.object_name}
						</h2>

						<div className='detail clearfix pt-10 text-slate-400'>
							<ul className='mb-0'>
								<li>
									<span>
										<i className='fa fa-map-marker'></i> {userData.address}
									</span>
								</li>
								<li>
									<span className='active'>
										<i className='fa fa-user'></i>
										{userData.email}
									</span>
								</li>
								<li>
									<span>
										<i className='fa fa-list' aria-hidden='true'></i>
										{userData.mobile}
									</span>
								</li>
								<li>
									<span>
										<i className='fa fa-heart' aria-hidden='true'></i>
										{userData.time_from === undefined ||
										userData.time_from === null
											? ''
											: `${userData.time_from.slice(
													0,
													5
											  )} - ${userData.time_to.slice(0, 5)}`}
									</span>
								</li>
								<li>
									<Link href={`/editobject`}>
										<span className='cursor-pointer'>
											<i className='fa fa-list' aria-hidden='true'></i>
											რედაქტირება
										</span>
									</Link>
								</li>
								<li>
									<span className='cursor-pointer log-out' onClick={clearLocal}>
										<i className='fas fa-sign-out-alt'></i>გამოსვლა
									</span>
								</li>
							</ul>
						</div>
					</div>
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
												<span>
													{(userData.discount === 100 && <span>Free</span>) || (
														<span>{userData.discount} %</span>
													)}
												</span>
											</div>
										</div>
										<div className='bottom-left absolute'>განთავსება</div>
										<Image
											className='w-full'
											src={
												userData.image1 === undefined ||
												userData.image1 === null
													? 'https://follow.geoevents.ge/media/media/obieqtebi/318123540_140831465410945_5078453068844189760_n.jpg'
													: `${userData.image1}`
											}
											alt='anbani'
											width={500}
											height={500}
										/>
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
