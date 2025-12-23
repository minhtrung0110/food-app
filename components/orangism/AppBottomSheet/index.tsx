import React, { useCallback, useEffect, useRef, useState } from 'react';
import { BackHandler, Keyboard, Platform, StyleProp, View, ViewStyle } from 'react-native';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetHandleProps,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TBottomSheetContentType } from '@/stores/bottom-sheet/type';
import { Indicator } from '@/components/orangism/AppBottomSheet/indicator';
import useBottomSheetStore from '@/stores/bottom-sheet/store';
import { COLOR } from '@/constants/Colors';
import SearchLocationBottomSheet from '@/features/tabs/home/components/location/SearchLocationBottomSheet';
import ListPartnerBottomSheet from '@/features/tabs/home/components/partner/ListPartner';

export interface BottomSheetProps {
  height?: number;
  handleComponent?: React.FC<BottomSheetHandleProps>;
  indicator?: boolean;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  backDropOpacity?: number;
  enablePanDownToClose?: boolean;
  snapPoints?: string[];
}

const AppBottomSheet = ({
  handleComponent,
  indicator = true,
  style,
  containerStyle,
  contentStyle,
  backDropOpacity = 0.4,
  enablePanDownToClose = false,
  snapPoints,
  ...props
}: BottomSheetProps) => {
  const { contentType, closeBottomSheet } = useBottomSheetStore();
  const bottomSheetRef = useRef<BottomSheet>(null);

  const { top: safeTopArea, bottom: safeBottomArea } = useSafeAreaInsets();

  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const keyboardWillShow = Keyboard.addListener('keyboardWillShow', (e) => {
      setKeyboardHeight(e.endCoordinates.height);
    });
    const keyboardWillHide = Keyboard.addListener('keyboardWillHide', () => {
      setKeyboardHeight(0);
    });
    return () => {
      keyboardWillShow.remove();
      keyboardWillHide.remove();
    };
  }, []);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      onClose();
      return !!contentType;
    });
    return () => {
      backHandler.remove();
    };
  }, [contentType]);

  useEffect(() => {
    if (contentType) {
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [contentType, bottomSheetRef]);

  const renderBottomSheetContent = useCallback((contentType: TBottomSheetContentType) => {
    switch (contentType) {
      case 'search_product':
        return <SearchLocationBottomSheet />;
      case 'filter_product':
        return <SearchLocationBottomSheet />;
      case 'search_location':
        return <SearchLocationBottomSheet />;
      case 'list_best_partner':
        return <ListPartnerBottomSheet />;
      // case 'check_eligibility':
      //   return <EligibilityBottomSheet/>
      // case 'contact_information':
      //   return <ContactInformationBottomSheet/>
      // case 'total_fee':
      //   return <TotalFeeBottomSheet/>
      // case 'applicant_information':
      //   return <ApplicantBottomSheet/>
      // case 'select_language':
      //   return <SelectLanguageBottomSheet/>
      default:
        return <View style={{ height: 100 }} />;
    }
  }, []);
  const onClose = () => {
    if (contentType) {
      closeBottomSheet();
    }
  };

  return (
    <BottomSheet
      {...(Platform.OS === 'android' ? { index: -1 } : {})}
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      enableDynamicSizing={!snapPoints}
      animateOnMount
      enableOverDrag={false}
      enablePanDownToClose={true}
      enableContentPanningGesture={false}
      onClose={onClose}
      backdropComponent={(props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          style={{ zIndex: 1000, backgroundColor: 'red' }}
          {...props}
          pressBehavior="close"
          opacity={backDropOpacity}
          disappearsOnIndex={-1}
        />
      )}
      style={[style, { overflow: 'hidden' }]}
      containerStyle={containerStyle}
      handleStyle={{
        position: 'absolute',
        width: '100%',
      }}
      topInset={safeTopArea}
      handleIndicatorStyle={{ backgroundColor: 'transparent' }}
      keyboardBehavior={'extend'}>
      {Platform.OS === 'android' || contentType ? (
        <BottomSheetView
          className={'rounded-t-2xl border'}
          style={[
            {
              backgroundColor: COLOR.white,
              overflow: 'hidden',
            },
            contentStyle,
          ]}>
          {indicator && <Indicator indicatorWidth={63} />}
          {contentType && renderBottomSheetContent(contentType)}
          <View
            style={{
              height: Platform.OS === 'ios' && keyboardHeight ? keyboardHeight : safeBottomArea,
            }}
          />
        </BottomSheetView>
      ) : null}
    </BottomSheet>
  );
};

export default AppBottomSheet;
