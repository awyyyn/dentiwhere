import { geoClinicsLoadable } from "@/atoms";
import { Loader } from "@/components/shared/loader/loader";
import Map from "@/components/shared/map/map";
import { useAtomValue } from "jotai";

export default function ClinicMaps() {
	const loadableClinics = useAtomValue(geoClinicsLoadable);

	if (loadableClinics.state === "loading") return <Loader />;
	if (loadableClinics.state === "hasError") return <div>Error</div>;

	return (
		<div className=" bg-transparent py-5 space-y-5 md:py-10  mx-auto w-11/12 md:w-10/12">
			<h1 className="text-2xl lg:text-5xl font-bold">Map</h1>
			<div className="shadow-xl rounded-sm overflow-hidden ring-4 ring-[#fff]">
				<Map data={loadableClinics.data} />
			</div>
		</div>
	);
}
