import i18n from 'i18n';
import { Text, TouchableOpacity } from 'react-native';

type ButtonProps = { text?: string; onPress?: () => void; disabled: boolean };

export const Button = ({ text, onPress, disabled = false }: ButtonProps) => (
  <TouchableOpacity
    onPress={onPress}
    className={`w-full bg-green-600 rounded-lg py-2 ${disabled && 'opacity-75'}`}
    disabled={disabled}
  >
    <Text className="text-white font-bold text-2xl text-center">
      {text ? text : i18n.t('general.save')}
    </Text>
  </TouchableOpacity>
);
