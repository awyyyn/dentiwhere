import { Separator } from "@/components/ui/separator";
import { Accessibility, Amenities } from "@/types/types";
import Map from "../../map/map";

interface AboutProps {
	description: string;
	amenities: Amenities[];
	accessibilities: Accessibility[];
	map?: { lat: number; lng: number };
}

export default function About({
	description,
	amenities,
	accessibilities,
	map,
}: AboutProps) {
	return (
		<section className="space-y-8 mt-4">
			<div>
				<h1 className="md:text-2xl font-bold tracking-wider">Description</h1>
				<p className="md:text-xl leading-loose first-letter:ml-[2ch]">
					{description}
				</p>
			</div>
			<Separator className="w-full h-1 bg-1/20 " />
			<div className="grid grid-cols-2 grid-flow-row">
				<div className="space-y-2">
					<h1 className="md:text-2xl font-bold tracking-wider">Amenities</h1>
					<div className="space-y-1 px-2">
						{amenities.map((amenity) => (
							<div className="" key={`amenity-${amenity.id}`}>
								<p className="text-lg md:text-xl">{amenity.name}</p>
							</div>
						))}
					</div>
				</div>
				<div className="space-y-2">
					<h1 className="md:text-2xl font-bold tracking-wider">
						Accessibility
					</h1>
					<div className="space-y-1 px-2">
						{accessibilities.map((accessibility) => (
							<div className="" key={`accessibility-${accessibility.id}`}>
								<p className="text-lg md:text-xl">{accessibility.name}</p>
							</div>
						))}
					</div>
				</div>
			</div>
			{map && (
				<>
					<Separator className="w-full h-1 bg-1/20 " />
					<div>
						<h1 className="md:text-2xl font-bold tracking-wider">Map</h1>
						<Map defaultCenter={[map.lat, map.lng]} showMarker />
					</div>
				</>
			)}
		</section>
	);
}
