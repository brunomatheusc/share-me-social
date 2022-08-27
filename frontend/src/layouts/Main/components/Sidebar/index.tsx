import Link from 'next/link';
import { RiHomeFill } from 'react-icons/ri';
import { IoIosArrowForward } from 'react-icons/io';
import NavLink from 'components/NavLink';

interface SidebarProps {
	user: User;
	closeToggle: Function;
}

const categories = [
	{ name: 'Animals' },
	{ name: 'Wallpapers' },
	{ name: 'Photography' },
	{ name: 'Gaming' },
	{ name: 'Coding' },
	{ name: 'Other' },
];

export default function Sidebar({ user, closeToggle }: SidebarProps) {
	function handleCloseSidebar() {
		if (closeToggle) {
			closeToggle(false);
		}
	}

	return (
		<div className="flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar">
			<div className="flex flex-col">
				<Link href="/" passHref>
					<a 
						href="/" 
						className="flex px-5 gap-2 my-6 pt-1 w-190 items-center"
						onClick={handleCloseSidebar}
					>
						<img src="/assets/logo.png" alt="logo" className="w-full" />
					</a>
				</Link>

				<div className="flex flex-col gap-5">
					<NavLink href="/" onClick={handleCloseSidebar}>
						<RiHomeFill />
						<span>Home</span>
					</NavLink>

					<h3 className="mt-2 px-5 text-base 2xl:text-xl">Discover categories</h3>

					{ categories.slice(0, categories.length - 1).map((category, index) => (
					<NavLink href={`/category/${category.name}`} key={`category-${category.name}-${index}`}>
						<span>{category.name}</span>
					</NavLink>
					))}
				</div>
			</div>

			{ user && (
				<Link 
					href={`user-profile/${user._id}`}
					passHref
					onClick={handleCloseSidebar}
				>
					<a className="flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3">
						<img src={user.image} referrerPolicy="no-referrer" className="w-10 h-10 rounded-full" alt="User profile" />
						<p>{user.userName}</p>
					</a>
				</Link>
			)}
		</div>
	);
}
