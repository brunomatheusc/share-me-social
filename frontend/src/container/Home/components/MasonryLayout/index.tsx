import Masonry from 'react-masonry-css';

import { Pin } from 'components';

interface MasonryLayoutProps {
	pins: Pin[];
}

const breakpoints = {
	default: 4,
	3000: 6,
	2000: 5,
	1600: 4,
	1285: 3,
	1020: 2,
	535: 1,
};

export default function MasonryLayout({ pins }: MasonryLayoutProps) {
	return (
		<Masonry className="flex animate-slide-fwd" breakpointCols={breakpoints}>
		{ pins?.length && pins.map((pin) => <Pin key={pin._id} pin={pin} />)}
		</Masonry>
	);
}
