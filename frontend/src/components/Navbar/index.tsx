interface NavbarProps {
	searchTerm: string;
	setSearchTerm: Function;
}

export default function Navbar({ searchTerm, setSearchTerm }: NavbarProps) {
	return (
		<div>Navbar</div>
	);
}
