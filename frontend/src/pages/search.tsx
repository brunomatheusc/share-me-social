import type { NextPage } from 'next';

import WithLayout from 'layouts/WithLayout';
import Main from 'layouts/Main';

import PinsContainer from 'container/Pins';

const SearchPage: NextPage = () => {
	return (
		<WithLayout layout={Main} component={PinsContainer} />
	);
}

export default SearchPage;
