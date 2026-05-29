import type { ReactNode } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import type { KeyboardAwareScrollViewProps } from 'react-native-keyboard-controller';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import type { AnimatedScrollViewComponent } from 'react-native-keyboard-controller/lib/typescript/components/ScrollViewWithBottomPadding';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '@/core/utils/colors';

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
