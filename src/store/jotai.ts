import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const chatHistoryAtom = atom([]);
export const chatIdAtom = atomWithStorage('chat_id', '')  
export const titleAtom = atomWithStorage('titleAtom', '')  
export const expendAtom = atom(false)
export const hideSidebarAtom = atom(false)