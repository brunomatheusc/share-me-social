import type { NextPage } from 'next';

import WithLayout from 'layouts/WithLayout';
import Main from 'layouts/Main';

import PinsContainer from 'container/Pins';
import HomeContainer from 'container/Home';

const PinDetailPage: NextPage = () => {
	return (
		<WithLayout layout={Main} component={HomeContainer} />
	);
}

export default PinDetailPage;
