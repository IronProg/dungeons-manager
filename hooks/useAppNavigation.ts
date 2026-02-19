import { useNavigation } from '@react-navigation/native';

import type { AppNavigationProp } from 'types/navigation';

export const useAppNavigation = () => {
  return useNavigation<AppNavigationProp>();
};
