import LogoWithText from "@/components/shared/logo-with-text/logo-with-text.tsx";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
	return (
		<section>
			<div className="md:px-3   grid gap-y-5 lg:grid-cols-4  mt-8 lg:mt-10 lg:gap-y-0 divide-y-reverse ">
				<div className=" order-1 justify-self-center   col-span-1  lg:order-2  ">
					<LogoWithText />
				</div>
				<div className="order-2 md:order-1 lg:col-span-3 space-y-5">
					{children}
				</div>
			</div>
		</section>
	);
}
