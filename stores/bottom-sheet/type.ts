export type TBottomSheetContentType =
  | 'search_product'
  | 'filter_product'
  | 'search_location'
  | 'list_best_partner'
  | 'list_partner'
  | 'list_category'
  | null;

interface IBottomSheetMeta {
  passengerIndex?: number;
  action?: () => void;
  fees?: {
    title: string;
    visaName: string;
    numOfTravelers: number;
    standard_fee: number;
    government_fee: number;
    speed_fee: number;
    total_price: number;
    currency: string;
  };
}

export interface IBottomSheetState {
  contentType: TBottomSheetContentType;
  meta: IBottomSheetMeta | null;
}

export interface IBottomSheetAction {
  setContentType: (value: TBottomSheetContentType, meta?: IBottomSheetMeta) => void;
  closeBottomSheet: () => void;
}
