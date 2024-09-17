import { ElementType, Suspense } from "react";
import { ImSpinner2 } from "react-icons/im";

// ==============================|| LOADABLE - LAZY LOADING ||============================== //

export const Loader = () => (
	<div className="h-[90dvh] w-full grid place-content-center">
		<ImSpinner2 size={50} className="animate-spin" />
	</div>
);

const Loadable = (Component: ElementType) => (props: any) =>
	(
		<Suspense fallback={<Loader />}>
			<Component {...props} />
		</Suspense>
	);

export default Loadable;
