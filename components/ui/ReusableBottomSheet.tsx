import React, { forwardRef, useCallback, ReactNode } from 'react';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetFooterProps,
  BottomSheetModal,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';

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

    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        footerComponent={footerComponent}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        onDismiss={onDismiss}
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
