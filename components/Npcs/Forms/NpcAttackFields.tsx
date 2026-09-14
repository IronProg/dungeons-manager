import type { Control, UseFormSetValue } from 'react-hook-form';
import { Controller, useWatch } from 'react-hook-form';
import { Switch, Text, TextInput, View } from 'react-native';

import type { NpcEntryFormValues } from '@/components/Npcs/Forms/npcEntryFormValues';
import { AttributePicker } from '@/components/ui/inputs/AttributePicker';
import i18n from '@/i18n';

type NpcAttackFieldsProps = {
  control: Control<NpcEntryFormValues>;
  setValue: UseFormSetValue<NpcEntryFormValues>;
};

const emptyAttack = {
  mainAttribute: null,
  applyProficiency: false,
  customBonus: null,
  range: '',
  properties: '',
  description: '',
};

export const NpcAttackFields = ({
  control,
  setValue,
}: NpcAttackFieldsProps) => {
  const attack = useWatch({ control, name: 'attack' });
  const hasAttack = Boolean(attack && !attack._destroy);

  const toggleAttack = (enabled: boolean) => {
    if (enabled) {
      setValue('attack', emptyAttack);
      return;
    }

    setValue(
      'attack',
      attack?.id ? { id: attack.id, _destroy: true } : undefined,
    );
  };

  return (
    <View className="gap-4 border-t border-slate-200 pt-4">
      <View className="flex-row items-center justify-between">
        <Text className="text-base font-semibold text-gray-800">
          {i18n.t('npcs.attack')}
        </Text>
        <View className="flex-row items-center gap-2">
          <Text className="text-sm text-gray-600">
            {i18n.t('npcs.hasAttack')}
          </Text>
          <Switch value={hasAttack} onValueChange={toggleAttack} />
        </View>
      </View>

      {hasAttack && (
        <>
          <Controller
            control={control}
            name="attack.mainAttribute"
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
            name="attack.applyProficiency"
            render={({ field }) => (
              <View className="flex-row items-center justify-between">
                <Text className="text-sm font-medium text-gray-700">
                  {i18n.t('general.proficiency')}
                </Text>
                <Switch
                  value={field.value ?? false}
                  onValueChange={field.onChange}
                />
              </View>
            )}
          />

          <Controller
            control={control}
            name="attack.customBonus"
            render={({ field, fieldState: { error } }) => (
              <NumberField
                label={i18n.t('general.mod')}
                value={field.value}
                onChange={field.onChange}
                error={error?.message}
                maximum={30}
              />
            )}
          />

          <Controller
            control={control}
            name="attack.range"
            render={({ field, fieldState: { error } }) => (
              <TextField
                label={i18n.t('general.range')}
                value={field.value ?? ''}
                onChange={field.onChange}
                onBlur={field.onBlur}
                error={error?.message}
                maxLength={50}
              />
            )}
          />

          <Controller
            control={control}
            name="attack.properties"
            render={({ field, fieldState: { error } }) => (
              <TextField
                label={i18n.t('general.properties')}
                value={field.value ?? ''}
                onChange={field.onChange}
                onBlur={field.onBlur}
                error={error?.message}
                maxLength={100}
              />
            )}
          />

          <Controller
            control={control}
            name="attack.description"
            render={({ field, fieldState: { error } }) => (
              <TextField
                label={i18n.t('general.description')}
                value={field.value ?? ''}
                onChange={field.onChange}
                onBlur={field.onBlur}
                error={error?.message}
                maxLength={1000}
                multiline
              />
            )}
          />
        </>
      )}
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

type TextFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  error?: string;
  maxLength: number;
  multiline?: boolean;
};

const TextField = ({
  label,
  value,
  onChange,
  onBlur,
  error,
  maxLength,
  multiline = false,
}: TextFieldProps) => (
  <Field label={label}>
    <TextInput
      value={value}
      onChangeText={onChange}
      onBlur={onBlur}
      maxLength={maxLength}
      multiline={multiline}
      className="min-h-12 rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-800"
      accessibilityLabel={label}
    />
    {error && <Text className="text-red-400 text-sm mt-1">{error}</Text>}
  </Field>
);

type NumberFieldProps = {
  label: string;
  value: number | null | undefined;
  onChange: (value: number | null) => void;
  error?: string;
  maximum: number;
};

const NumberField = ({
  label,
  value,
  onChange,
  error,
  maximum,
}: NumberFieldProps) => (
  <Field label={label}>
    <TextInput
      value={value == null || Number.isNaN(value) ? '' : value.toString()}
      onChangeText={(text) => onChange(text === '' ? null : Number(text))}
      keyboardType="number-pad"
      maxLength={maximum.toString().length}
      className="h-12 rounded-xl border border-gray-200 bg-white px-4 font-medium text-gray-800"
      accessibilityLabel={label}
    />
    {error && <Text className="text-red-400 text-sm mt-1">{error}</Text>}
  </Field>
);
