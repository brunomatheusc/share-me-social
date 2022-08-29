import { urlFor } from "providers/sanityClient";

interface PinProps {
	pin: Pin;
}

export default function Pin({ pin: { _id, destination, image, postedBy }}: PinProps) {
	return (
		<div className="w-max">
			<img 
				src={urlFor(image).width(250).url()} 
				alt="user-post" 
				className="rounded-lg w-full" 
			/>
		</div>
	);
}
