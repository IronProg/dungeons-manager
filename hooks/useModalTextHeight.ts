import { Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const windowHeight = Dimensions.get('window').height;

export const useModalTextHeight = () => {
  const { top, bottom } = useSafeAreaInsets();

  const modalTextHeight = windowHeight - (top + bottom + 250),
    [bottom, top];

  return { modalTextHeight };
};
