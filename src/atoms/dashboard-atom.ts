import { getCounts } from "@/actions/dashboard";
import { DashboardAtom } from "@/types/types";
import { atom } from "jotai";
import { loadable } from "jotai/utils";

export const dashboardAtom = atom(async (): Promise<DashboardAtom> => {
	const response = await getCounts();
	return response;
});

export const loadableDashboardAtom = loadable(dashboardAtom);
