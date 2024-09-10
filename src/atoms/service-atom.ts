import { getAllByClinic } from "@/actions/service";
import { Service } from "@/types/types";
import { atom } from "jotai";
import { userAtom } from "./user-atom";
import { atomWithRefresh, loadable } from "jotai/utils";


export const serviceDataAtom = atom<Service | null>(null);

 

export const asyncServicesAtom = atom (async (get) => {
    const user = get(userAtom)
    return await getAllByClinic((user.clinicId ?? "")?.toString()) 
})


export const servicesAtom = atom<Service[]>([])

 
export const loadableServices = loadable(asyncServicesAtom);

export const loadableWithRefresh = atomWithRefresh((get) => {
    const services = get(loadableServices)
    return services
})