import { useRouter } from 'next/router';
import Link, { LinkProps } from 'next/link';

interface NavLinkProps {
	href: string;
	children: React.ReactNode;
	exact?: boolean;
	className?: string;
}

const isNotActiveStyle = 'flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize';
const isActiveStyle = 'flex items-center px-5 gap-3 font-extrabold border-r-2 border-black transition-all duration-200 ease-in-out capitalize';

export default function NavLink({ href, exact = false, children, ...props }: NavLinkProps & LinkProps) {
    const { pathname } = useRouter();
    const isActive = exact ? pathname === href : pathname.startsWith(href);

	props.className = isActive ? isActiveStyle : isNotActiveStyle;
    // if (isActive) {
    //     props.className += ' active';
    // }

    return (
        <Link href={href}>
            <a {...props}>
                {children}
            </a>
        </Link>
    );
}