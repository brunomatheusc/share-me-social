import { useState } from "react";

import { MasonryLayout, Spinner } from 'container/Home/components';

export interface FeedProps {
	categoryId?: string;
	pins?: Pin[];
}

export default function Feed({ pins }: FeedProps) {
	const [loading, setLoading] = useState(true);
	setTimeout(() => setLoading(false), 1000);

	if (loading) {
		return <Spinner message="We are adding new ideas to your feed!" />
	}

	if (!pins?.length) return (<div><h2>No pins at this category</h2></div>);

	return (
		<div>
			{ !!pins.length && <MasonryLayout pins={pins} />}
		</div>
	);
}
