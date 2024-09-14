import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { IoMenu } from "react-icons/io5";
import LogoutButton from "../logout-button/logout-button";
import { useState } from "react";
import { v4 as uuid } from "uuid";

export default function Navbar() {
	const [isOpen, setIsOpen] = useState(false);
	const adminLinks = [
		{
			path: "clinic",
		},
		{
			path: "profile",
		},
	];

	const Links = ({ mobile }: { mobile?: boolean }) => {
		return (
			<div
				className={`${
					mobile ? "flex" : "hidden sm:flex"
				} sm:space-x-5 space-y-3  flex-col sm:flex-row items-center justify-center  w-full sm:w-fit `}>
				<Link to="/" className="w-full sm:w-fit hover:no-underline">
					<Button
						variant="link"
						className="transition-all w-full  sm:w-max duration-300 hover:no-underline hover:bg-1/50 hover:text-gray">
						Home
					</Button>
				</Link>
				{adminLinks.map((link, indx) => (
					<Link
						key={`${link}-${indx}-${uuid()}`}
						to={link.path}
						className="w-full hover:no-underline">
						<Button
							className="capitalize transition-all duration-300 w-full hover:shadow-lg hover:no-underline hover:bg-1/50 hover:text-gray"
							variant="link">
							{link.path}
						</Button>
					</Link>
				))}
				<LogoutButton
					showLabel={mobile}
					className="flex justify-center text-center"
				/>
			</div>
		);
	};

	return (
		<>
			<header className="w-screen fixed top-0 left-0 z-50 bg-white shadow-md">
				<nav>
					<div className=" py-3 w-11/12 md:w-9/12 mx-auto flex flex-row justify-between">
						<Link to="/">
							<h1 className="font-bold tracking-wider text-xl md:text-xl">
								Dentiwhere
							</h1>
						</Link>

						<Button
							className="flex  group bg-1 hover:bg-white hover:border hover:border-1 sm:hidden "
							variant="outline"
							size="icon"
							onClick={() => setIsOpen(true)}>
							<IoMenu size={20} className="stroke-white group-hover:stroke-1" />
						</Button>
						<Links />
					</div>
				</nav>
			</header>
			<Sheet open={isOpen} modal>
				<SheetContent removeCloseIcon className="sm:hidden block">
					<SheetHeader>
						<Link to="/">
							<SheetTitle className="font-bold tracking-wider text-xl md:text-xl">
								Dentiwhere
							</SheetTitle>
						</Link>
						<SheetDescription>
							<Links mobile />
							asd
						</SheetDescription>
					</SheetHeader>
				</SheetContent>
			</Sheet>
		</>
	);
}
