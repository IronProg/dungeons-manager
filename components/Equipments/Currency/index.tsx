import { useCharacter } from 'contexts/CharacterContext';
import { ActivityIndicator, Text, View } from 'react-native';
import { useGetCharacterCurrency } from 'services/currencies/currencies';
import { Currency } from './Currency';

export const Currencies = () => {
  const { canEdit } = useCharacter();
  const { data: currencies, isLoading: isLoadingCurrencies } =
    useGetCharacterCurrency();

  return (
    <View className="flex-col gap-2">
      {isLoadingCurrencies && <ActivityIndicator />}
      {currencies ? (
        <Currency currencies={currencies!} canEdit={canEdit} />
      ) : (
        <Text>No currencies found</Text>
      )}
    </View>
  );
};
