import { Circles } from 'react-loader-spinner';

interface SpinnerProps {
	message?: string;
}

export default function Spinner({ message = '' }: SpinnerProps) {
	return (
		<div className="flex flex-col justify-center items-center w-full h-full">
			<div className="m-5">
				<Circles color="#00BFFF" height={50} width={200} />
			</div>

			<p className="text-lg text-center px-2">{ message }</p>
		</div>
	);
}
