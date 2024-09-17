import { userAtom } from "@/atoms/user-atom";
import { useAtomValue } from "jotai";
import { AsyncImage } from "loadable-image";
import { CiLocationOn } from "react-icons/ci";
import { PiPhoneLight } from "react-icons/pi";
// import { TbWorldWww } from "react-icons/tb";
import { TbLicense } from "react-icons/tb";
import { Blur } from "transitions-kit";

export default function Profile() {
	const user = useAtomValue(userAtom);

	return (
		<div className=" ">
			<section className="w-full shadow-[]">
				<div className="py-10 flex flex-col md:flex-row items-center md:space-x-10 ">
					<div>
						<AsyncImage
							src={user?.img ?? ""}
							alt={user?.name}
							Transition={(props) => <Blur radius={20} {...props} />}
							className="shadow-lg w-60 h-60 lg:h-72 lg:w-72 rounded-full"
						/>
					</div>
					<div className="self space-y-2 md:space-y-4">
						<h1 className="lg:text-5xl md:text-3xl text-xl font-extrabold tracking-wider">
							{user?.name}
						</h1>
						<div className="flex space-x-2">
							<TbLicense size={30} strokeWidth={1} />
							<p className="md:text-xl text-lg">{user?.licenseNumber}</p>
						</div>
						<div className="flex space-x-2">
							<CiLocationOn size={30} strokeWidth={1} />
							<p className="md:text-xl text-lg">{user?.address}</p>
						</div>
						{user?.contacts && user?.contacts?.length > 0 && (
							<div className="flex space-x-2">
								<PiPhoneLight size={30} strokeWidth={1} />
								<p className="md:text-xl text-lg">
									{user?.contacts.join(" / ")}
								</p>
							</div>
						)}
						{/* {user?. && (
							<div className="flex space-x-2">
								<TbWorldWww size={30} strokeWidth={1} />
								<p className="md:text-xl text-lg">{user.website}</p>
							</div>
						)} */}

						<div className="flex space-x-2">
							{/* <Button
								className="bg-1 text-white"
								size="lg"
								onClick={() => {
									navigate(`/user/edit/${user?.id}`, {
										state: { user: user },
									});
								}}>
								Edit
							</Button> */}
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
