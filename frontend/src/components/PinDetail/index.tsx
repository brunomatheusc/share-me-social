import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';

import { MdDownloadForOffline } from 'react-icons/md';

import useAuth from 'hooks/auth';

import { pinDetailMorePinQuery, pinDetailQuery } from 'utils/data';
import { client, urlFor } from 'providers/sanityClient';

import { UserAvatar } from 'components';
import { MasonryLayout, Spinner } from 'container/Home/components';

export interface PinDetailProps {
	pinId: string;
	pin: Pin;
	pins: Pin[];
}

export default function PinDetail({ pinId, pin, pins }: PinDetailProps) {
	const { user } = useAuth();
	const router = useRouter();

	const [pinDetail, setPinDetail] = useState<Pin | null>(pin);
	const [comment, setComment] = useState('');
	const [addingComment, setAddingComment] = useState(false);

	async function fetchPinDetails() {
		const [pin] = await client.fetch(pinDetailQuery(pinId));
		setPinDetail(pin);
	}

	useEffect(() => {
		(async () => await fetchPinDetails())();
	}, [pinId]);

	if (!pinDetail) return <Spinner message="Loading pin..." />;

	async function handleAddComment() {
		if (!comment) return;

		setAddingComment(true);

		try {
			const pinResponse = await client
				.patch(pinId)
				.setIfMissing({ comments: [] })
				.insert('after', 'comments[-1]', [{
					comment,
					_key: uuidv4(),
					postedBy: {
						_type: 'postedBy',
						_ref: user._id
					}
				}])
				.commit<Pin>()
			;

			await fetchPinDetails();
			// await fetchPinDetails();
			// setPinDetail(updatedPin);

			setComment('');
			setAddingComment(false);			
		} catch (error: any) {
			console.log("Error", error.message);
			setAddingComment(false);			
			alert(error.message);
		}
	}

	return (
		<>
			<div className="flex xl-flex-row flex-col m-auto bg-white" style={{ maxWidth: 1500, borderRadius: '32px' }}>
				<div className="flex justify-center items-center md:items-start flex-initial">
					<img 
						src={pinDetail?.image && urlFor(pinDetail.image).url()} 
						alt="user-post" 
						className="rounded-t-3xl rounded-b-lg"
					/>
				</div>

				<div className="w-full p-5 flex-1 xl:min-w-620">
					<div className="flex items-center justify-between">
						<div className="flex gap-2 items-center">
							<a 
								href={`${pinDetail.image.asset.url}?dl=`}
								download
								className="bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
							>
								<MdDownloadForOffline />
							</a>
						</div>

						<a href={pinDetail.destination} target="_blank" rel="noreferrer">
							{pinDetail.destination}
						</a>
					</div>

					<div>
						<h1 className="text-4xl font-bold break-words mt-3">
							{pinDetail.title}
						</h1>

						<p className="mt-3">{ pinDetail.about }</p>
					</div>

					<UserAvatar 
						user={user} 
						className="flex gap-2 mt-5 items-center bg-white rounded-lg" 
						imgClassName="w-8 h-8 rounded-full object-cover"
					/>

					<h2 className="mt-5 text-2xl">Comments</h2>

					<div className="max-h-370 overflow-y-auto">
					{ pinDetail?.comments?.map((comment, index) => (
						<div className="flex gap-2 mt-5 items-center bg-white rounded-lg" key={index}>
							<img 
								src={comment.postedBy.image} 
								alt="user-profile" 
								className="w-10 h-10 rounded-full cursor-pointer"
							/>

							<div className="flex flex-col">
								<p className="font-bold">{ comment.postedBy.userName }</p>
								<p>{ comment.comment }</p>
							</div>						
						</div>
					))}
					</div>

					<div className="flex flex-wrap mt-6 gap-3">
						<UserAvatar
							user={user}
							hasName={false}
							imgClassName="w-10 h-10 rounded-full cursor-pointer"
						/>

						<input 
							type="text" 
							className="flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300"
							value={comment}
							placeholder="Add a comment"
							onChange={(e) => setComment(e.target.value)}
							disabled={addingComment}
						/>

						<button
							type="button"
							className="bg-red-500 hover:bg-red-400 text-white rounded-full px-6 py-2 font-semibold text-base outline-none"
							disabled={addingComment}
							onClick={() => handleAddComment()}
						>
							{ addingComment ? 'Posting the comment...' : 'Post' }
						</button>
					</div>
				</div>

			</div>

			{ !!pins?.length ? (
				<>
					<h2 className="text-center font-bold text-2xl mt-8 mb-4">
						More like this

						<MasonryLayout pins={pins} />
					</h2>
				</>
			) : (<Spinner message="Loading more like this..." />)}
		</>
	);
}
