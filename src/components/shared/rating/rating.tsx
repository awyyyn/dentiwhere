import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { useState } from "react";

export default function Rating() {
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

	return (
		<div className="flex">
			{[1, 2, 3, 4, 5].map((i) => (
				<Button
					className="p-0 hover:bg-transparent"
					variant="ghost"
					onMouseEnter={() => setHoveredIndex(i)}
					onMouseLeave={() => setHoveredIndex(null)}>
					<Star
						strokeWidth={1.5}
						className={`stroke-white ${
							hoveredIndex !== null && i <= hoveredIndex
								? "fill-yellow-500 stroke-yellow-500"
								: "hover:bg-transparent"
						}`}
					/>
				</Button>
			))}
		</div>
	);
}
