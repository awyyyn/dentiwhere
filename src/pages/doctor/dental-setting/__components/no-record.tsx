import { useAtomValue } from "jotai";

/* STATES */
import { userAtom } from "@/atoms";

/* TYPES */
import { Status } from "@/types/types.ts";

/* LAYOUTS */
import Layout from "./layout.tsx";

/* COMPONENTS */
import { Button } from "@/components/ui/button.tsx";

/* ASSETS */
import { MdOutlinePendingActions } from "react-icons/md";
import { TbDatabaseOff } from "react-icons/tb";

export default function NoRecord({ handleAdd }: { handleAdd: () => void }) {
	const user = useAtomValue(userAtom);
	return (
		<>
			<Layout>
				<div />
			</Layout>
			<div className="flex flex-col translate-y-20 md:translate-y-0 text-center items-center gap-y-1">
				{user.status === Status.PENDING ? (
					<>
						<MdOutlinePendingActions size={50} />
						<h2 className="text-xl max-w-sm">
							Your account is under review. You will be notified once your
							account is approved.
						</h2>
					</>
				) : (
					<>
						<TbDatabaseOff size={50} />
						<h2 className="text-xl">
							No data available. Click <b>List Your Dental Clinic</b> to get
							started.
						</h2>
						<Button onClick={handleAdd} className="mt-2">
							List your Dental Clinic
						</Button>
					</>
				)}
			</div>
		</>
	);
}
