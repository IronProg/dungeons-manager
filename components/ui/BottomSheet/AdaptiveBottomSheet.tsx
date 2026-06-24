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
import { Keyboard, StyleSheet, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type AdaptiveBottomSheetHandle<T> = {
  show: (params: T) => void;
};

export type AdaptiveBottomSheetProps<T> = Omit<
  BottomSheetProps,
  | 'children'
  | 'snapPoints'
  | 'enableDynamicSizing'
  | 'keyboardBehavior'
  | 'keyboardBlurBehavior'
  | 'maxDynamicContentSize'
  | 'topInset'
> & {
  renderContent: (props: { params: T; onClose: () => void }) => ReactNode;
  topInset?: number;
};

function AdaptiveBottomSheetInner<T>(
  {
    renderContent,
    topInset: customTopInset,
    ...props
  }: AdaptiveBottomSheetProps<T>,
  ref: Ref<AdaptiveBottomSheetHandle<T>>,
) {
  const { top: safeTop, bottom } = useSafeAreaInsets();
  const { height: windowHeight } = useWindowDimensions();
  const innerRef = useRef<BottomSheet>(null);
  const [params, setParams] = useState<T | null>(null);

  const resolvedTopInset = customTopInset ?? safeTop;
  const maxDynamicContentSize = windowHeight - resolvedTopInset;

  const renderBackdrop = (props: BottomSheetBackdropProps) => (
    <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
  );

  useImperativeHandle(
    ref,
    () => ({
      show(params: T) {
        setParams(params);
      },
    }),
    [],
  );

  if (params === null) return null;

  const styles = buildStyles(bottom);

  return (
    <BottomSheet
      ref={innerRef}
      backdropComponent={renderBackdrop}
      index={0}
      enablePanDownToClose
      topInset={resolvedTopInset}
      enableDynamicSizing={true}
      maxDynamicContentSize={maxDynamicContentSize}
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
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

export const AdaptiveBottomSheet = forwardRef(AdaptiveBottomSheetInner) as <T>(
  props: AdaptiveBottomSheetProps<T> & {
    ref?: Ref<AdaptiveBottomSheetHandle<T>>;
  },
) => ReactNode;

const buildStyles = (bottom: number) =>
  StyleSheet.create({
    flex: { flex: 1 },
    contentContainer: { padding: 24, paddingBottom: 24 + bottom },
  });
