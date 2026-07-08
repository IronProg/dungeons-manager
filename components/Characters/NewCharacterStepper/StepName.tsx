import { Text, TextInput, View } from 'react-native';

import i18n from '@/i18n';

interface StepNameProps {
  name: string;
  onChangeName: (name: string) => void;
  error?: string;
}

export const StepName = ({ name, onChangeName, error }: StepNameProps) => {
  return (
    <View className="justify-center items-center px-4 w-full">
      <Text className="text-gray-500 text-sm mb-6">
        {i18n.t('character.whatsName')}
      </Text>

      <TextInput
        value={name}
        onChangeText={onChangeName}
        placeholder={i18n.t('character.enterName')}
        className="bg-white border border-gray-200 rounded-xl py-3 px-4 text-center text-lg text-gray-800 w-full max-w-xs"
        autoFocus
        autoCapitalize="words"
        maxLength={50}
      />

      {error ? (
        <Text className="text-red-400 text-sm mt-2">{error}</Text>
      ) : null}
    </View>
  );
};
