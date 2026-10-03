import { useEffect } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

export type IndicatorProps = {
  state: { index: number };
  getTabWidth: (index: number) => number;
};

export const CharactersTopBarIndicator = (props: IndicatorProps) => {
  const { getTabWidth, state } = props;
  const tabWidth = getTabWidth(0);
  const translateX = useSharedValue(state.index * tabWidth);

  useEffect(() => {
    translateX.value = withSpring(state.index * tabWidth, {
      mass: 1,
      damping: 20,
      stiffness: 200,
    });
  }, [state.index, tabWidth, translateX]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <Animated.View
      className="h-0.5 bg-indigo-600 absolute bottom-0"
      style={[{ width: tabWidth }, animatedStyle]}
    />
  );
};
