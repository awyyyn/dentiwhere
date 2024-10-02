import { Card, CardContent } from "@/components/ui/card";
import { AsyncImage } from "loadable-image";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";

// GUINOBATAN = https://scontent.flgp1-1.fna.fbcdn.net/v/t1.6435-9/57297836_2343997612536105_9196792262376292352_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=2a1932&_nc_eui2=AeE0LRx_j-rscT5OMxnGQaNChKExZWNvWfSEoTFlY29Z9GQSfD0tiQJzSuFfNY8VD4CHlgY55bfz-8ccUOFxN-KN&_nc_ohc=nYdDfjEMiqsQ7kNvgHd1Ojk&_nc_ht=scontent.flgp1-1.fna&_nc_gid=ArwxxXJvNENlCTtrpFm_fNJ&oh=00_AYAWXK7F8qWXs-ZgqJxqssLmEaIc-K5fu36vnO4XClHowA&oe=67222B14

// LIGAO = https://scontent.flgp1-1.fna.fbcdn.net/v/t39.30808-6/460843895_3822435394751043_2073815357668793575_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=86c6b0&_nc_eui2=AeF9mH835tSaDtoxWOmtnVuMfCBAAxISxq18IEADEhLGrfEdTugEoMMckXJLpMahpykWJ81BVk_XfXMipoFUYFC7&_nc_ohc=SJ7M8g0xfjgQ7kNvgHl_sRm&_nc_ht=scontent.flgp1-1.fna&_nc_gid=AUDxKKAjSLUGYVqx7TFzW-b&oh=00_AYDOFynhyUB7oNR7yRrIhBPyESRnVpg1NEpkFEJ6V3YDDw&oe=670096F2

//

export default function CarouselSize() {
	return (
		<section className="  overflow-hidden py-10 md:py-0 ">
			<div className="flex md:flex-row flex-col justify-between   mx-auto w-11/12 md:w-10/12">
				<Carousel
					opts={{
						align: "start",
					}}
					className="w-full   bg-wshite ">
					<CarouselContent>
						{Array.from({ length: 5 }).map((_, index) => (
							<CarouselItem key={index} className="basis-96">
								<div className="p-1 h-[300px]">
									<AsyncImage
										className="h-full w-full object-cover"
										src="https://scontent.flgp1-1.fna.fbcdn.net/v/t39.30808-6/460843895_3822435394751043_2073815357668793575_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=86c6b0&_nc_eui2=AeF9mH835tSaDtoxWOmtnVuMfCBAAxISxq18IEADEhLGrfEdTugEoMMckXJLpMahpykWJ81BVk_XfXMipoFUYFC7&_nc_ohc=SJ7M8g0xfjgQ7kNvgHl_sRm&_nc_ht=scontent.flgp1-1.fna&_nc_gid=AUDxKKAjSLUGYVqx7TFzW-b&oh=00_AYDOFynhyUB7oNR7yRrIhBPyESRnVpg1NEpkFEJ6V3YDDw&oe=670096F2"
										srcSet="https://scontent.flgp1-1.fna.fbcdn.net/v/t39.30808-6/460843895_3822435394751043_2073815357668793575_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=86c6b0&_nc_eui2=AeF9mH835tSaDtoxWOmtnVuMfCBAAxISxq18IEADEhLGrfEdTugEoMMckXJLpMahpykWJ81BVk_XfXMipoFUYFC7&_nc_ohc=SJ7M8g0xfjgQ7kNvgHl_sRm&_nc_ht=scontent.flgp1-1.fna&_nc_gid=AUDxKKAjSLUGYVqx7TFzW-b&oh=00_AYDOFynhyUB7oNR7yRrIhBPyESRnVpg1NEpkFEJ6V3YDDw&oe=670096F2"
										alt="ligao"
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
