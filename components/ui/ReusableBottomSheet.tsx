import React, { forwardRef, useCallback, ReactNode } from 'react';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetFooterProps,
  BottomSheetModal,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { Keyboard } from 'react-native';

type ReusableBottomSheetModalProps = {
  snapPoints?: Array<number | string>;
  children: ReactNode;
  onDismiss?: () => void;
  footerComponent?: React.FC<BottomSheetFooterProps>;
};

export const ReusableBottomSheetModal = forwardRef<
  BottomSheetModal,
  ReusableBottomSheetModalProps
>(
  (
    { snapPoints = [300, '65%'], children, onDismiss, footerComponent },
    ref,
  ) => {
    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          pressBehavior="close"
          appearsOnIndex={0}
          disappearsOnIndex={-1}
        />
      ),
      [],
    );

    const handleDismiss = useCallback(() => {
      onDismiss?.();

      Keyboard.dismiss();
    }, [onDismiss]);

    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        footerComponent={footerComponent}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        onDismiss={handleDismiss}
        keyboardBehavior="extend"
        keyboardBlurBehavior="restore"
        android_keyboardInputMode="adjustPan"
      >
        <BottomSheetScrollView
          contentContainerStyle={{ padding: 24 }}
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </BottomSheetScrollView>
      </BottomSheetModal>
    );
  },
);

ReusableBottomSheetModal.displayName = 'ReusableBottomSheetModal';
