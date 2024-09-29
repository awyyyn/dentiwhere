import { useAtomValue, useSetAtom } from "jotai";

/* STATES */
import {
	accessbilityDialogAtom,
	amenitiesDialogAtom,
	amenitiesAtom,
	accessibilitiesAtom,
} from "@/atoms";

/* COMPONENTS */
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import AmenityDialog from "./amenities-dialog";
import AccessibilityDialog from "./accesibility-dialog";

export default function About() {
	const accessibilites = useAtomValue(accessibilitiesAtom);
	const amenities = useAtomValue(amenitiesAtom);
	const setAmenityDialog = useSetAtom(amenitiesDialogAtom);
	const setAccessibilityDialog = useSetAtom(accessbilityDialogAtom);

	return (
		<section className="space-y-4 mt-4">
			<div className="flex justify-end gap-2 flex-wrap">
				<Button
					className="w-full sm:w-fit"
					onClick={() => setAmenityDialog({ open: true, mode: "create" })}>
					Add Amenity
				</Button>
				<Button
					className="w-full sm:w-fit"
					onClick={() =>
						setAccessibilityDialog({ open: true, mode: "create" })
					}>
					Add Accessibility
				</Button>
			</div>
			<div>
				<h1 className="md:text-2xl font-bold tracking-wider">Description</h1>
				<p className="md:text-xl leading-loose first-letter:ml-[2ch]">
					Lorem ipsum dolor, sit amet consectetur adipisicing elit.
					Exercitationem quisquam qui quaerat at, non, incidunt doloremque sunt
					consequatur quis rerum voluptas sint aliquid saepe impedit, odio nihil
					cupiditate iste dolorum?
				</p>
			</div>
			<Separator className="w-full h-1" />
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
						{accessibilites.map((accessibility) => (
							<div className="" key={`accessibility-${accessibility.id}`}>
								<p className="text-lg md:text-xl">{accessibility.name}</p>
							</div>
						))}
					</div>
				</div>
			</div>
			<AmenityDialog />
			<AccessibilityDialog />
		</section>
	);
}
