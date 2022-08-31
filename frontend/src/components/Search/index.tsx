import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { client } from 'providers/sanityClient';
import { feedQuery, searchQuery } from 'utils/data';

import { MasonryLayout, Spinner } from 'container/Home/components';

export default function Search() {
	const router = useRouter();
	const searchTerm = router.query.q as string;

	const [pins, setPins] = useState<Pin[] | null>(null)
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		(async () => {
			setLoading(true);

			const query = searchQuery(searchTerm.toLowerCase());
			const response = await client.fetch(!!searchTerm ? query : feedQuery);
			setPins(response);

			setLoading(false);
		})()
	}, [searchTerm]);

	return (
		<div>
			{ loading  && <Spinner message="Searching for pins..." /> }

			{ !!pins && <MasonryLayout pins={pins} /> }

			{ !pins?.length && searchTerm !== '' && !loading && (
			<div className="mt-10 text-center text-xl">No pins found</div>
			)}
		</div>
	);
}
