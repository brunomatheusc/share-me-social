import type { NextPage } from 'next';

import WithLayout from 'layouts/WithLayout';
import Main from 'layouts/Main';

import { CreatePin } from 'components';

const CreatePinPage: NextPage = () => {
	return (
		<WithLayout layout={Main} component={CreatePin} />
	);
}

export default CreatePinPage;
