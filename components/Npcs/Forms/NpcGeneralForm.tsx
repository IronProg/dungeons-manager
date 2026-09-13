import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import type { KeyboardTypeOptions } from 'react-native';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { z } from 'zod';

import {
  getChangedNpcScalars,
  getNpcGeneralDefaultValues,
} from '@/components/Npcs/Forms/npcFormValues';
import { AppKeyboardAvoidingView } from '@/components/ui/AppKeyboardAvoidingView';
import { Button } from '@/components/ui/Button';
import { buildNpcUpdatePayload } from '@/core/helpers/npcPayload';
import i18n from '@/i18n';
import { useUpdateNpcMutation } from '@/services/npcs/npc.api';
import type { Npc, NpcScalars } from '@/types/npc';

const optionalStringLimit = 255;

const nonNegativeInteger = z
  .number()
  .int(i18n.t('validation.mustBeInteger'))
  .min(0, i18n.t('validation.numberMin', { min: 0 }));

const npcGeneralSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, i18n.t('validation.stringMin', { min: 2 }))
    .max(100, i18n.t('validation.stringMax', { max: 100 })),
  hitPoints: nonNegativeInteger.max(
    500,
    i18n.t('validation.numberMax', { max: 500 }),
  ),
  hitPointsLimit: nonNegativeInteger.max(
    500,
    i18n.t('validation.numberMax', { max: 500 }),
  ),
  hitPointsLimitTemporary: nonNegativeInteger
    .max(500, i18n.t('validation.numberMax', { max: 500 }))
    .nullable(),
  temporaryHitPoints: nonNegativeInteger
    .max(500, i18n.t('validation.numberMax', { max: 500 }))
    .nullable(),
  armorClass: nonNegativeInteger,
  speeds: z
    .string()
    .trim()
    .max(
      optionalStringLimit,
      i18n.t('validation.stringMax', { max: optionalStringLimit }),
    ),
  senses: z
    .string()
    .trim()
    .max(
      optionalStringLimit,
      i18n.t('validation.stringMax', { max: optionalStringLimit }),
    ),
  languages: z
    .string()
    .trim()
    .max(
      optionalStringLimit,
      i18n.t('validation.stringMax', { max: optionalStringLimit }),
    ),
  challengeRating: z
    .string()
    .trim()
    .regex(/^\d+(?:\.\d+)?$/, i18n.t('validation.invalidFormat')),
  challengeRatingInfo: z
    .string()
    .trim()
    .max(
      optionalStringLimit,
      i18n.t('validation.stringMax', { max: optionalStringLimit }),
    ),
});

type NpcGeneralFormValues = z.infer<typeof npcGeneralSchema>;

type NpcGeneralFormProps = {
  npc: Npc;
};

const toOptionalString = (value: string): string | null => value || null;

const getGeneralScalars = (
  npc: Npc,
  values: NpcGeneralFormValues,
): NpcScalars =>
  getChangedNpcScalars(
    {
      name: npc.name,
      hitPoints: npc.hitPoints,
      hitPointsLimit: npc.hitPointsLimit,
      hitPointsLimitTemporary: npc.hitPointsLimitTemporary ?? null,
      temporaryHitPoints: npc.temporaryHitPoints ?? null,
      armorClass: npc.armorClass,
      speeds: npc.speeds ?? null,
      senses: npc.senses ?? null,
      languages: npc.languages ?? null,
      challengeRating: npc.challengeRating,
      challengeRatingInfo: npc.challengeRatingInfo ?? null,
    },
    {
      ...values,
      speeds: toOptionalString(values.speeds),
      senses: toOptionalString(values.senses),
      languages: toOptionalString(values.languages),
      challengeRatingInfo: toOptionalString(values.challengeRatingInfo),
    },
  );

