import { Check } from 'lucide-react-native';
import { Switch, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useDiceRoll } from '@/contexts/DiceRollContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { colors } from '@/core/utils/colors';
import i18n from '@/i18n';

export const Options = () => {
  const { bottom } = useSafeAreaInsets();
  const { enabled, setEnabled } = useDiceRoll();
  const { locale, setLocale } = useLanguage();

  return (
    <ScrollView
      className="flex-1 bg-slate-100"
      contentContainerClassName="p-4"
      contentContainerStyle={{ paddingBottom: 16 + bottom }}
    >
      <View className="bg-white rounded-xl p-4 mb-4">
        <Text className="text-lg font-semibold text-gray-900 mb-4">
          {i18n.t('options.diceRolling')}
        </Text>

        <View className="flex-row items-center justify-between">
          <Text className="text-base text-gray-700">
            {i18n.t('options.enableDiceRolling')}
          </Text>

          <Switch
            value={enabled}
            onValueChange={(value) => setEnabled(value)}
            trackColor={{ false: colors.gray[300], true: colors.indigo[500] }}
            thumbColor={enabled ? colors.indigo[600] : colors.gray[100]}
          />
        </View>
      </View>

      <View className="bg-white rounded-xl p-4">
        <Text className="text-lg font-semibold text-gray-900 mb-2">
          {i18n.t('options.language')}
        </Text>

        <TouchableOpacity
          onPress={() => setLocale('en')}
          className="flex-row items-center justify-between py-3"
        >
          <Text className="text-base text-gray-700">
            {i18n.t('options.english')}
          </Text>

          {locale === 'en' && <Check size={20} color={colors.indigo[600]} />}
        </TouchableOpacity>

        <View className="h-px bg-gray-200" />

        <TouchableOpacity
          onPress={() => setLocale('pt')}
          className="flex-row items-center justify-between py-3"
        >
          <Text className="text-base text-gray-700">
            {i18n.t('options.portuguese')}
          </Text>

          {locale === 'pt' && <Check size={20} color={colors.indigo[600]} />}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
