import { Button } from "@/components/ui/button";
import { CiLogout } from "react-icons/ci";
import { ButtonProps } from "../../ui/button";
import { useTranslation } from "react-i18next";

export default function LogoutButton(
	buttonProps: ButtonProps & { showLabel?: boolean }
) {
	const { className, showLabel, ...props } = buttonProps;
	const { t } = useTranslation();

	return (
		<Button
			{...props}
			size={"icon"}
			variant="destructive"
			className={`space-x-2 flex justify-center transition-all min-w-max hover:scale-105 active:scale-95 z-20 p-3 rounded-full text-center w-full duration-300 ${className}`}>
			<CiLogout strokeWidth={2} className="" />
			{showLabel && <span>{t("logOut")}</span>}
		</Button>
	);
}
