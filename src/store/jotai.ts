import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const darkMoodAtom = atomWithStorage('darkMood', false)
export const chatHistoryAtom = atom([]);
export const chatIdAtom = atomWithStorage('chat_id', '')  
export const titleAtom = atomWithStorage('titleAtom', '')  
export const expendAtom = atom(false)
export const hideSidebarAtom = atom(false)
export const usageAtom = atom(0)
export const usagePercentageAtom = atom(0)
export const limitAtom = atom(30000)
export const deleteModalAtom = atom(false)
export const checkNewChatArrivedAtom = atom(false)
export const selectedLanguageAtom = atom({ id: 4, name: 'Bengali' })