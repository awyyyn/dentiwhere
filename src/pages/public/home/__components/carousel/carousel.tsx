import { AsyncImage } from "loadable-image";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";

/* ASSETS */
import Guinobatan from "@/assets/images/third_district/guinobatan.png";
import Jovellar from "@/assets/images/third_district/jovellar.png";
import Libon from "@/assets/images/third_district/libon.png";
import Ligao from "@/assets/images/third_district/ligao.png";
import Oas from "@/assets/images/third_district/oas.png";
import Pioduran from "@/assets/images/third_district/pioduran.png";
import Polangui from "@/assets/images/third_district/polangui.png";

const items = [
	{
		img: Guinobatan,
		name: "Guinobatan",
	},
	{
		img: Jovellar,
		name: "Jovellar",
	},
	{
		img: Libon,
		name: "Libon",
	},
	{
		img: Ligao,
		name: "Ligao",
	},
	{
		img: Oas,
		name: "Oas",
	},
	{
		img: Pioduran,
		name: "Pioduran",
	},
	{
		img: Polangui,
		name: "Polangui",
	},
];

export default function CarouselSize() {
	return (
		<section className="  overflow-hidden py-10 md:py-0 ">
			<div className="flex md:flex-row flex-col justify-between   mx-auto w-11/12 md:w-10/12">
				<Carousel
					opts={{
						align: "center",
						loop: true,
						dragFree: true,
						active: true,
					}}
					className="w-full  px-[10%] md:px-0  bg-blend-screen    ">
					<CarouselContent className=" ">
						{items.map((item, index) => (
							<CarouselItem key={index} className="md:basis-1/2   lg:basis-1/5">
								<div className="p-1 h-[300px] w-[300px] ">
									<AsyncImage
										className="h-full w-full object-contain bg-blend-screen"
										src={item.img}
										srcSet={item.img}
										alt={item.name}
									/>
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
