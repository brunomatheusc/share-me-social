interface Pin {
	destination: string;
	image: {
		asset: {
			url: string;
		}
	};
	postedBy: User;
	save: boolean;
	_id: string;
}