import { Hospital, UserCheck, Users } from "lucide-react";
import { lazy, Suspense } from "react";
import { ImSpinner2 } from "react-icons/im";

const ChartData = lazy(() => import("../__components/chart"));

export default function Dashboard() {
	return (
		<div className="p-2 md:p-5 lg:p-10 xl:p-14   space-y-5">
			<section className="md:space-y-2">
				<h1 className="text-2xl lg:text-5xl font-bold">Dashboard</h1>
				<p className="text-gray-600 md:text-lg">
					Welcome to your dashboard, manage clinics, doctors, and your profile
					here
				</p>
			</section>
			<section className="grid grid-cols-1 md:grid-cols-3 gap-5">
				<div className="p-5 shadow-xl rounded-xl backdrop-blur-lg bg-white/50 space-y-1 md:space-y-2">
					<div className="flex justify-between">
						<h1 className="text-center">Total Doctors</h1>
						<Users />
					</div>
					<h1 className=" text-5xl font-bold">123</h1>
					<p className=" text-gray-500 text-sm">
						Registered doctors in the platform
					</p>
				</div>
				<div className="p-5 shadow-xl rounded-xl backdrop-blur-lg bg-white/50  space-y-1 md:space-y-2">
					<div className="flex justify-between">
						<h1 className="text-center">Clinics</h1>
						<Hospital />
					</div>
					<h1 className=" text-5xl font-bold">123</h1>
					<p className=" text-gray-500 text-sm">
						Registered clinics in the platform
					</p>
				</div>
				<div className="p-5 shadow-xl rounded-xl backdrop-blur-lg bg-white/50  space-y-1 md:space-y-2">
					<div className="flex justify-between">
						<h1 className="text-center"> Doctors</h1>
						<UserCheck />
					</div>
					<h1 className=" text-5xl font-bold">
						123<span className="text-lg font-normal">/100</span>
					</h1>
					<p className="text-gray-500 text-sm">
						Doctors verified in the platform
					</p>
				</div>
			</section>
			<section>
				<Suspense
					fallback={
						<div className="h-[250px] flex items-center w-full">
							<ImSpinner2 className="animate-spin" size={50} />
						</div>
					}>
					<ChartData />
				</Suspense>
			</section>
		</div>
	);
}
