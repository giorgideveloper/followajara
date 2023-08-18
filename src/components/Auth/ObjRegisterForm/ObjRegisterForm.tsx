'use client';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { RegistrationType } from '@/app/(main)/api/api.types';
import { postUserData } from '@/app/(main)/api/api';
import toast from '@/components/helper/toast';

const ObjRegisterForm = () => {
	const router = useRouter();
	const form = useForm<RegistrationType>();
	const { register, control, handleSubmit } = form;
	const [image, setImage] = useState('');

	const [registrationStatus, setRegistrationStatus] = useState('');
	// Image FC
	const handleImageChange = (event: any) => {
		const imageFile = event.target.files[0];
		setImage(prevData => ({
			...prevData,
			image1: imageFile,
		}));
	};
	const handleImageChangeTow = (event: any) => {
		const imageFile = event.target.files[0];
		setImage(prevData => ({
			...prevData,
			image1: imageFile,
		}));
	};

	const handleImageChangeThree = (event: any) => {
		const imageFile = event.target.files[0];
		setImage(prevData => ({
			...prevData,
			image1: imageFile,
		}));
	};

	const onSubmit = async (data: RegistrationType) => {
		const {
			object_name,
			object_type_value,
			name,
			last_name,
			address,
			id_number,
			mobile,
			time_from_type,
			time_to_type,
			numberDiscount,
			description,
			email,
			password,
			facebook,
			instagram,
		} = data;

		let object_type: number = +object_type_value;
		let discount: number = +numberDiscount;
		let time_from = moment(time_from_type, 'hh:mm:ss').format('hh:mm');
		let time_to = moment(time_to_type, 'hh:mm:ss').format('hh:mm');
		// Number generation
		function generateRandom11Digits() {
			const randomNumber = Math.floor(Math.random() * 100000000000);
			const formattedNumber = String(randomNumber).padStart(11, '0');
			return formattedNumber;
		}
		const random11Digits = generateRandom11Digits();

		if (image) {
			const formData: any = new FormData();

			formData.append('image1', image.image1);
			formData.append('image2', image.image2);
			formData.append('image3', image.image3);

			// Append other fields to the formData
			formData.append('object_name', object_name);
			formData.append('object_type', object_type);
			formData.append('name', name);
			formData.append('facebook', facebook);
			formData.append('instagram', instagram);

			formData.append('last_name', last_name);
			formData.append('address', address);
			formData.append('id_number', random11Digits);
			formData.append('mobile', mobile);
			formData.append('time_from', time_from);
			formData.append('time_to', time_to);
			formData.append('discount', discount.toString());
			formData.append('email', email);
			formData.append('password', password);
			formData.append('description', description);

			try {
				const response = await postUserData(formData);
				setRegistrationStatus(response.message);
				toast('success', 'დარეგისტრირებულია წარმატებით');

				setTimeout(() => {
					router.push('/dashboard');
				}, 100);

				console.log('Registration successful');
			} catch (error) {
				toast('error', `${error}`);
				console.error('Error registering user:', error);
				setRegistrationStatus('Error during registration');
			}
		} else {
			console.log('Please select an image');
		}
	};

	return (
		<>
			<form
				className=' w-full space-y-4 my-4'
				onSubmit={handleSubmit(onSubmit)}
			>
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
							placeholder='მაგ: გიორგი'
							className='w-full input input-bordered mt-2 text-md text-gray-500'
							{...register('name')}
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
							type='text'
							id='last_name'
							placeholder='მაგ: ბერიძე'
							className='w-full input input-bordered mt-2 text-md text-gray-500'
							{...register('last_name')}
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
							type='tel'
							id='mobile'
							className='w-full input input-bordered mt-2 text-md text-gray-500'
							placeholder='მაგ: 555112233'
							{...register('mobile')}
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
							type='text'
							id='email'
							className='w-full input input-bordered mt-2 text-md text-gray-500'
							placeholder='მაგ: giorgiberidze@mail.com'
							{...register('email')}
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
							ოპიექტის სახელი
						</label>
						<input
							type='text'
							id='object_name'
							className='w-full input input-bordered mt-2 text-md text-gray-500'
							placeholder='მაგ: ობიექტი'
							{...register('object_name')}
						/>
					</div>

					<div className='w-full'>
						<div className='w-full'>
							<label
								htmlFor='object_type'
								className={'text-lg font-medium text-gray-900'}
							>
								ობიექტის ტაიპი
							</label>
							<select
								id='object_type_value'
								className='w-full input input-bordered mt-2 text-md text-gray-500'
								{...register('object_type_value', { min: 1, max: 3 })}
							>
								<option value='1'>ატრაქცია</option>
								<option value='2'>განთავსება</option>
								<option value='3'>კვება</option>
							</select>
						</div>
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
							type='text'
							id='address'
							className='w-full input input-bordered mt-2 text-md text-gray-500'
							placeholder='მაგ: ფარნავაზ მეფის 100'
							{...register('address')}
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
							type='number'
							id='numberDiscount'
							className='w-full input input-bordered mt-2 text-md text-gray-500'
							placeholder='მაგ: 1-დან 100-მდე'
							{...register('numberDiscount')}
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
							type='time'
							id='time_from_type'
							className='w-full input input-bordered mt-2 text-md text-gray-500'
							{...register('time_from_type')}
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
							type='time'
							id='time_to'
							className='w-full input input-bordered mt-2 text-md text-gray-500'
							{...register('time_to_type')}
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
					<input
						type='text'
						id='description'
						placeholder='მოკლე აღწერა'
						className='w-full input input-bordered mt-2 h-28 text-md text-gray-500'
						{...register('description')}
					/>
				</div>
				<div className='flex flex-col md:flex-row gap-4'>
					<div className='w-full'>
						<label
							htmlFor='password'
							className={'text-lg font-medium text-gray-900'}
						>
							პაროლი
						</label>
						<input
							type='password'
							id='password'
							className='w-full input input-bordered mt-2 text-md text-gray-500'
							{...register('password')}
						/>
					</div>
					<div className='w-full'>
						<label
							htmlFor='password'
							className={'text-lg font-medium text-gray-900'}
						>
							გაინმეორეთ პაროლი
						</label>
						<input
							type='password'
							id='password'
							className='w-full input input-bordered mt-2 text-md text-gray-500'
							{...register('password')}
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
							type='text'
							id='facebook'
							className='w-full input input-bordered mt-2 text-md text-gray-500'
							placeholder='https://www.facebook.com/******/user'
							{...register('facebook')}
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
							type='text'
							id='instagram'
							className='w-full input input-bordered mt-2 text-md text-gray-500'
							placeholder='https://www.instagram.com/******/user'
							{...register('instagram')}
						/>
					</div>
				</div>

				<label htmlFor='file' className={'text-lg font-medium text-gray-900'}>
					ფოტო
				</label>
				<input
					name='image1'
					type='file'
					id='image1'
					accept='image/*'
					onChange={handleImageChange}
					className='file-input file-input-bordered w-full'
					multiple
				/>
				<label htmlFor='file' className={'text-lg font-medium text-gray-900'}>
					ფოტო2
				</label>
				<input
					name='image2'
					type='file'
					id='image2'
					accept='image/*'
					onChange={handleImageChangeTow}
					className='file-input file-input-bordered w-full'
					multiple
				/>
				<label htmlFor='file' className={'text-lg font-medium text-gray-900'}>
					ფოტო3
				</label>
				<input
					name='image3'
					type='file'
					id='image3'
					accept='image/*'
					onChange={handleImageChangeThree}
					className='file-input file-input-bordered w-full'
					multiple
				/>

				<button className='btn btn-block btn-primary'>Submit</button>
			</form>
		</>
	);
};

export default ObjRegisterForm;
