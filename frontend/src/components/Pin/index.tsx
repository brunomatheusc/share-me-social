import { useState } from "react";
import Link from 'next/link';
import { useRouter } from "next/router";
import { v4 as uuidv4 } from 'uuid';

import { MdDownloadForOffline } from 'react-icons/md';
import { AiTwotoneDelete } from 'react-icons/ai';
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';

import { client, urlFor } from "providers/sanityClient";
import useAuth from "hooks/auth";

interface PinProps {
	pin: Pin;
}

export default function Pin({ pin: { _id, destination, image, postedBy, save }}: PinProps) {
	const router = useRouter();
	const { user } = useAuth();

	const replacedDestination = destination.replace('https://', '').replace('http://', '');
	const [postHovered, setPostHovered] = useState(false);
	const [savingPost, setSavingPost] = useState(false);
	const [isAlreadySaved, setIsAlreadySaved] = useState(!!save?.filter((item) => item.postedBy._id === user._id).length || false);

	async function handleSavePin() {
		if (!isAlreadySaved) {
			setSavingPost(true);

			await client
				.patch(_id)
				.setIfMissing({ save: [] })
				.insert('after', 'save[-1]', [{
					_key: uuidv4(),
					userId: user._id,
					postedBy: {
						_type: 'postedBy',
						_ref: user._id
					}
				}])
				.commit()
			;

			router.reload();
			setSavingPost(false);
		}
	}

	async function handleDeletePin() {
		await client.delete(_id);
		router.reload();
	}

	return (
		<div className="w-max">
			<div className="m-2">
				<div
					onMouseEnter={() => setPostHovered(true)}
					onMouseLeave={() => setPostHovered(false)}
					onClick={() => router.push(`/pin-detail/${_id}`)}
					className="relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
				>
					<img 
						src={urlFor(image).width(250).url()} 
						alt="user-post" 
						className="rounded-lg w-full" 
					/>

					{ postHovered && (
					<div 
						className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50"
						style={{ height: '100%' }}
					>
						<div className="flex items-center justify-between">
							<div className="flex gap-2">
								<a 
									href={`${image?.asset.url}?dl=`}
									download
									onClick={(e) => e.stopPropagation()}
									className="bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
								>
									<MdDownloadForOffline />
								</a>
							</div>

							{ isAlreadySaved ? (
								<button type="button" className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none">
									{ save?.length } Saved
								</button>
							) : (								
								<button 
									type="button" 
									className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
									onClick={(e) => { e.stopPropagation(); handleSavePin() }}
									disabled={savingPost}
								>
									Save
								</button>
							)}
						</div>

						<div className="flex justify-between items-center gap-2 w-full">
							{ destination && (
								<a 
									href={destination}
									target="_blank"
									rel="noreferrer"
									className="bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md"
								>
									<BsFillArrowUpRightCircleFill />
									{ replacedDestination.length > 15 ? `${replacedDestination.slice(0, 15)}...` : replacedDestination }
								</a>
							)}

							{ postedBy?._id === user._id && (
								<button 
									type="button" 
									className="bg-white p-2 opacity-70 hover:opacity-100 text-dark font-bold text-base rounded-3xl hover:shadow-md outline-none"
									onClick={(e) => { e.stopPropagation(); handleDeletePin() }}
								>
									<AiTwotoneDelete />
								</button>
							)}
						</div>
					</div>
					)}
				</div>

				<Link href={`/user-profile/${postedBy?._id}`} passHref>
					<a className="flex gap-2 mt-2 items-center">
						<img src={postedBy?.image} referrerPolicy="no-referrer" className="w-8 h-8 rounded-full object-cover" />

						<p className="font-semibold capitalize">{ postedBy?.userName }</p>
					</a>
				</Link>
			</div>
		</div>
	);
}
