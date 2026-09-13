import { Minus, Plus } from 'lucide-react-native';
import type { Control } from 'react-hook-form';
import { Controller, useFieldArray } from 'react-hook-form';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

import type { NpcEntryFormValues } from '@/components/Npcs/Forms/npcEntryFormValues';
import { AttributePicker } from '@/components/ui/inputs/AttributePicker';
import { DamageDicePicker } from '@/components/ui/inputs/DamageDicePicker';
import i18n from '@/i18n';

type NpcDamageFieldsProps = {
  control: Control<NpcEntryFormValues>;
};

export const NpcDamageFields = ({ control }: NpcDamageFieldsProps) => {
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'damages',
    keyName: 'fieldId',
  });

  const removeDamage = (index: number) => {
    const damage = fields[index];
    if (damage?.id) {
      update(index, { ...damage, deleted: true });
      return;
    }

    remove(index);
  };

  return (
    <View className="gap-4 border-t border-slate-200 pt-4">
      <View className="flex-row items-center justify-between">
        <Text className="text-base font-semibold text-gray-800">
          {i18n.t('titles.damages')}
        </Text>
        <TouchableOpacity
          onPress={() =>
            append({
              diceAmount: 1,
              diceSize: 6,
              mainAttribute: null,
              customBonus: null,
              kind: '',
            })
          }
          className="flex-row items-center gap-1 rounded-lg bg-green-600 px-3 py-2"
          accessibilityLabel={i18n.t('npcs.addDamage')}
        >
          <Plus size={16} color="white" />
          <Text className="font-semibold text-white">
            {i18n.t('general.add')}
          </Text>
        </TouchableOpacity>
      </View>

      {fields.map((damage, index) => {
        if (damage.deleted) return null;

        return (
          <View
            key={damage.fieldId}
            className="gap-3 rounded-xl border border-slate-200 p-3"
          >
            <View className="flex-row items-center justify-between">
              <Text className="font-semibold text-gray-800">
                {i18n.t('general.damage')} {index + 1}
              </Text>
              <TouchableOpacity
                onPress={() => removeDamage(index)}
                className="rounded-lg bg-red-500 p-2"
                accessibilityLabel={i18n.t('general.delete')}
              >
                <Minus size={16} color="white" />
              </TouchableOpacity>
            </View>

            <View className="flex-row gap-3">
              <View className="flex-1">
                <Controller
                  control={control}
                  name={`damages.${index}.diceAmount`}
                  render={({ field, fieldState: { error } }) => (
                    <NumberInput
                      label={i18n.t('general.dice')}
                      value={field.value}
                      onChange={field.onChange}
                      error={error?.message}
                    />
                  )}
                />
              </View>
              <View className="flex-1">
                <Text className="text-sm font-medium text-gray-700 mb-1">
                  d
                </Text>
                <Controller
                  control={control}
                  name={`damages.${index}.diceSize`}
                  render={({ field, fieldState: { error } }) => (
                    <DamageDicePicker
                      value={field.value}
                      onChange={field.onChange}
                      error={error?.message}
                    />
                  )}
                />
              </View>
            </View>

            <Controller
              control={control}
              name={`damages.${index}.mainAttribute`}
              render={({ field, fieldState: { error } }) => (
                <Field label={i18n.t('general.attribute')}>
                  <AttributePicker
                    value={field.value}
                    onChange={field.onChange}
                    error={error?.message}
                  />
                </Field>
              )}
            />

            <Controller
              control={control}
              name={`damages.${index}.customBonus`}
              render={({ field, fieldState: { error } }) => (
                <NumberInput
                  label={i18n.t('general.mod')}
                  value={field.value}
                  onChange={field.onChange}
                  error={error?.message}
                />
              )}
            />

            <Controller
              control={control}
              name={`damages.${index}.kind`}
              render={({ field, fieldState: { error } }) => (
                <Field label={i18n.t('general.damageType')}>
                  <TextInput
                    value={field.value ?? ''}
                    onChangeText={field.onChange}
                    onBlur={field.onBlur}
                    maxLength={30}
                    className="h-12 rounded-xl border border-gray-200 bg-white px-4 font-medium text-gray-800"
                    accessibilityLabel={i18n.t('general.damageType')}
                  />
                  {error?.message && (
                    <Text className="text-red-400 text-sm mt-1">
                      {error.message}
                    </Text>
                  )}
                </Field>
              )}
            />
          </View>
        );
      })}
    </View>
  );
};

type FieldProps = {
  label: string;
  children: React.ReactNode;
};

const Field = ({ label, children }: FieldProps) => (
  <View>
    <Text className="text-sm font-medium text-gray-700 mb-1">{label}</Text>
    {children}
  </View>
);

type NumberInputProps = {
  label: string;
  value: number | null | undefined;
  onChange: (value: number | null) => void;
  error?: string;
};

const NumberInput = ({ label, value, onChange, error }: NumberInputProps) => (
  <Field label={label}>
    <TextInput
      value={value == null || Number.isNaN(value) ? '' : value.toString()}
      onChangeText={(text) => onChange(text === '' ? null : Number(text))}
      keyboardType="number-pad"
      className="h-12 rounded-xl border border-gray-200 bg-white px-4 font-medium text-gray-800"
      accessibilityLabel={label}
    />
    {error && <Text className="text-red-400 text-sm mt-1">{error}</Text>}
  </Field>
);
