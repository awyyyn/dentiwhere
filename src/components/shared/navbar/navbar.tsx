import LogoutButton from "../logout-button/logout-button";
import Notification from "../notification/notification";

export default function Navbar() {
	return (
		<>
			<header className=" right-0 fixed top-0   z-10  ">
				<nav className="">
					<div className="space-x-3 py-3 px-2 md:w-10/12 lg:md:w-9/12 mx-auto flex flex-row justify-end">
						<Notification />
						<LogoutButton
							showLabel={false}
							className="flex justify-center text-center"
						/>
					</div>
				</nav>
			</header>
		</>
	);
}
