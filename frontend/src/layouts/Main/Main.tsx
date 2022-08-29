import { ReactNode, useState, useRef } from 'react';
import Link from 'next/link';

import { AiFillCloseCircle } from 'react-icons/ai';
import { HiMenu } from 'react-icons/hi';

import { Topbar, Footer, Navbar, Sidebar } from './components';
import useAuth from 'hooks/auth';

interface Props {
	children: ReactNode;
	themeToggler: Function;
	themeMode: string;
};

const Main = ({ children, themeToggler, themeMode }: Props): JSX.Element => {	
	const { user } = useAuth();	
	const scrollRef = useRef<HTMLDivElement>(null);

	const [toggleSidebar, setToggleSidebar] = useState(false);

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
						<img src={user?.image} alt="logo" className="w-16" referrerPolicy="no-referrer" />
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

			{/* <Sidebar user={user} closeToggle={setToggleSidebar} /> */}

			<main className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
				<div className="px-2 md:px-5">
					<div className="bg-gray-50">
						<Navbar />
					</div>

					<div className="h-full">
						{children}
					</div>
				</div>
			</main>
		</div>
	);
};

export default Main;
