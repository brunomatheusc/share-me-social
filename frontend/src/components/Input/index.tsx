import { HTMLInputTypeAttribute } from 'react';

interface InputProps {
	type: HTMLInputTypeAttribute;
	value: string
	onChange: Function;
	placeholder?: string
}

export default function Input({ type, value, onChange, placeholder = "" }: InputProps) {
	return (
		<input
			type={type}
			value={value}
			onChange={() => onChange()}
			placeholder={placeholder}
			className="outline-none text-2xl sm:text-3xl font-bold border-b-2 border-gray-200 p-2"
		/>
	);
}
