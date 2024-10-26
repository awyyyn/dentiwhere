import { Separator } from "@/components/ui/separator";
import { Accessibility, Amenities } from "@/types/types";
import Map from "../../map/map";
import { useTranslation } from "react-i18next";

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
	const { t } = useTranslation();
	return (
		<section className="space-y-8 mt-4">
			<div>
				<h1 className="md:text-2xl font-bold tracking-wider">
					{t("description")}
				</h1>
				<p className="md:text-xl leading-loose first-letter:ml-[2ch]">
					{description}
				</p>
			</div>
			<Separator className="w-full h-1 bg-1/20 " />
			<div className="grid grid-cols-2 grid-flow-row">
				<div className="space-y-2">
					<h1 className="md:text-2xl font-bold tracking-wider">
						{t("amenities")}
					</h1>
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
						{t("accessibility")}
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
						<h1 className="md:text-2xl font-bold tracking-wider">{t("map")}</h1>
						<Map
							defaultCenter={[map.lng, map.lat]}
							showMarker
							interactive={false}
						/>
					</div>
				</>
			)}
		</section>
	);
}
