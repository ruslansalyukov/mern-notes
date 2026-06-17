const RateLimited = () => {
	return (
		<div className="py-15 px-5 md:px-10">
			<div className="bg-[#222] p-5 rounded-4xl">
				<p className="text-lg text-center text-neutral-300">You've exceeded the request limit. It looks like you've been sending requests very quickly - let's take a short break? Wait a couple of seconds and try again.
				</p>
			</div>
		</div >
	);
}

export default RateLimited;
