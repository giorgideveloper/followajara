'use client';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Input from '@/components/Form/Input';
import Link from 'next/link';
import { useState, FC } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { loginUser } from '../utils/api';
import toast from '@/components/helper/toast';

interface IFormInput {
	email: string;
	password: string;
}
interface LoginFormProps {}
const ObjLoginForm: FC<LoginFormProps> = () => {
	const router = useRouter();
	const [error, setError] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormInput>({});

	const onSubmit: SubmitHandler<IFormInput> = async () => {
		try {
			setError('');
			setLoading(true);
			await loginUser(email, password);
			toast('success', 'შესვლა წარმატებულია');
			router.push('/dashboard');

			if (error) {
				setError(error);
			}
		} catch (error) {
			toast('error', 'შესვლა განხორციელდა წარმატებით');

			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<form className='space-y-4 my-4' onSubmit={handleSubmit(onSubmit)}>
				<Input
					onChange={e => setEmail(e.target.value)}
					label='ელ. ფოსტა'
					placeholder='ელ. ფოსტა'
					value={email}
				/>

				{errors.email && (
					<span className='text-red-700 text-sm mt-2'>* აუცილებელი ველი</span>
				)}

				<Input
					onChange={e => setPassword(e.target.value)}
					label='პაროლი'
					type='password'
					placeholder='შეიყვანეთ პაროლი'
					value={password}
				/>

				{errors.password && (
					<span className='text-red-700 text-sm mt-2'>* აუცილებელი ველი</span>
				)}

				<div>
					<button className='btn btn-block btn-primary' type='submit'>
						{loading && <span className='loading loading-spinner'></span>}
						შესვლა
					</button>
				</div>
				{error && <span className='text-red-700 text-sm mt-2'>{error}</span>}
			</form>
			<span className='mt-8'>
				{`არ გაქვს არგარიში`}?
				<Link
					href='/objregister'
					className='text-blue-600 hover:text-blue-800 hover:underline'
				>
					{' '}
					რეგისტრაცია
				</Link>
			</span>
		</>
	);
};

export default ObjLoginForm;
