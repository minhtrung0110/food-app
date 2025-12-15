import {create} from 'zustand';
import { IBottomSheetAction, IBottomSheetState } from '@/stores/bottom-sheet/type';


const useBottomSheetStore = create<IBottomSheetState & IBottomSheetAction>((set, get) => ({
  contentType: null,
  meta: null,
  setContentType: (contentType, meta) => set({contentType, meta: meta ?? null}),
  closeBottomSheet: () => set({contentType: null, meta: null}),
}))

export default useBottomSheetStore;
