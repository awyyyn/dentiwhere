import { Skeleton } from "@/components/ui/skeleton";

export default function ClinicSkeleton() {
	return (
		<div className="bg-white flex gap-4 flex-col md:flex-row  rounded-xl shadow-xl p-6 md:p-14 space-y-3">
			<div>
				<Skeleton className="h-40 w-full md:w-40 rounded-lg" />
			</div>
			<div className=" space-y-3   w-full">
				<Skeleton className="h-10 w-56" />
				<div className="flex justify-between gap-y-3 md:gap-y-0 flex-col md:flex-row ">
					<div className="space-y-3">
						<div className="flex space-x-2">
							<Skeleton className="h-8 w-8" />
							<Skeleton className="h-8 w-60" />
						</div>
						<div className="flex space-x-2">
							<Skeleton className="h-8 w-8" />
							<Skeleton className="h-8 w-60" />
						</div>
					</div>
					<div className="md:self-end self-center">
						<Skeleton className="rounded-lg h-8 w-28 bg-gray-400" />
					</div>
				</div>
			</div>
		</div>
	);
}
