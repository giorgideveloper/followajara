'use client';

import axios from 'axios';

import Image from 'next/image';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import location from '../icon/location.svg';
import clock from '../icon/clock.svg';
import anbani from '../img/anbani.png';
import phone from '../icon/phone.svg';
import email from '../icon/email.svg';
import folder from '../icon/folder.svg';
import user from '../icon/user.svg';
import fb from '../icon/fb.svg';
import inst from '../icon/inst.svg';
import { Banner_caps } from '../fonts/fonts';

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
const API_URL = 'https://follow.geoevents.ge/api';

export default function Page({ params }: { params: { id: string } }) {
	const [post, setPost] = useState<Item[]>([]);
	const [categoryType, setCategoryType] = useState('');
	useEffect(() => {
		const fetchPost = async () => {
			try {
				const response = await axios.get(`${API_URL}/object/${params.id}`);
				setPost(response.data);
			} catch (err) {
				console.log('🚀 ~ file: page.tsx:30 ~ fetchPost ~ err:', err);
			}
		};
		if (params.id) {
			fetchPost();
		}
	}, [params.id]);

	const typeSettings = () => {
		switch (post.object_type) {
			case 1:
				setCategoryType('ატრაქცია');
				break;
			case 2:
				setCategoryType('განთავსება');
				break;
			case 3:
				setCategoryType('კვება');
				break;
			default:
				setCategoryType('...');
		}
	};
	useEffect(() => {
		typeSettings();
	});

	return (
		<>
			<div className='container mx-auto my-4 px-7'>
				<div className=' grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2'>
					{post && (
						<>
							<div className='card card-compact col-span-3'>
								<div className={`card-body ${Banner_caps.className}`}>
									<div className='avatar'>
										<div className='w-full h-80 post-card rounded-t-lg border-b-4 border-[#D98200] relative'>
											<div className='top-left-main absolute  '>
												<div className='top-left-bg'>
													<span>
														{(post.discount === 100 && <span>Free</span>) || (
															<span>{post.discount} %</span>
														)}
													</span>
												</div>
											</div>

											<Image
												className='w-full'
												src={
													post.image1 === undefined || post.image1 === null
														? 'https://follow.geoevents.ge/media/media/obieqtebi/318123540_140831465410945_5078453068844189760_n.jpg'
														: `${post.image1}`
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
												{post.object_name}
											</h1>
										</div>

										<div className='card-description'>
											<p className='font-banner-caps text-gray-500 pl-2 text-lg'>
												{post.description}
											</p>
										</div>
									</div>
								</div>
							</div>
							<div className='my-4'>
								<div className='card-info '>
									<ul className='ul-post'>
										<li className='li-post'>
											<Image className='w-4' src={user} alt='' />

											<span className='pl-2 '>{post.object_name}</span>
										</li>

										<li className='li-post'>
											<Image className='w-4' src={location} alt='' />

											<span className='pl-2 '>{post.address}</span>
										</li>
										<li className='li-post'>
											<Image className='w-5 ' src={clock} alt='' />

											<span className='pl-2'>
												{post.time_from}-{post.time_to}
											</span>
										</li>
										<li className='li-post'>
											<Image className='w-4' src={phone} alt='' />

											<span className='pl-2 '>{post.mobile}</span>
										</li>
										<li className='li-post'>
											<Image className='w-4' src={email} alt='' />

											<span className='pl-2 '>{post.email}</span>
										</li>
										<li className='li-post'>
											<Image className='w-4' src={folder} alt='' />

											<span className='pl-2 '>{categoryType}</span>
										</li>
										<li className='li-post cursor-pointer'>
											<a className='pr-4' href={`${post.facebook}`}>
												{' '}
												<Image className='w-4' src={fb} alt='' />
											</a>
											<a href={`${post.instagram}`}>
												{' '}
												<Image className='w-4' src={inst} alt='' />
											</a>

											<span className='pl-2 '>{post.facebook}</span>
										</li>
									</ul>
								</div>
							</div>
						</>
					)}
				</div>
			</div>
		</>
	);
}
