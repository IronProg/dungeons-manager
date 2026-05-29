import type {
  BottomSheetBackdropProps,
  BottomSheetProps,
} from '@gorhom/bottom-sheet';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import type { ReactNode, Ref } from 'react';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { Keyboard, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type DisposableBottomSheetHandle<T> = {
  show: (params: T) => void;
};

export type DisposableBottomSheetProps<T> = Omit<
  BottomSheetProps,
  'children'
> & {
  renderContent: (props: { params: T; onClose: () => void }) => ReactNode;
};

function DisposableBottomSheetInner<T>(
  { renderContent, ...props }: DisposableBottomSheetProps<T>,
  ref: Ref<DisposableBottomSheetHandle<T>>,
) {
  const { bottom } = useSafeAreaInsets();
  const innerRef = useRef<BottomSheet>(null);
  const [params, setParams] = useState<T | null>(null);

  const renderBackdrop = (props: BottomSheetBackdropProps) => (
    <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
  );

  useImperativeHandle(ref, () => {
    return {
      show(params: T) {
        setParams(params);
      },
    };
  }, []);

  if (params === null) return null;

  const styles = buildStyles(bottom);

  return (
    <BottomSheet
      ref={innerRef}
      backdropComponent={renderBackdrop}
      index={0}
      enablePanDownToClose
      topInset={bottom}
      enableDynamicSizing={false}
      keyboardBehavior="fillParent"
      {...props}
      onClose={() => {
        Keyboard.dismiss();
        setParams(null);
      }}
    >
      <BottomSheetScrollView
        style={styles.flex}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >
        {renderContent({
          params: params!,
          onClose: () => innerRef.current?.close(),
        })}
      </BottomSheetScrollView>
    </BottomSheet>
  );
}

export const DisposableBottomSheet = forwardRef(DisposableBottomSheetInner) as <
  T,
>(
  props: DisposableBottomSheetProps<T> & {
    ref?: Ref<DisposableBottomSheetHandle<T>>;
  },
) => ReactNode;

const buildStyles = (bottom: number) =>
  StyleSheet.create({
    flex: { flex: 1 },
    contentContainer: { padding: 24, paddingBottom: 24 + bottom },
  });
