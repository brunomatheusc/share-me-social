import { useState } from "react";
import { useRouter } from "next/router";

import { MasonryLayout, Spinner } from 'container/Home/components';

export default function Feed() {
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	if (loading) {
		return <Spinner message="We are adding new ideas to your feed!" />
	}

	return (
		<div>Feed</div>
	);
}
