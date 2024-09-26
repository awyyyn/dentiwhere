import { conditions } from "@/constants/conditions";
import SectionHeader from "../home/__components/section-header/section-header";
import { AsyncImage } from "loadable-image";
import { Blur } from "transitions-kit";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Tooltip } from "@/pages/admin/__components/tooltip";
import { useNavigate } from "react-router-dom";

export default function CommonConditions() {
	const navigate = useNavigate();
	return (
		<div className="py-5">
			<Tooltip tooltip="Back" side="right" delayDuration={500}>
				<Button
					onClick={() => navigate("/")}
					size="icon"
					variant="ghost"
					className="absolute top-2 left-2">
					<ChevronLeft />
				</Button>
			</Tooltip>
			<div className="w-11/12 mx-auto md:w-10/12 space-y-10">
				<header className="space-y-7">
					<SectionHeader
						title="Common Services"
						description="Easily access doctors offering these services"
						buttonLabel="View All"
					/>
				</header>
				<main>
					<div className="space-y-14">
						{conditions.map((condition, indx) => (
							<div
								key={`${condition}-container-${indx}`}
								className="flex gap-5 md:gap-10 items-center lg:flex-row flex-col">
								<AsyncImage
									src={condition.img}
									alt={condition.title}
									Transition={(props) => <Blur radius={20} {...props} />}
									className="shadow-2xl rounded-2xl w-full  md:max-w-[285px] lg:min-w-[400px] xl:min-w-[400px] h-64 sm:h-80 md:h-60 lg:h-72"
								/>
								{/* <img src={condition.img} alt={condition.title}  className="shadow-lg rounded-3xl"/>  */}
								<div className="">
									<p className="text-lg xl:text-xl tracking-wider leading-10">
										<span className="font-bold italic">
											{condition.title}&nbsp;
										</span>
										{condition.description}
									</p>
								</div>
							</div>
						))}
					</div>
				</main>
			</div>
		</div>
	);
}
