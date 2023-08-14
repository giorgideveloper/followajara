'use client';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import { string } from 'yup';
import { useState, ChangeEvent } from 'react';
type FormValue = {
	object_name: string;
	object_type_value: number;
	name: string;
	last_name: string;
	address: string;
	id_number: string;
	mobile: string;
	time_from_type: null;
	time_to_type: null;
	numberDiscount: number;
	facebook: string;
	instagram: string;
	description: string;
	email: string;
	password: string;
};
const ObjRegisterForm = () => {
	const form = useForm<FormValue>();
	const { register, control, handleSubmit } = form;

	const [image, setImage] = useState('');
	// Image FC
	const handleImageChange = (event: any) => {
		setImage(event.target.files[0]);
		console.log(
			'🚀 ~ file: ObjRegisterForm.tsx:35 ~ handleImageChange ~ imageFile:',
			event.target.files[0]
		);
	};

	const onSubmit = async (data: FormValue) => {
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

		if (image) {
			const formData = new FormData();

			formData.append('image', image);

			// Append other fields to the formData
			formData.append('object_name', object_name);
			formData.append('object_type', object_type.toString());
			formData.append('name', name);
			formData.append('facebook', facebook);
			formData.append('instagram', instagram);

			formData.append('last_name', last_name);
			formData.append('address', address);
			formData.append('id_number', id_number);
			formData.append('mobile', mobile);
			formData.append('time_from', time_from);
			formData.append('time_to', time_to);
			formData.append('discount', discount.toString());
			formData.append('email', email);
			formData.append('password', password);
			formData.append('description', description);

			try {
				await axios.post(
					'https://follow.geoevents.ge/api/user/registration/',
					formData,
					{
						headers: {
							'Content-Type': 'multipart/form-data',
						},
					}
				);

				console.log('Registration successful');
			} catch (error) {
				console.error('Error registering user:', error);
			}
		} else {
			console.log('Please select an image');
		}

		console.log(data);
	};
	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
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
							{...register('object_name')}
						/>
					</div>
				</div>

				<label
					htmlFor='object_type_value'
					className={'text-lg font-medium text-gray-900'}
				>
					ობიექტის ტაიპი
				</label>
				<input
					type='number'
					id='object_type_value'
					className='w-full input input-bordered mt-2 text-md text-gray-500'
					{...register('object_type_value', { min: 1, max: 3 })}
				/>

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
					{...register('address')}
				/>

				<label htmlFor='name' className={'text-lg font-medium text-gray-900'}>
					სახელი
				</label>
				<input
					type='text'
					id='name'
					className='w-full input input-bordered mt-2 text-md text-gray-500'
					{...register('name')}
				/>

				<label
					htmlFor='last_name'
					className={'text-lg font-medium text-gray-900'}
				>
					გვარი
				</label>
				<input
					type='text'
					id='last_name'
					className='w-full input input-bordered mt-2 text-md text-gray-500'
					{...register('last_name')}
				/>

				<label htmlFor='mobile' className={'text-lg font-medium text-gray-900'}>
					მობილური
				</label>
				<input
					type='text'
					id='mobile'
					className='w-full input input-bordered mt-2 text-md text-gray-500'
					{...register('mobile')}
				/>

				<label htmlFor='email' className={'text-lg font-medium text-gray-900'}>
					Email
				</label>
				<input
					type='text'
					id='email'
					className='w-full input input-bordered mt-2 text-md text-gray-500'
					{...register('email')}
				/>

				<label
					htmlFor='id_number'
					className={'text-lg font-medium text-gray-900'}
				>
					id_number
				</label>
				<input
					type='text'
					id='id_number'
					className='w-full input input-bordered mt-2 text-md text-gray-500'
					{...register('id_number')}
				/>

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
					{...register('numberDiscount')}
				/>

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
					{...register('facebook')}
				/>

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
					{...register('instagram')}
				/>

				<label
					htmlFor='description'
					className={'text-lg font-medium text-gray-900'}
				>
					description
				</label>
				<input
					type='text'
					id='description'
					className='w-full input input-bordered mt-2 text-md text-gray-500'
					{...register('description')}
				/>

				<label
					htmlFor='password'
					className={'text-lg font-medium text-gray-900'}
				>
					password
				</label>
				<input
					type='password'
					id='password'
					className='w-full input input-bordered mt-2 text-md text-gray-500'
					{...register('password')}
				/>

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
				<label htmlFor='file' className={'text-lg font-medium text-gray-900'}>
					ფოტო
				</label>
				<input
					type='file'
					id='image1'
					accept='image/*'
					onChange={handleImageChange}
					className='w-full input input-bordered mt-2 text-md text-gray-500'
				/>
				<button className='btn btn-block btn-primary'>Submit</button>
			</form>
		</>
	);
};
export default ObjRegisterForm;
