import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

import { AiFillCloseCircle } from 'react-icons/ai';
import { HiMenu } from 'react-icons/hi';

import { client } from 'providers/sanityClient';
import { userQuery } from 'utils/data';

import Pins from 'container/Pins';
import { Sidebar, UserProfile } from 'components';

export default function HomeContainer() {
	let userInfo: any = {};
	
	if (typeof window !== 'undefined') {
		userInfo = localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user')!) : localStorage.clear();
	}
	
	const scrollRef = useRef<HTMLDivElement>(null);
	const [user, setUser] = useState<User>({} as User);
	const [toggleSidebar, setToggleSidebar] = useState(false);

	useEffect(() => {
		(async () => {
			const query = userQuery(userInfo?._id);
			const [response] = await client.fetch(query);

			setUser(response);
		})();
	}, []);	

	useEffect(() => {
		scrollRef.current?.scrollTo(0, 0);
	}, []);

	return (
		<div className="flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out">
			<div className="hidden md:flex h-screen flex-initial">
				<Sidebar user={user} closeToggle={setToggleSidebar} />
			</div>

			<div className="flex md:hidden flex-row">
				<div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
					<HiMenu fontSize={40} className="cursor-pointer" onClick={() => setToggleSidebar(true)} />

					<Link href="/">
						<img src="/assets/logo.png" alt="logo" className="w-28" />
					</Link>

					<Link href={`/user-profile/${user?._id}`}>
						<img src={user.image} alt="logo" className="w-28" referrerPolicy="no-referrer" />
					</Link>
				</div>

				{ toggleSidebar && (
				<div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
					<div className="absolute w-full flex justify-end items-center p-2">
						<AiFillCloseCircle fontSize={30} className="cursor-pointer" onClick={() => setToggleSidebar(false)} />
					</div>

					<Sidebar user={user} closeToggle={setToggleSidebar} />
				</div>
				)}
			</div>

			<div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
				<Link href={`/user-profile/${user?._id}`}>Profile</Link>
				<Link href="/pins">Pins</Link>
			</div>
		</div>
	);
}
