import type { GetStaticProps, NextPage } from 'next';

import WithLayout from 'layouts/WithLayout';
import Main from 'layouts/Main';

import HomeContainer from 'container/Home';
import { client } from 'providers/sanityClient';
import { searchQuery } from 'utils/data';

const Category: NextPage = () => {
	return (<WithLayout layout={Main} component={HomeContainer} />);
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
