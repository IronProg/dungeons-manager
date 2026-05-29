import type { ReactNode } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import type { KeyboardAwareScrollViewProps } from 'react-native-keyboard-controller';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import type { AnimatedScrollViewComponent } from 'react-native-keyboard-controller/lib/typescript/components/ScrollViewWithBottomPadding';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type AppKeyboardAvoidingViewProps = {
  children: ReactNode;
};

export const AppKeyboardAvoidingView = ({
  children,
  ...props
}: AppKeyboardAvoidingViewProps & KeyboardAwareScrollViewProps) => {
  const { bottom } = useSafeAreaInsets();

  return (
    <KeyboardAwareScrollView
      ScrollViewComponent={ScrollView as AnimatedScrollViewComponent}
      keyboardShouldPersistTaps="always"
      className="flex-1 bg-slate-200"
      contentContainerClassName="p-4 gap-4"
      contentContainerStyle={{ paddingBottom: 16 + bottom }}
      automaticallyAdjustContentInsets={true}
      bottomOffset={60}
      enabled={true}
      {...props}
    >
      {children}
    </KeyboardAwareScrollView>
  );
};
