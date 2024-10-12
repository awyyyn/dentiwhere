import { AsyncImage } from "loadable-image";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel as CarouselAuto } from "react-responsive-carousel";
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
import Guinobatan2 from "@/assets/images/third_district/municipality-of-guinobatan.jpg";
import Jovellar2 from "@/assets/images/third_district/municipality-of-jovellar.jpg";
import Libon2 from "@/assets/images/third_district/mucipality-of-libon.jpg";
import Ligao2 from "@/assets/images/third_district/city-of-ligao.jpg";
// import Oas2 from "@/assets/images/third_district/oas.png";
// import Pioduran2 from "@/assets/images/third_district/pioduran.png";
import Polangui2 from "@/assets/images/third_district/mucipality-of-polangui.jpg";

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

const items2 = [
	{
		img: Guinobatan2,
		name: "Guinobatan",
	},
	{
		img: Jovellar2,
		name: "Jovellar",
	},
	{
		img: Libon2,
		name: "Libon",
	},
	{
		img: Ligao2,
		name: "Ligao",
	},
	{
		img: Polangui2,
		name: "Polangui",
	},
];

export default function CarouselSize() {
	return (
		<section className="  overflow-hidden py-10 md:py-0 space-y-10 ">
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
			<div className="flex select-none md:flex-row flex-col justify-between   mx-auto w-11/12 md:w-10/12">
				<CarouselAuto
					showArrows={false}
					swipeable
					emulateTouch
					transitionTime={700}
					autoPlay
					infiniteLoop
					stopOnHover
					interval={5000}
					className="   w-full max-h-[700px]">
					{items2.map((item, index) => (
						<div
							key={index}
							className="relative min-h-[700px] w-full h-[700px] group  ">
							{/* <div className="capitalize text-xl tracking-wide text-left px-5 font-bold z-50 absolute w-full  py-5 -bottom-full group-hover:bottom-0 transition-all duration-500 left-0 backdrop-blur-ssm bg-white/60">
								{item.name}
							</div> */}
							<img
								src={item.img}
								className="absolute min-h-[700px] h-[700px] top-0 left-0   w-full "
								alt="Carousel item"
							/>
						</div>
					))}
				</CarouselAuto>
			</div>
		</section>
	);
}
