import { useEffect, useState } from "react";

/* ACTIONS */
import { getAllClinics } from "@/actions";

/* HOOKS */
import { useToast } from "@/hooks/use-toast";

/* TYPES */
import { ClinicWithDoctor } from "@/types/types";

/* COMPONENTS */
import Back from "../__components/back/back";
import SectionHeader from "../home/__components/section-header/section-header";
import ClinicCard from "../home/__components/list-of-clinics/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function SuggestedClinics() {
	const [loading, setLoading] = useState(false);
	const [clinics, setClinics] = useState<ClinicWithDoctor[]>([]);
	const { toast } = useToast();

	useEffect(() => {
		(async () => {
			setLoading(true);
			try {
				const data = await getAllClinics();
				const sortedClinics = data.sort(
					(a, b) => (b.boosted ? 1 : 0) - (a.boosted ? 1 : 0)
				);
				setClinics(sortedClinics);
				setLoading(false);
			} catch {
				toast({
					title: "Error",
					description: "Something went wrong. Please try again later.",
					variant: "destructive",
				});
				setLoading(false);
			}
		})();
	}, []);

	return (
		<div className="mx-auto  w-11/12 md:w-10/12 py-5 pb-32">
			<Back toRoot />
			<div className="space-y-5 md:space-y-10">
				<SectionHeader
					title="Suggested Clinics for you"
					description="These clinics are available to serve you with the best care."
				/>

				<div className="space-y-12 flex flex-col">
					{loading
						? [1, 2, 3].map((i) => (
								<div
									key={i}
									className="animate-pulse flex space-x-4 p-4 border rounded-lg shadow-md">
									<Skeleton className="rounded-full h-12 w-12" />
									<div className="flex-1 space-y-4 py-1">
										<Skeleton className="h-4 rounded w-3/4" />
										<div className="space-y-2">
											<Skeleton className="h-4 rounded" />
											<Skeleton className="h-4 rounded w-5/6" />
										</div>
									</div>
								</div>
						  ))
						: clinics.map((clinic) => (
								<ClinicCard
									navigateTo="/suggested-clinics"
									clinic={{
										contact: `+63${clinic.contacts[0].slice(1)}`,
										id: clinic.id,
										name: clinic.name,
										location: clinic.address,
										img: clinic.img,
									}}
								/>
						  ))}
				</div>
			</div>
		</div>
	);
}
