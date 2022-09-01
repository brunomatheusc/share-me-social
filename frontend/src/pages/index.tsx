import WithLayout from 'layouts/WithLayout';
import Main from 'layouts/Main';

import { Feed } from 'components';

import { client } from 'providers/sanityClient';
import { FeedProps } from 'components/Feed';
import { feedQuery } from 'utils/data';

export default function HomePage(props: FeedProps) {
	return (<WithLayout layout={Main} component={Feed} {...props} />);
}

export async function getStaticProps() {
	const response = await client.fetch(feedQuery);

	return {
		revalidate: 60,
		props: {
			categoryId: null,
			pins: response,
		}
	};
}