import { useRouter } from 'expo-router';
import { FileTextIcon } from 'lucide-react-native';
import { TouchableOpacity } from 'react-native';

import { colors } from '@/core/utils/colors';

export const CharacterDetailsButton = () => {
  const router = useRouter();

  return (
    <TouchableOpacity
      hitSlop={10}
      onPress={() => router.push('/character-details')}
      className="bg-white rounded-full p-2"
    >
      <FileTextIcon size={24} color={colors.indigo[600]} />
    </TouchableOpacity>
  );
};
