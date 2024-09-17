import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { RiNotificationFill } from "react-icons/ri";

export default function Notification() {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					className="relative rounded-full group px-3 hidden sm:flex"
					variant="ghost"
					size="icon">
					<RiNotificationFill className="scale-150 group-hover:scale-[1.8] group-hover:-rotaaste-45 transition-all" />

					<span className="absolute text-xs   transition-all top-1 -right-1 bg-red-500 text-white rounded-full px-1 ">
						2
					</span>
				</Button>
			</PopoverTrigger>
			<PopoverContent
				className="w-80  hidden sm:flex  
                    data-[state=open]:-translate-x-20 
                    data-[state=closed]:-translate-x-20     
                    md:data-[state=open]:-translate-x-36 
                    md:data-[state=closed]:-translate-x-36 
                "
				arrowPadding={2}
				side="bottom">
				<div className="space-y-3">
					<h1>Notification (2)</h1>
					<Separator />
					<div className="group hover:shadow-sm rounded-md hover:cursor-pointer hover:bg-gray-100 p-2">
						<h1 className="font-bold">Notification 1</h1>
						{/* <h1 className="font-bold">Notification 1</h1> */}
						<p>Notification 1 description</p>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	);
}
