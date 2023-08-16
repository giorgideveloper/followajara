export type RegistrationType = {
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

export type RegistrationResponse = {
	message: string;
};

export interface ObjectType {
	id: number;
	object_name: string;
	object_type: null;
	address: string;
	id_number: string;
	time_from: string;
	time_to: string;
	discount: null;
	description: string;
	image1: string;
}
