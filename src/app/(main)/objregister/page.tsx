import ObjRegisterForm from '@/components/Auth/ObjRegisterForm';

export default function page() {
	return (
		<>
			<div className='w-full lg:w-3/4 mx-auto p-6'>
				<div className='card w-full lg:w-2/3 bg-base-100 shadow-xl mx-auto mt-6'>
					<div className='card-body'>
						{/* <p className="text-2xl font-bold text-center my-10 text-red-600">რეგისტრაცია დაიწყება 1 აგვისტოს!</p> */}
						<ObjRegisterForm />
					</div>
				</div>
			</div>
		</>
	);
}
