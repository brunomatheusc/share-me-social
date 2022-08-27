import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { IoMdAdd, IoMdSearch } from 'react-icons/io';

import useAuth from 'hooks/auth';

export default function Navbar() {
	const { user } = useAuth();
	const router = useRouter();

	const [searchTerm, setSearchTerm] = useState('');

	if (!user) return null;

	return (
		<div className="flex gap-2 md:gap-5 w-full mt-5 pb-7">
			<div className="flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm">
				<IoMdSearch fontSize={21} className="ml-1" />

				<input
					type="text"
					onChange={(e) => setSearchTerm(e.target.value)}
					placeholder="Search"
					value={searchTerm}
					onFocus={() => router.push('/search')}
					className="p-2 w-full bg-white outline-none"
				/>
			</div>

			<div className="flex gap-3">
				<Link href={`/user-profile/${user?._id}`} className="hidden md:block">
					<img src={user.image} referrerPolicy="no-referrer" alt="User-image" className="w-14 h-12 rounded-lg" />
				</Link>

				<Link href="/create-pin" passHref>
					<a className="bg-black text-hite rounded-lg w-12 h-12 md:w-14 flex justify-center items-center">
						<IoMdAdd color="#fff" />
					</a>
				</Link>
			</div>
		</div>
	);
}
