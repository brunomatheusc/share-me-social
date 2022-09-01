interface Pin {
	about: string;
	title: string;
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
	userId: string;
	_id: string;
	category: string;
	comments: {
		postedBy: User;
		comment: string;
	}[];
}