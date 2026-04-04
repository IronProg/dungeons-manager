import {
  KeyboardAwareScrollView,
  KeyboardAwareScrollViewProps,
} from 'react-native-keyboard-controller';
import { ScrollView } from 'react-native-gesture-handler';
import { colors } from 'core/utils/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AnimatedScrollViewComponent } from 'react-native-keyboard-controller/lib/typescript/components/ScrollViewWithBottomPadding';
import { ReactNode } from 'react';

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
      style={{ flex: 1, backgroundColor: colors.slate[200] }}
      contentContainerStyle={{
        padding: 16,
        gap: 16,
        paddingBottom: 16 + bottom,
      }}
      automaticallyAdjustContentInsets={true}
      bottomOffset={60}
      enabled={true}
      {...props}
    >
      {children}
    </KeyboardAwareScrollView>
  );
};
