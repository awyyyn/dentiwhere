import { userAtom } from "@/atoms/user-atom";
import { useAtomValue } from "jotai";
import Layout from "./layout";

export default function DentalSetting() {
	const user = useAtomValue(userAtom);

	return <Layout>sd</Layout>;
}
