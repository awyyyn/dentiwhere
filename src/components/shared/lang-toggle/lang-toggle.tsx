import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { i18Atom } from "@/atoms";
import { useAtom } from "jotai";
import { CheckIcon, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function LangToggle() {
	const [lang, setLang] = useAtom(i18Atom);
	const [open, setOpen] = useState(false);
	const { i18n } = useTranslation();

	const handleChangeLanguage = (val: typeof lang) => {
		i18n.changeLanguage(val);
		localStorage.setItem("i18n", val);
		setLang(val);
		setOpen(false);
	};

	useEffect(() => {
		i18n.changeLanguage(localStorage.getItem("i18n") || "en");
	}, []);

	return (
		<Popover open={open}>
			<PopoverTrigger
				onClick={() => setOpen((p) => !p)}
				className="  rounded-full scale-90 mt-1 transition-all duration-500">
				<Globe />
			</PopoverTrigger>
			<PopoverContent className="space-y-1" onMouseLeave={() => setOpen(false)}>
				<h1>Languages</h1>
				<Separator />
				<Button
					onClick={() => handleChangeLanguage("en")}
					className={`   w-full rounded-sm flex items-center justify-between ${
						lang === "en" ? "text-black hover:bg-1/40 bg-1/40" : "hover:bg-1/40"
					}`}
					variant="ghost">
					<span>English</span> {lang === "en" && <CheckIcon />}
				</Button>
				<Button
					onClick={() => handleChangeLanguage("fil")}
					className={`w-full rounded-sm flex items-center justify-between ${
						lang === "fil"
							? "text-black hover:bg-1/40 bg-1/40"
							: "hover:bg-1/40"
					}`}
					variant="ghost">
					<span>Filipino</span> {lang === "fil" && <CheckIcon />}
				</Button>
			</PopoverContent>
		</Popover>
	);
}
