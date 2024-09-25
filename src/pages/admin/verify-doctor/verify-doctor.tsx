import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast.ts";
import { ViewVerifyDoctor } from "@/pages/admin/__components/view-verify-doctor.tsx";
import { doctorAtom } from "@/atoms/doctors-atom.ts";
import { Loader } from "@/components/shared/loader/loader.tsx";
import { useSetAtom } from "jotai";
import { getOneDoctor } from "@/actions/user.ts";

export const VerifyDoctor = () => {
	const navigate = useNavigate();
	const params = useParams();
	const { toast } = useToast();
	const setDoctor = useSetAtom(doctorAtom);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchDoctor = async () => {
			const placeholderImg =
				"https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png";
			if (!params.id) {
				toast({
					variant: "destructive",
					title: "Error: Not found",
					description: "The doctor is not found",
				});
				return navigate("/doctors", { replace: true });
			}

			try {
				setLoading(true);
				const response = await getOneDoctor(Number(params.id));
				if (response === null) return new Error("DOCTOR_NOT_FOUND");
				setDoctor({
					...response,
					img: response?.img ?? placeholderImg,
					licenseId: {
						frontImg: response?.licenseId.frontImg ?? placeholderImg,
						backImg: response?.licenseId.backImg ?? placeholderImg,
					},
				});
				setLoading(false);
			} catch (error) {
				setLoading(false);
				console.error(error);
			}
		};
		(async () => {
			await fetchDoctor();
		})();
	}, [params.id]);

	if (loading) return <Loader />;

	return <ViewVerifyDoctor verify />;
};
