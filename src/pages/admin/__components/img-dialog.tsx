import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog.tsx";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button.tsx";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/components/ui/tabs.tsx";
import { useTranslation } from "react-i18next";

interface ImgDialogProps {
	imgs: string[];
	isOpen: boolean;
	handleClose: VoidFunction;
}

export default function ImgDialog({
	handleClose,
	imgs,
	isOpen,
}: ImgDialogProps) {
	const { t } = useTranslation();

	return (
		<Dialog open={isOpen}>
			<DialogContent removeClose className="md:min-w-[600px] lg:min-w-[900px]">
				<DialogHeader>
					<DialogTitle>{t("licensePicture")}</DialogTitle>
					<div className=" ">
						<Tabs defaultValue="frontId" className="w-full">
							<TabsList className="w-full ">
								<TabsTrigger className="w-[50%]" value="frontId">
									{t("frontId")}
								</TabsTrigger>
								<TabsTrigger className="w-[50%]" value="backId">
									{t("backId")}
								</TabsTrigger>
							</TabsList>
							<TabsContent value="frontId">
								<div className="flex w-full max-h-[500px] overflow-hidden items-center justify-center lg:p-6">
									<img src={imgs[0]} alt="front image of license Id" />
								</div>
							</TabsContent>
							<TabsContent value="backId">
								<div className="flex w-full max-h-[500px] overflow-hidden items-center justify-center lg:p-6">
									<img src={imgs[1]} alt="back image of license Id" />
								</div>
							</TabsContent>
						</Tabs>
					</div>

					<DialogClose className="self-end">
						<Button onClick={handleClose}>{t("close")}</Button>
					</DialogClose>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}