export const NpcGeneralForm = ({ npc }: NpcGeneralFormProps) => {
  const router = useRouter();
  const { mutate: updateNpc, isPending } = useUpdateNpcMutation();
  const { control, handleSubmit } = useForm<NpcGeneralFormValues>({
    resolver: zodResolver(npcGeneralSchema),
    defaultValues: getNpcGeneralDefaultValues(npc),
  });

  const onSubmit = handleSubmit((values) => {
    const scalars = getGeneralScalars(npc, values);

    if (Object.keys(scalars).length === 0) {
      router.back();
      return;
    }

    updateNpc(
      { id: npc.id, params: buildNpcUpdatePayload({ scalars }) },
      { onSuccess: () => router.back() },
    );
  });

  return (
    <AppKeyboardAvoidingView>
      <View className="bg-white rounded-2xl p-5 gap-4 shadow-sm">
        <Text className="text-lg font-semibold text-gray-800">
          {i18n.t('titles.general')}
        </Text>

        <Controller
          control={control}
          name="name"
          render={({ field, fieldState: { error } }) => (
            <FormInput
              label={i18n.t('general.name')}
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              error={error?.message}
              autoCapitalize="words"
              maxLength={100}
            />
          )}
        />

        <Controller
          control={control}
          name="armorClass"
          render={({ field, fieldState: { error } }) => (
            <NumberInput
              label={i18n.t('titles.armorClass')}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={error?.message}
            />
          )}
        />

        <Text className="text-base font-semibold text-gray-800">
          {i18n.t('npcs.hitPoints')}
        </Text>

        <Controller
          control={control}
          name="hitPoints"
          render={({ field, fieldState: { error } }) => (
            <NumberInput
              label={i18n.t('general.current')}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={error?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="hitPointsLimit"
          render={({ field, fieldState: { error } }) => (
            <NumberInput
              label={i18n.t('npcs.hitPointsLimit')}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={error?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="hitPointsLimitTemporary"
          render={({ field, fieldState: { error } }) => (
            <NumberInput
              label={i18n.t('npcs.hitPointsLimitTemporary')}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={error?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="temporaryHitPoints"
          render={({ field, fieldState: { error } }) => (
            <NumberInput
              label={i18n.t('npcs.temporaryHitPoints')}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={error?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="speeds"
          render={({ field, fieldState: { error } }) => (
            <FormInput
              label={i18n.t('titles.speed')}
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              error={error?.message}
              maxLength={optionalStringLimit}
            />
          )}
        />

        <Controller
          control={control}
          name="senses"
          render={({ field, fieldState: { error } }) => (
            <FormInput
              label={i18n.t('npcs.senses')}
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              error={error?.message}
              maxLength={optionalStringLimit}
            />
          )}
        />

        <Controller
          control={control}
          name="languages"
          render={({ field, fieldState: { error } }) => (
            <FormInput
              label={i18n.t('proficiency.languages')}
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              error={error?.message}
              maxLength={optionalStringLimit}
            />
          )}
        />

        <Controller
          control={control}
          name="challengeRating"
          render={({ field, fieldState: { error } }) => (
            <FormInput
              label={i18n.t('npcs.challengeRatingLabel')}
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              error={error?.message}
              keyboardType="decimal-pad"
            />
          )}
        />

        <Controller
          control={control}
          name="challengeRatingInfo"
          render={({ field, fieldState: { error } }) => (
            <FormInput
              label={i18n.t('npcs.challengeRatingInfo')}
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              error={error?.message}
              maxLength={optionalStringLimit}
            />
          )}
        />

        <TouchableOpacity
          onPress={() => router.back()}
          disabled={isPending}
          className="rounded-lg border border-slate-300 py-3"
          activeOpacity={0.8}
        >
          <Text className="text-center text-base font-semibold text-slate-700">
            {i18n.t('general.cancel')}
          </Text>
        </TouchableOpacity>
        <Button
          text={i18n.t('general.save')}
          onPress={onSubmit}
          disabled={isPending}
          loading={isPending}
          textClassName="text-base"
        />
      </View>
    </AppKeyboardAvoidingView>
  );
};

type FormInputProps = {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  onBlur: () => void;
  error?: string;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  keyboardType?: KeyboardTypeOptions;
  maxLength?: number;
};

const FormInput = ({
  label,
  value,
  onChangeText,
  onBlur,
  error,
  autoCapitalize = 'sentences',
  keyboardType,
  maxLength,
}: FormInputProps) => (
  <View>
    <Text className="text-sm font-medium text-gray-700 mb-1">{label}</Text>
    <TextInput
      value={value}
      onChangeText={onChangeText}
      onBlur={onBlur}
      className="h-12 rounded-xl border border-gray-200 bg-white px-4 font-medium text-gray-800"
      autoCapitalize={autoCapitalize}
      autoCorrect={false}
      keyboardType={keyboardType}
      maxLength={maxLength}
      accessibilityLabel={label}
    />
    {error && <Text className="text-red-400 text-sm mt-1">{error}</Text>}
  </View>
);

type NumberInputProps = Omit<
  FormInputProps,
  'value' | 'onChangeText' | 'keyboardType'
> & {
  value: number | null;
  onChange: (value: number) => void;
};

const NumberInput = ({ value, onChange, ...props }: NumberInputProps) => (
  <FormInput
    {...props}
    value={value == null || Number.isNaN(value) ? '' : value.toString()}
    onChangeText={(text) => onChange(text === '' ? Number.NaN : Number(text))}
    keyboardType="number-pad"
  />
);
