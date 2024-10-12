import { format, setYear, startOfYear } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";

export default function CustomDatePicker({
	value,
	handleChange,
	editable,
}: {
	className?: string;
	editable?: boolean;
	value: Date;
	handleChange: (date: Date) => void;
}) {
	const [date, setDate] = useState<Date>(value);
	const [isOpen, setIsOpen] = useState(false);
	const [selectedYear, setSelectedYear] = useState<number>(
		new Date().getFullYear() - 20
	);

	const years = useMemo(() => {
		const last18Year = new Date().getFullYear() - 18;
		return Array.from({ length: 50 }, (_, i) => last18Year - 50 + i);
	}, []);

	const handleYearChange = (year: string) => {
		const newYear = parseInt(year, 10);
		setSelectedYear(newYear);
		if (date) {
			setDate(setYear(date, newYear));
			handleChange(setYear(date, newYear));
		} else {
			setDate(startOfYear(new Date(newYear, 0, 1)));
			handleChange(startOfYear(new Date(newYear, 0, 1)));
		}
	};

	return (
		<Popover
			open={isOpen}
			onOpenChange={(v) => {
				if (editable) {
					setIsOpen(v);
				}
			}}>
			<PopoverTrigger
				asChild
				className="md:ml-2 min-w-full text-lg py-6 px-3 bg-white">
				<Button
					variant={"outline"}
					// disabled={!editing || loading || uploading}
					className={cn(
						"disabled:opacity-100  w-[280px] justify-start text-left font-normal",
						!value && "text-muted-foreground"
					)}>
					<CalendarIcon className="mr-2 h-4 w-4" />
					{value ? format(value, "PPP") : <span>Pick a date</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0" align="start">
				<div className="flex items-center justify-between p-3">
					<Select
						value={selectedYear.toString()}
						onValueChange={handleYearChange}>
						<SelectTrigger className="w-[120px]">
							<SelectValue placeholder="Select year" />
						</SelectTrigger>
						<SelectContent>
							{years.map((year) => (
								<SelectItem key={year} value={year.toString()}>
									{year}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<Calendar
					mode="single"
					selected={date}
					onSelect={(newDate) => {
						if (newDate) {
							setSelectedYear(newDate.getFullYear());
							handleChange(newDate);
						}
						setIsOpen(false);
					}}
					initialFocus
					defaultMonth={date || new Date(selectedYear, 0, 1)}
				/>
			</PopoverContent>
		</Popover>
	);
}
