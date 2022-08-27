import { useState } from 'react';

import { Navbar, Feed, PinDetail, CreatePin, Search } from 'components'; 

export default function PinsContainer() {
	const [searchTerm, setSearchTerm] = useState('');

	return (
		<div className="px-2 md:px-5">
			<div className="bg-gray-50">
				{/* <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} /> */}
			</div>

			<div className="h-full"></div>
		</div>
	);
}
