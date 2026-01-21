import { Controller } from 'react-hook-form';
import { Attack } from 'types/character';
import { AttacksFormType, useAttacksForm } from './useAttacksForm';
import { Text, TouchableOpacity, View } from 'react-native';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { useCallback } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { ATTRIBUTES } from 'core/enums/attributes';
import { Switch } from 'react-native-gesture-handler';
import { useAttacks } from 'contexts/AttacksContext';
import { DamagesForm } from './DamagesForm';
import { ChevronDown } from 'lucide-react-native';

type AttacksFormProps = {
  attack?: Attack;
  onClose: () => void;
};

export const AttacksForm = ({ attack, onClose }: AttacksFormProps) => {
  const { appendAttack, updateAttack } = useAttacks();
  const { control, handleSubmit } = useAttacksForm({ attack });

  const onSubmit = useCallback(
    (values: AttacksFormType) => {
      if (!attack) {
        appendAttack(values);
      } else {
        updateAttack(attack, values);
      }

      onClose();
    },
    [appendAttack, attack, onClose, updateAttack],
  );

  return (
    <View className="flex flex-col">
      <Text className="text-2xl font-medium text-center mb-2">
        {attack ? 'Editar Ataque' : 'Novo Ataque'}
      </Text>

      <View className="flex flex-row gap-4">
        <View className="grow">
          <Text>Nome</Text>

          <Controller
            control={control}
            name="name"
            render={({ field, fieldState: { error } }) => (
              <>
                <BottomSheetTextInput
                  className="px-4 rounded-lg bg-gray-100 overflow-hidden h-15 max-w-[30vw]"
                  onChangeText={field.onChange}
                  value={`${field.value || ''}`}
                />

                <Text className="text-red-400 text-sm">{error?.message}</Text>
              </>
            )}
          />
        </View>

        <View>
          <Text>Atributo</Text>

          <Controller
            control={control}
            name="attribute"
            render={({ field, fieldState: { error } }) => (
              <>
                <RNPickerSelect
                  onValueChange={(value) => {
                    field.onChange(value === '' ? undefined : value);
                  }}
                  placeholder="Placeholder"
                  value={field.value || ''}
                  useNativeAndroidPickerStyle={false}
                  style={{
                    viewContainer: {
                      backgroundColor: '#f3f3f3ff',
                      width: 120,
                      borderRadius: 20,
                      overflow: 'hidden',
                    },
                  }}
                  items={[
                    { label: 'None', value: '' },
                    ...ATTRIBUTES.map((attr) => ({
                      label: attr,
                      value: attr,
                    })),
                  ]}
                >
                  <View className="rounded-lg bg-gray-100 px-4 h-15 py-3 flex flex-row justify-between items-center gap-2">
                    <Text>{field.value}</Text>

                    <View className="pt-1">
                      <ChevronDown size={12} />
                    </View>
                  </View>
                </RNPickerSelect>

                <Text className="text-red-400 text-sm">{error?.message}</Text>
              </>
            )}
          />
        </View>

        <View className="grow">
          <Text>Mod</Text>

          <Controller
            control={control}
            name="customBonus"
            render={({ field, fieldState: { error } }) => (
              <>
                <BottomSheetTextInput
                  className="px-4 rounded-lg bg-gray-100 overflow-hidden h-15"
                  onChangeText={field.onChange}
                  value={`${field.value || ''}`}
                  keyboardType="numeric"
                />

                <Text className="text-red-400 text-sm">{error?.message}</Text>
              </>
            )}
          />
        </View>

        <View className="flex flex-col items-start">
          <Text>Prof</Text>

          <Controller
            control={control}
            name="applyProficiency"
            render={({ field, fieldState: { error } }) => (
              <>
                <Switch
                  value={field.value}
                  onValueChange={field.onChange}
                  className="pt-5"
                />

                <Text className="text-red-400 text-sm">{error?.message}</Text>
              </>
            )}
          />
        </View>
      </View>

      <View className="flex flex-row gap-4">
        <View className="grow">
          <Text>Alcance</Text>

          <Controller
            control={control}
            name="range"
            render={({ field, fieldState: { error } }) => (
              <>
                <BottomSheetTextInput
                  className="px-4 rounded-lg bg-gray-100 overflow-hidden h-15"
                  onChangeText={field.onChange}
                  value={`${field.value || ''}`}
                />

                <Text className="text-red-400 text-sm">{error?.message}</Text>
              </>
            )}
          />
        </View>

        <View className="grow">
          <Text>Propriedades</Text>

          <Controller
            control={control}
            name="properties"
            render={({ field, fieldState: { error } }) => (
              <>
                <BottomSheetTextInput
                  className="px-4 rounded-lg bg-gray-100 overflow-hidden h-15"
                  onChangeText={field.onChange}
                  value={`${field.value || ''}`}
                />

                <Text className="text-red-400 text-sm">{error?.message}</Text>
              </>
            )}
          />
        </View>
      </View>

      <DamagesForm control={control} />

      <View className="flex flex-row gap-4">
        <View className="grow">
          <Text>Descrição</Text>

          <Controller
            control={control}
            name="properties"
            render={({ field, fieldState: { error } }) => (
              <>
                <BottomSheetTextInput
                  className="px-4 rounded-lg bg-gray-100 overflow-hidden h-15"
                  onChangeText={field.onChange}
                  value={`${field.value || ''}`}
                  numberOfLines={3}
                  multiline
                />

                <Text className="text-red-400 text-sm">{error?.message}</Text>
              </>
            )}
          />
        </View>
      </View>

      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        className="w-full bg-primary-600 rounded-lg py-2"
      >
        <Text className="text-white font-bold text-2xl text-center">
          Salvar
        </Text>
      </TouchableOpacity>
    </View>
  );
};
