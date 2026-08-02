import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';

import { cn } from '@/core/helpers/cn';
import i18n from '@/i18n';

type ButtonProps = {
  className?: string;
  textClassName?: string;
  text?: string;
  hitSlop?: number;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  accessibilityRole?: 'button' | 'link';
  accessibilityLabel?: string;
};

export const Button = ({
  className,
  textClassName,
  text,
  onPress,
  hitSlop,
  disabled = false,
  loading = false,
  accessibilityRole = 'button',
  accessibilityLabel,
}: ButtonProps) => (
  <TouchableOpacity
    onPress={onPress}
    className={cn(
      'w-full bg-green-600 rounded-lg py-2',
      {
        'opacity-75': disabled,
      },
      className,
    )}
    disabled={disabled}
    hitSlop={hitSlop}
    accessibilityRole={accessibilityRole}
    accessibilityLabel={accessibilityLabel ?? text}
  >
    {loading ? (
      <ActivityIndicator />
    ) : (
      <Text
        className={cn(
          'text-white font-bold text-2xl text-center',
          textClassName,
        )}
      >
        {text ?? i18n.t('general.save')}
      </Text>
    )}
  </TouchableOpacity>
);
