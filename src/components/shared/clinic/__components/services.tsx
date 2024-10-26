import { Category, Service } from "@/types/types";

interface ServicesProps {
	categories: Category[];
	services: Service[];
}

export default function Services({ categories, services }: ServicesProps) {
	return (
		<div className="pb-10 grid grid-flow-row sm:grid-cols-2 md:grid-cols-3 gap-3">
			{categories
				? categories.map((category) => {
						const servicesByCategory = services.filter(
							(service) => service.categoryId === category.id
						);

						return (
							servicesByCategory.length > 0 && (
								<div
									className="shadow-lg p-3 bg-1/10 rounded-lg border-none"
									key={`${category.id}`}>
									<div className="flex flex-row justify-between p-2 ">
										<h1 className="font-extrabold tracking-wide md:text-2xl text-lg capitalize">
											{category.name}
										</h1>
									</div>
									<div className="px-5 pt-2  ">
										<ul className="list-disc pl-5	">
											{servicesByCategory.map((service) => (
												<li
													key={service.id}
													className="text-lg md:text-xl font-semibold capitalize">
													{service.name}
												</li>
											))}
										</ul>
									</div>
								</div>
							)
						);
				  })
				: null}
		</div>
	);
}
