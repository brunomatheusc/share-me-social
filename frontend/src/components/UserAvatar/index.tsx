import Link from 'next/link';

import useAuth from 'hooks/auth';

interface UserAvatarProps {
	user: User;
	className?: string;
	imgClassName?: string;
	hasName?: boolean;
}

export default function UserAvatar({ className = '', imgClassName = '', user, hasName = true }: UserAvatarProps) {
	return (
		<Link href={`/user-profile/${user?._id}`} passHref>
			<a className={className}>
				<img src={user?.image} referrerPolicy="no-referrer" className={imgClassName} />

				{ hasName && <p className="font-semibold capitalize">{ user?.userName }</p>}
			</a>
		</Link>
	)
}
