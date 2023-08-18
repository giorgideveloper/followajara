'use client';
import Image from 'next/image';
import anbani from './img/anbani.png';
import argo from './img/argo.png';
import petra from './img/petra.png';
import location from './icon/location.svg';
import clock from './icon/clock.svg';
import localFont from 'next/font/local';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ObjectType } from '../api/api.types';
import { infoText, objectApi } from '../api/api';

export const metadata: Metadata = {
	title: 'რეგისტრაცია',
	openGraph: {
		title: 'რეგისტრაცია',
	},
};
const Banner_caps = localFont({
	src: './fonts/bpg_banner_caps.ttf',
	display: 'swap',
	variable: '--BPG-ExtraSquare-Mtavruli',
});

interface InfoType {
	id: number;
	description: string;
}
const Page: React.FC = () => {
	const [data, setData] = useState<ObjectType[]>([]);
	const [info, setInfo] = useState<InfoType[]>([]);
	const [lodaing, setLoading] = useState(false);
	const [categoryType, setCategoryType] = useState([]);
	const [type, setType] = useState([]);

	console.log('🚀 ~ file: page.tsx:44 ~ Page ~ data:', data);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response: any = await objectApi();
				setData(response);
				setLoading(true);
			} catch (e) {
				console.log(e);
			}
		};
		const fetchInfo = async () => {
			try {
				const response = await infoText();
				setInfo(response);
			} catch (error) {
				console.log('🚀 ~ file: page.tsx:54 ~ fetchData ~ error:', error);
			}
		};
		fetchData();
		fetchInfo();
	}, []);

	console.log(data);
	const userId = localStorage.getItem('userId');
	return (
		<>
			<div className='container mx-auto my-4 px-7 '>
				{info.map((item, index) => (
					<>
						<div key={item.id} className='info text-center pb-3 '>
							<h2
								className={` ${Banner_caps.className} m-4 pb-3`}
								key={item.id}
							>
								{item.description}
							</h2>
							{userId ? (
								''
							) : (
								<div className='id'>
									<Link
										className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-3 px-4  border border-gray-400 rounded shadow '
										href={{
											pathname: '/objlogin',
										}}
									>
										შესვლა
									</Link>
									<Link
										className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-3 px-4 border border-gray-400 rounded shadow '
										href={{
											pathname: '/objregister',
										}}
									>
										რეგისტრაცია
									</Link>
								</div>
							)}
						</div>
					</>
				))}

				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4'>
					{lodaing
						? data.map(item => (
								// eslint-disable-next-line react/jsx-key
								<Link key={item.id} href={`/object/${item.id}`}>
									<div
										className='card card-compact  cursor-pointer '
										key={item.id}
									>
										<div className={`card-body ${Banner_caps.className}`}>
											<div className='avatar'>
												<div className='w-full h-80 rounded-t-lg border-b-4 border-[#D98200] relative'>
													<div className='top-left absolute  '>
														<div className='top-left-bg'>
															<span>
																{(item.discount >= 100 && (
																	<span>Free</span>
																)) || <span>{item.discount} %</span>}
															</span>
														</div>
													</div>
													<div className='bottom-left absolute'>
														{(item.object_type === 1 && 'ატრაქცია') ||
															(item.object_type === 2 && 'განთავსება') ||
															(item.object_type === 3 && 'კვება')}
													</div>
													<Image
														className='w-full'
														src={
															item.image1 === undefined || item.image1 === null
																? ''
																: `${item.image1}`
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
														{item.object_name}
													</h1>
												</div>

												<div className='card-info'>
													<ul className='ul w-full'>
														<li className='li'>
															<Image className='w-4' src={location} alt='' />

															<span className='pl-2 '>{item.address}</span>
														</li>
														<li className='li'>
															<Image className='w-5 ' src={clock} alt='' />

															<span className='pl-2'>{`${item.time_from.slice(
																0,
																5
															)}-${item.time_to.slice(0, 5)}`}</span>
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
						  ))
						: 'Loading...'}
				</div>
			</div>
		</>
	);
};

export default Page;
