import { useCurrencies } from 'contexts/CurrenciesContext';
import { Text, TextInput, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useCurrencyForm } from './useCurrencyForm';
import { Controller } from 'react-hook-form';

export const Currency = () => {
  const { currencies } = useCurrencies();

  const { control } = useCurrencyForm({ currencies });

  return (
    <>
      <Text className="text-2xl font-bold text-center mb-2">Moedas</Text>

      <ScrollView
        horizontal
        scrollEnabled
        contentContainerClassName="w-full flex flex-row gap-4 justify-around"
      >
        <View className="border border-gray-400 py-2 rounded-lg grow">
          <Controller
            name="copperPoints"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <>
                <TextInput
                  className="w-full text-center px-4 text-xl"
                  value={`${field.value}`}
                  onChangeText={field.onChange}
                />

                {error?.message && (
                  <Text className="text-red-400 text-sm">{error?.message}</Text>
                )}
              </>
            )}
          />

          <Text className="text-sm text-center font-medium">CP</Text>
        </View>

        <View className="border border-gray-400 py-2 rounded-lg grow">
          <Controller
            name="silverPoints"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <>
                <TextInput
                  className="w-full text-center px-4 text-xl"
                  value={`${field.value}`}
                  onChangeText={field.onChange}
                />

                {error?.message && (
                  <Text className="text-red-400 text-sm">{error?.message}</Text>
                )}
              </>
            )}
          />

          <Text className="text-sm text-center font-medium">SP</Text>
        </View>

        <View className="border border-gray-400 py-2 rounded-lg grow">
          <Controller
            name="electrumPoints"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <>
                <TextInput
                  className="w-full text-center px-4 text-xl"
                  value={`${field.value}`}
                  onChangeText={field.onChange}
                />

                {error?.message && (
                  <Text className="text-red-400 text-sm">{error?.message}</Text>
                )}
              </>
            )}
          />

          <Text className="text-sm text-center font-medium">EP</Text>
        </View>

        <View className="border border-gray-400 py-2 rounded-lg grow">
          <Controller
            name="goldPoints"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <>
                <TextInput
                  className="w-full text-center px-4 text-xl"
                  value={`${field.value}`}
                  onChangeText={field.onChange}
                />

                {error?.message && (
                  <Text className="text-red-400 text-sm">{error?.message}</Text>
                )}
              </>
            )}
          />

          <Text className="text-sm text-center font-medium">GP</Text>
        </View>

        <View className="border border-gray-400 py-2 rounded-lg grow">
          <Controller
            name="platinumPoints"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <>
                <TextInput
                  className="w-full text-center px-4 text-xl"
                  value={`${field.value}`}
                  onChangeText={field.onChange}
                />

                {error?.message && (
                  <Text className="text-red-400 text-sm">{error?.message}</Text>
                )}
              </>
            )}
          />

          <Text className="text-sm text-center font-medium">PP</Text>
        </View>
      </ScrollView>
    </>
  );
};
