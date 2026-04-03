import { useEffect, useState } from 'react';
import { ActivityIndicator, Text, TextInput, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Controller } from 'react-hook-form';
import { useDebounce } from 'use-debounce';
import i18n from 'i18n';

import { useCurrencyForm } from './useCurrencyForm';
import { useUpdateCurrenciesMutation } from 'services/currencies/currencies';
import { useCharacter } from 'contexts/CharacterContext';

import type { Currencies } from 'types/character';

type CurrencyProps = {
  currencies: Currencies;
  canEdit: boolean;
};

export const Currency = ({ currencies, canEdit }: CurrencyProps) => {
  const { characterId } = useCharacter();
  const [lastFieldUpdate, setLastFieldUpdate] = useState('');
  const { control, getValues } = useCurrencyForm({ currencies });

  const [debouncedFieldUpdate] = useDebounce(lastFieldUpdate, 3000);

  const { mutate: updateCurrencies, isPending } = useUpdateCurrenciesMutation();

  useEffect(() => {
    if (debouncedFieldUpdate && canEdit) {
      updateCurrencies({ characterId: characterId!, ...getValues() });
    }
  }, [characterId, debouncedFieldUpdate, getValues, updateCurrencies, canEdit]);

  return (
    <>
      <View className="w-full relative">
        <Text className="text-2xl font-bold text-center mb-2">
          {i18n.t('titles.currencies')}
        </Text>

        {isPending && (
          <View className="absolute inset-y-0 flex items-center right-4">
            <ActivityIndicator />
          </View>
        )}
      </View>

      <ScrollView
        horizontal
        scrollEnabled
        contentContainerClassName="w-full flex flex-row gap-4 justify-around"
      >
        <View className="border border-gray-400 py-2 rounded-lg flex-1 relative">
          <View className="w-4 h-4 rounded-full bg-amber-700 absolute top-1.5 right-1.5" />

          <Controller
            name="copperPoints"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <>
                <TextInput
                  keyboardType="number-pad"
                  className="w-full text-center px-4 text-xl"
                  value={`${field.value}`}
                  onChangeText={
                    canEdit
                      ? (val) => {
                          field.onChange(val);
                          setLastFieldUpdate(`${field.name}-${val}`);
                        }
                      : undefined
                  }
                  editable={canEdit}
                />

                {error?.message && (
                  <Text className="text-red-400 text-sm">{error?.message}</Text>
                )}
              </>
            )}
          />

          <Text className="text-sm text-center font-medium">
            {i18n.t('currencies.cp')}
          </Text>
        </View>

        <View className="border border-gray-400 py-2 rounded-lg flex-1 relative">
          <View className="w-4 h-4 rounded-full bg-gray-400 absolute top-1.5 right-1.5" />

          <Controller
            name="silverPoints"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <>
                <TextInput
                  keyboardType="number-pad"
                  className="w-full text-center px-4 text-xl"
                  value={`${field.value}`}
                  onChangeText={
                    canEdit
                      ? (val) => {
                          field.onChange(val);
                          setLastFieldUpdate(`${field.name}-${val}`);
                        }
                      : undefined
                  }
                  editable={canEdit}
                />

                {error?.message && (
                  <Text className="text-red-400 text-sm">{error?.message}</Text>
                )}
              </>
            )}
          />

          <Text className="text-sm text-center font-medium">
            {i18n.t('currencies.sp')}
          </Text>
        </View>

        <View className="border border-gray-400 py-2 rounded-lg flex-1 relative">
          <View className="w-4 h-4 rounded-full bg-blue-300 absolute top-1.5 right-1.5" />

          <Controller
            name="electrumPoints"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <>
                <TextInput
                  keyboardType="number-pad"
                  className="w-full text-center px-4 text-xl"
                  value={`${field.value}`}
                  onChangeText={
                    canEdit
                      ? (val) => {
                          field.onChange(val);
                          setLastFieldUpdate(`${field.name}-${val}`);
                        }
                      : undefined
                  }
                  editable={canEdit}
                />

                {error?.message && (
                  <Text className="text-red-400 text-sm">{error?.message}</Text>
                )}
              </>
            )}
          />

          <Text className="text-sm text-center font-medium">
            {i18n.t('currencies.ep')}
          </Text>
        </View>

        <View className="border border-gray-400 py-2 rounded-lg flex-1 relative">
          <View className="w-4 h-4 rounded-full bg-yellow-500 absolute top-1.5 right-1.5" />

          <Controller
            name="goldPoints"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <>
                <TextInput
                  keyboardType="number-pad"
                  className="w-full text-center px-4 text-xl"
                  value={`${field.value}`}
                  onChangeText={
                    canEdit
                      ? (val) => {
                          field.onChange(val);
                          setLastFieldUpdate(`${field.name}-${val}`);
                        }
                      : undefined
                  }
                  editable={canEdit}
                />

                {error?.message && (
                  <Text className="text-red-400 text-sm">{error?.message}</Text>
                )}
              </>
            )}
          />

          <Text className="text-sm text-center font-medium">
            {i18n.t('currencies.gp')}
          </Text>
        </View>

        <View className="border border-gray-400 py-2 rounded-lg flex-1 relative">
          <View className="w-4 h-4 rounded-full bg-slate-200 absolute top-1.5 right-1.5" />

          <Controller
            name="platinumPoints"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <>
                <TextInput
                  keyboardType="number-pad"
                  className="w-full text-center px-4 text-xl"
                  value={`${field.value}`}
                  onChangeText={
                    canEdit
                      ? (val) => {
                          field.onChange(val);
                          setLastFieldUpdate(`${field.name}-${val}`);
                        }
                      : undefined
                  }
                  editable={canEdit}
                />

                {error?.message && (
                  <Text className="text-red-400 text-sm">{error?.message}</Text>
                )}
              </>
            )}
          />

          <Text className="text-sm text-center font-medium">
            {i18n.t('currencies.pp')}
          </Text>
        </View>
      </ScrollView>
    </>
  );
};
