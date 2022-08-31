import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { feedQuery, searchQuery } from "utils/data";
import { client } from "providers/sanityClient";

import { MasonryLayout, Spinner } from 'container/Home/components';

export default function Feed() {
	const router = useRouter();

	const categoryId = router.query.category as string;

	const [loading, setLoading] = useState(false);
	const [pins, setPins] = useState<Pin[] | null>(null);

	useEffect(() => {
		setLoading(true);

		(async () => {
			const response = await client.fetch(categoryId ? searchQuery(categoryId) : feedQuery);
			
			setPins(response);
			setLoading(false);
		})()
	}, [categoryId]);

	if (loading) {
		return <Spinner message="We are adding new ideas to your feed!" />
	}

	if (!pins?.length) return <h2>No pins at this category</h2>;

	return (
		<div>
			{ pins && <MasonryLayout pins={pins} />}
		</div>
	);
}
