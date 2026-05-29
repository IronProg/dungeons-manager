import type {
  BottomSheetBackdropProps,
  BottomSheetProps,
} from '@gorhom/bottom-sheet';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import type { ReactNode, Ref } from 'react';
import {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { Keyboard } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type DisposableBottomSheetHandle<T> = {
  show: (params: T) => void;
};

type DisposableBottomSheetProps<T> = Omit<BottomSheetProps, 'children'> & {
  renderContent: (props: { params: T; onClose: () => void }) => ReactNode;
};

function DisposableBottomSheetInner<T>(
  { renderContent, ...props }: DisposableBottomSheetProps<T>,
  ref: Ref<DisposableBottomSheetHandle<T>>,
) {
  const { bottom } = useSafeAreaInsets();
  const innerRef = useRef<BottomSheet>(null);
  const [params, setParams] = useState<T | null>(null);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    [],
  );

  useImperativeHandle(ref, () => {
    return {
      show(params: T) {
        setParams(params);
      },
    };
  }, []);

  if (params === null) return null;

  return (
    <BottomSheet
      key={params ? 'active' : 'inactive'}
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
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 24, paddingBottom: 24 + bottom }}
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

export const DisposableBottomSheet = memo(
  forwardRef(DisposableBottomSheetInner),
) as <T>(
  props: DisposableBottomSheetProps<T> & {
    ref?: Ref<DisposableBottomSheetHandle<T>>;
  },
) => ReactNode;
