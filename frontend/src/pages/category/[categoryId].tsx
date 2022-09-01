import type { GetStaticProps, NextPage } from 'next';

import WithLayout from 'layouts/WithLayout';
import Main from 'layouts/Main';

import { client } from 'providers/sanityClient';
import { categories, searchQuery } from 'utils/data';
import Feed, { FeedProps } from 'components/Feed';

const Category: NextPage = (props: FeedProps) => {
	return (<WithLayout layout={Main} component={Feed} {...props} />);
}

export async function getStaticPaths() {
	const paths = categories.map(({ name }) => ({ params: { categoryId: name }}));

	return { paths, fallback: true };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const categoryId = params?.categoryId as string;
	const response = await client.fetch(searchQuery(categoryId));

	return {
		revalidate: 60,
		props: {
			categoryId,
			pins: response,
		}
	};
}


export default Category;
