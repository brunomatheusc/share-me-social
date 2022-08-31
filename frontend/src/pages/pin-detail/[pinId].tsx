import type { GetStaticProps } from 'next';

import WithLayout from 'layouts/WithLayout';
import Main from 'layouts/Main';
import { PinDetail } from 'components';
import { PinDetailProps } from 'components/PinDetail';

import { client } from 'providers/sanityClient';
import { feedQuery, pinDetailMorePinQuery, pinDetailQuery } from "utils/data";


export default function PinDetailPage(props: PinDetailProps) {
	return <WithLayout layout={Main} component={PinDetail} {...props} />;
}

export async function getStaticPaths() {
	const pinsResponse = await client.fetch<Pin[]>(feedQuery);	

	const paths = pinsResponse.map(({ _id }) => ({ params: { pinId: _id }}));

	return { paths, fallback: true };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const pinId = params?.pinId as string;

	const [pin] = await client.fetch(pinDetailQuery(pinId));
	const pinsResponse = await client.fetch(pinDetailMorePinQuery(pin));	

	return {
		revalidate: 60,
		props: {
			pinId: params?.pinId,
			pin,
			pins: pinsResponse
		}
	}
}