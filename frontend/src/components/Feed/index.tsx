import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { feedQuery, searchQuery } from "utils/data";
import { client } from "providers/sanityClient";

import { MasonryLayout, Spinner } from 'container/Home/components';

export default function Feed() {
	const router = useRouter();

	const categoryId = router.query.category as string;

	const [loading, setLoading] = useState(false);
	const [pins, setPins] = useState(null);

	useEffect(() => {
		setLoading(true);

		(async () => {
			const response = await client.fetch(categoryId ? searchQuery(categoryId) : feedQuery);
			console.log({ response });
			
			setPins(response);
			setLoading(false);

			// if (categoryId) {
			// 	const query = searchQuery(categoryId);
			// 	const response = await client.fetch(query);
			// } else {
			// 	const response = await client.fetch(feedQuery); 
			// 	setPins(response);
			// }
		})()
	}, []);

	if (loading) {
		return <Spinner message="We are adding new ideas to your feed!" />
	}

	return (
		<div>
			{ pins && <MasonryLayout pins={pins} />}
		</div>
	);
}
