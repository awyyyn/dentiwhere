import { PaymentPartialInfo } from "@/types/types";
import { atom } from "jotai";

export const paymentsAtom = atom<PaymentPartialInfo[]>([]);
