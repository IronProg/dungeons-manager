import { Text, TouchableOpacity } from 'react-native';
import i18n from 'i18n';

type ButtonProps = {
  className?: string;
  text?: string;
  onPress?: () => void;
  disabled?: boolean;
};

export const Button = ({
  className,
  text,
  onPress,
  disabled = false,
}: ButtonProps) => (
  <TouchableOpacity
    onPress={onPress}
    className={`w-full bg-green-600 rounded-lg py-2 ${disabled && 'opacity-75'} ${className || ''}`}
    disabled={disabled}
  >
    <Text className="text-white font-bold text-2xl text-center">
      {text ? text : i18n.t('general.save')}
    </Text>
  </TouchableOpacity>
);
