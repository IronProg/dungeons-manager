import { CircleOff, Dice6 } from 'lucide-react-native';
import { TouchableOpacity, View } from 'react-native';

import { colors } from '@/core/utils/colors';
import { useDiceRoll } from '@/hooks/useDiceRoll';

export const RollToggleButton = () => {
  const { enabled, setEnabled } = useDiceRoll();

  return (
    <TouchableOpacity
      onPress={() => setEnabled((prev) => !prev)}
      className="bg-white rounded-full p-1"
    >
      <View className="relative p-0.5">
        <Dice6 size={24} color={colors.indigo[600]} />

        {!enabled && (
          <View className="absolute inset-0 rounded-full w-2 h-2">
            <CircleOff size={28} color={colors.red[500]} />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};
