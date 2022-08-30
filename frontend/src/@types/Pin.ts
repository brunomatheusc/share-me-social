interface Pin {
	destination: string;
	image: {
		asset: {
			url: string;
		}
	};
	postedBy: User;
	save: {
		postedBy: User;
		userId: string;
	}[];
	_id: string;
}