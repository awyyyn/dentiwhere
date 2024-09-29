import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { searchClinicDialogAtom } from "@/atoms/dialogs-atom";
import { useAtom } from "jotai";
import InputWithIcon from "../input-with-icon/input-with-icon";
import { RiCloseLargeLine } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { FaSearch } from "react-icons/fa";
import { debounce } from "lodash";
import { useState, useCallback, useEffect } from "react";
import { getBoostedClinics, searchClinic } from "@/actions";
import { ClinicWithDoctor } from "@/types/types.ts";
import { AsyncImage } from "loadable-image";
import { Blur } from "transitions-kit";
import { Contact, Map, User } from "lucide-react";
import { ImSpinner2 } from "react-icons/im";
import { useToast } from "@/hooks/use-toast.ts";
import { useNavigate } from "react-router-dom";

export default function SearchClinic() {
	const navigate = useNavigate();
	const [isOpen, setIsOpen] = useAtom(searchClinicDialogAtom);
	const [defaultClinics, setDefaultClinics] = useState<ClinicWithDoctor[]>([]);
	const [results, setResults] = useState<ClinicWithDoctor[]>([]);
	const [searching, setSearching] = useState(false);
	const [loading, setLoading] = useState(false);
	const { toast } = useToast();

	const handleSearch = async (value: string) => {
		setLoading(true);
		if (value) {
			setSearching(true);
			const response = await searchClinic(value);
			setResults(response);
		} else {
			setSearching(false);
			setResults([]);
		}
		setLoading(false);
	};

	useEffect(() => {
		(async () => {
			try {
				setLoading(true);
				const results = await getBoostedClinics();
				setDefaultClinics(results);
				setLoading(false);
			} catch {
				setLoading(false);
				setDefaultClinics([]);
				toast({
					title: "Error",
					description: "An error occurred, Please try again late.",
					variant: "destructive",
				});
			}
		})();
	}, []);

	const debouncedSearch = useCallback(debounce(handleSearch, 1000), []);

	const Card = (clinic: ClinicWithDoctor) => {
		return (
			<div
				onClick={() => navigate(`/clinics/view/${clinic.id}`)}
				className="rounded-lg gap-2 items-center border flex shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer p-2 md:p-5">
				<div>
					<AsyncImage
						alt={`clinic profile`}
						src={
							clinic.img ??
							"https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
						}
						Transition={(props) => <Blur radius={20} {...props} />}
						className="object-fill shadow-sm border rounded-2xl w-20 h-20"
					/>
				</div>
				<div className="space-y-1">
					<h1 className="font-bold text-xl md:text-2xl capitalize">
						{clinic.name}
					</h1>
					<div className="flex items-center gap-1">
						<User className="h-4 w-4 md:h-5 md:w-5" />
						<h1 className="capitalize font-semibold md:text-md text-sm text-gray-600">
							{clinic.doctor}
						</h1>
					</div>
					<div className="flex items-center gap-1">
						<Contact className="h-4 w-4 md:h-5 md:w-5" />
						<p className="capitalize text-gray-500 md:text-md text-sm">
							+63{clinic.contacts[0].slice(1)}
						</p>
					</div>
					<div className="flex items-center gap-1">
						<Map className="h-4 w-4 md:h-5 md:w-5" />
						<p className="capitalize text-gray-500 md:text-md text-sm">
							{clinic.address}
						</p>
					</div>
					{/*<p>Rating</p>*/}
				</div>
			</div>
		);
	};

	const SearchLoading = () => (
		<div className="w-full h-96 flex justify-center items-center">
			<ImSpinner2 size={50} className="animate-spin" />
		</div>
	);

	return (
		<Dialog open={isOpen} modal>
			<DialogContent
				removeClose
				className="bg-white -translate-y-80 md:min-w-[800px] lg:min-w-[900px] xl:min-w-[1200px] ">
				<Button
					size="icon"
					variant="ghost"
					onClick={() => setIsOpen(false)}
					className="absolute top-2 right-2">
					<RiCloseLargeLine size={25} />
				</Button>
				<DialogHeader>
					<DialogTitle>Search Clinic</DialogTitle>
				</DialogHeader>
				<div>
					<InputWithIcon
						className="py-4 rounded-[7px] bg-white border "
						startIcon={<FaSearch size={25} />}
						inputProps={{
							onChange: (e) => debouncedSearch(e.target.value),
							placeholder: "Search...",
						}}
					/>
				</div>
				<div className="max-h-[70vh] md:max-h-[60vh] overflow-y-scroll scrollbar-hide">
					<div className="space-y-4 p-2 pb-10">
						{loading ? (
							<SearchLoading />
						) : searching ? (
							results.length > 0 ? (
								results.map((clinic) => <Card key={clinic.id} {...clinic} />)
							) : (
								<h1>No Results</h1>
							)
						) : (
							defaultClinics.map((clinic) => (
								<Card key={clinic.id} {...clinic} />
							))
						)}
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
