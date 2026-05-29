import { useEffect } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import type { TabBarIndicatorProps, Route } from 'react-native-tab-view';
import colors from 'tailwindcss/colors';

export const CharactersTopBarIndicator = (
  props: TabBarIndicatorProps<Route>,
) => {
  const { navigationState, getTabWidth } = props;
  const tabWidth = getTabWidth(0);
  const translateX = useSharedValue(navigationState.index * tabWidth);

  useEffect(() => {
    translateX.value = withSpring(navigationState.index * tabWidth, {
      mass: 1,
      damping: 20,
      stiffness: 200,
    });
  }, [navigationState.index, tabWidth, translateX]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <Animated.View
      style={[
        {
          width: tabWidth,
          height: 2,
          backgroundColor: colors.indigo[600],
          position: 'absolute',
          bottom: 0,
        },
        animatedStyle,
      ]}
    />
  );
};
