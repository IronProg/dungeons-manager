import { ActivityIndicator, Text, View } from 'react-native';

import { Currency } from '@/components/Equipments/Currency/Currency';
import { useCharacter } from '@/contexts/CharacterContext';
import i18n from '@/i18n';
import { useGetCharacterCurrency } from '@/services/currencies/currencies';

export const Currencies = () => {
  const { canEdit } = useCharacter();
  const { data: currencies, isLoading: isLoadingCurrencies } =
    useGetCharacterCurrency();

  return (
    <View className="flex-col gap-2">
      {isLoadingCurrencies && <ActivityIndicator />}
      {currencies ? (
        <Currency currencies={currencies} canEdit={canEdit} />
      ) : (
        <Text>{i18n.t('currencies.noneFound')}</Text>
      )}
    </View>
  );
};
