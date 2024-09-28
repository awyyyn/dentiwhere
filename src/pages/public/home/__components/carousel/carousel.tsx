import { Card, CardContent } from "@/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";

export default function CarouselSize() {
	return (
		<section className="gradient-qr overflow-hidden py-10 md:py-0 ">
			<div className="flex md:flex-row flex-col justify-between   mx-auto w-11/12 md:w-10/12">
				<Carousel
					opts={{
						align: "start",
					}}
					className="w-full   bg-wshite ">
					<CarouselContent>
						{Array.from({ length: 5 }).map((_, index) => (
							<CarouselItem key={index} className="basis-96">
								<div className="p-1">
									<Card>
										<CardContent className="flex aspect-square items-center justify-center p-6">
											<span className="text-3xl font-semibold">
												{index + 1}
											</span>
										</CardContent>
									</Card>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
					{/* <CarouselPrevious />
					<CarouselNext /> */}
				</Carousel>
			</div>
		</section>
	);
}
