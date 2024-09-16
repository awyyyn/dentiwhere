import Layout from "./layout";
import { TbDatabaseOff } from "react-icons/tb";
import { Button } from "@/components/ui/button";

export default function NoRecord({ handleAdd }: { handleAdd: () => void }) {
	return (
		<>
			<Layout>
				<div />
			</Layout>
			<div className="flex flex-col items-center gap-y-1">
				<TbDatabaseOff size={50} />
				<h2 className="text-xl">
					No data available. Click <b>List Your Dental Clinic</b> to get
					started.
				</h2>
				<Button onClick={handleAdd} className="mt-2">
					List your Dental Clinic
				</Button>
			</div>
		</>
	);
}
