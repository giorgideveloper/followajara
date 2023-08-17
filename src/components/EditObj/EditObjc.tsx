'use client';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { RegistrationType } from '@/app/(main)/api/api.types';
import {
	dashboardApi,
	objectApi,
	postEditUserData,
	postUserData,
} from '@/app/(main)/api/api';

const EditObjc = ({ data }) => {
	const defaultValues: any = {
		object_name: data.object_name,
		object_type_value: data.object_type,
		name: data.name,
		last_name: data.last_name,
		address: data.address,
		id_number: data.id_number,
		email: data.email,
		mobile: data.mobile,
		time_from_type: data.time_from,
		time_to_type: data.time_to,
		numberDiscount: data.discount,
		facebook: data.facebook,
		instagram: data.instagram,
		description: data.description,
		image1: data.image1,
	};
	// image1: null as File | string, // TODO : ปรับ type เป็น file
	const [editData, setEditData] = useState<any>(data);
	const router = useRouter();
	const [editStatus, setEditStatus] = useState('');
	const [type, setType] = useState('');

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setEditData(prevData => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleNumberDiscountChange = e => {
		const value = e.target.value;
		console.log(value);
		setEditData(prevData => ({
			...prevData,
			discount: value,
			object_type: value,
		}));
	};

	const handleImageInputChange = e => {
		const imageFile = e.target.files[0];
		setEditData(prevData => ({
			...prevData,
			image1: imageFile,
		}));
	};
	const handleTimeInputChange = (name, value) => {
		setEditData(prevData => ({
			...prevData,
			[name]: value,
		}));
	};

	useEffect(() => {
		setEditData(data);
	}, []);

	const handleSubmit = async e => {
		e.preventDefault();
		try {
			const response = await postEditUserData(editData);
			setEditStatus(response.message);

			setTimeout(() => {
				router.replace('/dashboard');
			}, 100);
		} catch (error) {
			console.error('Error editing user:', error);
			setEditStatus('Error editing user');
		}
	};
	// useEffect(() => {
	// 	switch (editData.object_type) {
	// 		case 1:
	// 			setType('ატრაქცია');
	// 			break;
	// 		case 2:
	// 			setType('განთავსება');

	// 			break;
	// 		case 3:
	// 			setType('კვება');

	// 			break;
	// 		default:
	// 			setType('');
	// 	}
	// }, [editData.object_type]);

	return (
		<>
			{editData.id ? (
				<form className=' w-full space-y-4 my-4'>
					<h3 className='flex'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							stroke-width='1.5'
							stroke='currentColor'
							className='w-6 h-6'
						>
							<path
								stroke-linecap='round'
								stroke-linejoin='round'
								d='M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z'
							/>
						</svg>
						<strong className='ml-2'>პირადი ინფორმაცია</strong>
					</h3>
					<div className='flex flex-col md:flex-row gap-4'>
						<div className='w-full'>
							{' '}
							<label
								htmlFor='name'
								className={'text-lg font-medium text-gray-900'}
							>
								სახელი
							</label>
							<input
								type='text'
								id='name'
								name='name'
								className='w-full input input-bordered mt-2 text-md text-gray-500'
								value={editData.name}
								onChange={handleInputChange}
							/>
						</div>
						<div className='w-full'>
							<label
								htmlFor='last_name'
								className={'text-lg font-medium text-gray-900'}
							>
								გვარი
							</label>
							<input
								name='last_name'
								value={editData.last_name}
								onChange={handleInputChange}
								type='text'
								id='last_name'
								className='w-full input input-bordered mt-2 text-md text-gray-500'
								// {...register('last_name')}
							/>
						</div>
					</div>
					<div className='flex flex-col md:flex-row gap-4'>
						<div className='w-full'>
							<label
								htmlFor='mobile'
								className={'text-lg font-medium text-gray-900'}
							>
								მობილური
							</label>
							<input
								name='mobile'
								value={editData.mobile}
								onChange={handleInputChange}
								type='tel'
								id='mobile'
								className='w-full input input-bordered mt-2 text-md text-gray-500'
								// {...register('mobile')}
							/>
						</div>
						<div className='w-full'>
							<label
								htmlFor='email'
								className={'text-lg font-medium text-gray-900'}
							>
								მეილი
							</label>
							<input
								name='email'
								value={editData.email}
								onChange={handleInputChange}
								type='text'
								id='email'
								className='w-full input input-bordered mt-2 text-md text-gray-500'
								// {...register('email')}
							/>
						</div>
					</div>
					<h3 className='flex'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							stroke-width='1.5'
							stroke='currentColor'
							className='w-6 h-6'
						>
							<path
								stroke-linecap='round'
								stroke-linejoin='round'
								d='M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z'
							/>
						</svg>
						<strong className='ml-2'>ობიექტის ინფორმაცია</strong>
					</h3>
					<div className='flex flex-col md:flex-row gap-4'>
						<div className='w-full'>
							<label
								htmlFor='object_name'
								className={'text-lg font-medium text-gray-900'}
							>
								ობიექტის სახელი
							</label>
							<input
								value={editData.object_name}
								onChange={handleInputChange}
								type='text'
								id='object_name'
								name='object_name'
								className='w-full input input-bordered mt-2 text-md text-gray-500'
								// {...register('object_name')}
							/>
						</div>

						<div className='w-full'>
							<label
								htmlFor='object_type'
								className={'text-lg font-medium text-gray-900'}
							>
								ობიექტის ტაიპი
							</label>
							<select
								name='object_type'
								onChange={handleInputChange}
								id='object_type'
								className='w-full input input-bordered mt-2 text-md text-gray-500'
							>
								<option value='1'>ატრაქცია</option>
								<option value='2'>განთავსება</option>
								<option value='3'>კვება</option>
							</select>
							{/* <input
								name='object_type'
								value={type}
								onChange={handleInputChange}
								type='text'
								id='object_type'
								className='w-full input input-bordered mt-2 text-md text-gray-500'
								// {...register('object_type_value', { min: 1, max: 3 })}
							/> */}
						</div>
					</div>
					<div className='flex flex-col md:flex-row gap-4'>
						<div className='w-full'>
							<label
								htmlFor='address'
								className={'text-lg font-medium text-gray-900'}
							>
								მისამართი
							</label>
							<input
								name='address'
								value={editData.address}
								onChange={handleInputChange}
								type='text'
								id='address'
								className='w-full input input-bordered mt-2 text-md text-gray-500'
								// {...register('address')}
							/>
						</div>
						<div className='w-full'>
							<label
								htmlFor='numberDiscount'
								className={'text-lg font-medium text-gray-900'}
							>
								ფასდაკლება
							</label>
							<input
								value={editData.discount}
								onChange={handleNumberDiscountChange}
								type='number'
								id='discount'
								name='discount'
								className='w-full input input-bordered mt-2 text-md text-gray-500'
								// {...register('numberDiscount')}
							/>
						</div>
					</div>
					<div className='flex flex-col md:flex-row gap-4'>
						<div className='w-full'>
							<label
								htmlFor='time_from'
								className={'text-lg font-medium text-gray-900'}
							>
								დაწყება
							</label>
							<input
								value={editData.time_from}
								onChange={e =>
									handleTimeInputChange('time_from', e.target.value)
								}
								type='time'
								id='time_from_type'
								className='w-full input input-bordered mt-2 text-md text-gray-500'
								// {...register('time_from_type')}
							/>
						</div>
						<div className='w-full'>
							<label
								htmlFor='time_to_type'
								className={'text-lg font-medium text-gray-900'}
							>
								დასრულება
							</label>
							<input
								value={editData.time_to}
								onChange={e => handleTimeInputChange('time_to', e.target.value)}
								type='time'
								id='time_to_type'
								className='w-full input input-bordered mt-2 text-md text-gray-500'
								// {...register('time_to_type')}
							/>
						</div>
					</div>
					<div className='w-full'>
						<label
							htmlFor='description'
							className={'text-lg font-medium text-gray-900'}
						>
							description
						</label>
						<textarea
							name='description'
							value={editData.description}
							onChange={handleInputChange}
							type='text'
							id='description'
							className='w-full input input-bordered mt-2 h-28 text-md text-gray-500'
							// {...register('description')}
						/>
					</div>

					<h3 className='flex'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth='1.5'
							stroke='currentColor'
							className='w-6 h-6'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155'
							/>
						</svg>
						<strong className='ml-2'>სოციალური ქსელები</strong>
					</h3>
					<div className='flex flex-col md:flex-row gap-4'>
						<div className='w-full'>
							<label
								htmlFor='facebook'
								className={'text-lg font-medium text-gray-900'}
							>
								facebook
							</label>
							<input
								name='facebook'
								value={editData.facebook}
								onChange={handleInputChange}
								type='text'
								id='facebook'
								className='w-full input input-bordered mt-2 text-md text-gray-500'
								// {...register('facebook')}
							/>
						</div>
						<div className='w-full'>
							{' '}
							<label
								htmlFor='instagram'
								className={'text-lg font-medium text-gray-900'}
							>
								instagram
							</label>
							<input
								name='instagram'
								value={editData.instagram}
								onChange={handleInputChange}
								type='text'
								id='instagram'
								className='w-full input input-bordered mt-2 text-md text-gray-500'
								// {...register('instagram')}
							/>
						</div>
					</div>

					<label htmlFor='file' className={'text-lg font-medium text-gray-900'}>
						ფოტო
					</label>
					<input
						onChange={handleImageInputChange}
						type='file'
						id='image1'
						accept='image/*'
						// onChange={handleImageChange}
						className='w-full input input-bordered mt-2 text-md text-gray-500'
					/>

					<label
						htmlFor='id_number'
						className={'text-lg font-medium text-gray-900'}
					>
						id_number
					</label>
					<input
						name='id_number'
						value={editData.id_number}
						onChange={handleInputChange}
						type='text'
						id='id_number'
						className='w-full input input-bordered mt-2 text-md text-gray-500'
						// {...register('id_number')}
					/>
					<button className='btn btn-block btn-primary' onClick={handleSubmit}>
						Submit
					</button>
				</form>
			) : (
				'loading'
			)}
		</>
	);
};
export default EditObjc;
