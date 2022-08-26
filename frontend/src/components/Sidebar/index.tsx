interface SidebarProps {
	user: User;
	closeToggle: Function;
}

export default function Sidebar({ user, closeToggle }: SidebarProps) {
	return (
		<div>Sidebar</div>
	);
}
