'use client';
import { useEffect, useState } from 'react';
import EditObjc from '../../../components/EditObj/EditObjc';
import { dashboardApi } from '../api/api';

export default function page() {
	const [data, setData] = useState<any>('');

	useEffect(() => {
		const getObject = async () => {
			try {
				const response = await dashboardApi();
				setData(response);
			} catch (e) {
				console.log(e);
			}
		};
		getObject();
	}, []);
	return (
		<>
			<h1 className='text-center text-xl text-bold pt-5'>
				რედაქტირება ობიექტის
			</h1>
			<div className='w-full lg:w-3/4 mx-auto p-6'>
				<div className='card w-full lg:w-2/3 bg-base-100 shadow-xl mx-auto mt-6'>
					<div className='card-body'>
						{/* <p className="text-2xl font-bold text-center my-10 text-red-600">რეგისტრაცია დაიწყება 1 აგვისტოს!</p> */}
						{data.id ? <EditObjc data={data} /> : 'Loading'}
					</div>
				</div>
			</div>
		</>
	);
}
