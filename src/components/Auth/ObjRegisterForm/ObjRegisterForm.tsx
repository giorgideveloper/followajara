'use client';
import axios from 'axios';
import { useForm } from 'react-hook-form';
type FormValue = {
	object_name: string;
	object_type: number;
	name: string;
	last_name: string;
	address: string;
	id_number: string;
	mobile: string;
	time_from: null;
	time_to: null;
	discount: string;
	facebook: string;
	instagram: string;
	description: string;
	image1: null;
	image2: null;
	image3: null;
	email: string;
	password: string;
};
const ObjRegisterForm = () => {
	const form = useForm<FormValue>();
	const { register, control, handleSubmit } = form;

	const onSubmit = (data: FormValue) => {
		console.log('Form submit', data);
		axios.post('https://follow.geoevents.ge/api/user/registration/', { data });
	};
	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<label htmlFor='object_name'>ოპიექტის სახელი</label>
				<input type='text' id='object_name' {...register('object_name')} />

				<label htmlFor='object_type'>ობიექტის ტაიპი</label>
				<input type='number' id='object_type' {...register('object_type')} />

				<label htmlFor='address'>მისამართი</label>
				<input type='text' id='address' {...register('address')} />

				<label htmlFor='name'>სახელი</label>
				<input type='text' id='name' {...register('name')} />

				<label htmlFor='last_name'>გვარი</label>
				<input type='text' id='last_name' {...register('last_name')} />

				<label htmlFor='mobile'>მობილური</label>
				<input type='text' id='mobile' {...register('mobile')} />

				<label htmlFor='email'>Email</label>
				<input type='text' id='email' {...register('email')} />

				<label htmlFor='id_number'>id_number</label>
				<input type='text' id='id_number' {...register('id_number')} />

				<label htmlFor='discount'>ფასდაკლება</label>
				<input type='text' id='discount' {...register('discount')} />

				<label htmlFor='facebook'>facebook</label>
				<input type='text' id='facebook' {...register('facebook')} />

				<label htmlFor='instagram'>instagram</label>
				<input type='text' id='instagram' {...register('instagram')} />

				<label htmlFor='description'>description</label>
				<input type='text' id='description' {...register('description')} />

				<label htmlFor='password'>password</label>
				<input type='password' id='password' {...register('password')} />

				<label htmlFor='time_from'>დაწყება</label>
				<input type='time' id='time_from' {...register('time_from')} />

				<label htmlFor='time_to'>დასრულება</label>
				<input type='time' id='time_to' {...register('time_to')} />
				<button>Submit</button>
			</form>
		</>
	);
};
export default ObjRegisterForm;
