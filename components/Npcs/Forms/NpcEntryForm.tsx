import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { Controller, useForm, useWatch, type Resolver } from 'react-hook-form';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { z } from 'zod';

import { NpcAttackFields } from '@/components/Npcs/Forms/NpcAttackFields';
import { NpcDamageFields } from '@/components/Npcs/Forms/NpcDamageFields';
import {
  buildNpcEntryParams,
  getNpcEntryDefaultValues,
  type NpcEntryFormValues,
} from '@/components/Npcs/Forms/npcEntryFormValues';
import { AppKeyboardAvoidingView } from '@/components/ui/AppKeyboardAvoidingView';
import { Button } from '@/components/ui/Button';
import { SelectPicker } from '@/components/ui/inputs/SelectPicker';
import i18n from '@/i18n';
import { useUpdateNpcMutation } from '@/services/npcs/npc.api';
import type { Npc, NpcEntry, NpcEntryKind } from '@/types/npc';

const entryKinds: { id: NpcEntryKind; label: string }[] = [
  { id: 'trait', label: i18n.t('npcs.traits') },
  { id: 'reaction', label: i18n.t('npcs.reactions') },
  { id: 'action', label: i18n.t('npcs.actions') },
  { id: 'legendaryAction', label: i18n.t('npcs.legendaryActions') },
];

const optionalInteger = (maximum: number) =>
  z
    .number()
    .int(i18n.t('validation.mustBeInteger'))
    .min(0, i18n.t('validation.numberMin', { min: 0 }))
    .max(maximum, i18n.t('validation.numberMax', { max: maximum }))
    .nullable()
    .optional();

const npcEntrySchema = z
  .object({
    id: z.number().optional(),
    kind: z.enum(['trait', 'reaction', 'action', 'legendaryAction']),
    title: z
      .string()
      .trim()
      .min(1, i18n.t('validation.stringMin', { min: 1 }))
      .max(100, i18n.t('validation.stringMax', { max: 100 })),
    description: z
      .string()
      .trim()
      .max(1000, i18n.t('validation.stringMax', { max: 1000 })),
    cost: z
      .string()
      .trim()
      .max(30, i18n.t('validation.stringMax', { max: 30 }))
      .nullable()
      .optional(),
    attack: z
      .object({
        id: z.number().optional(),
        mainAttribute: z
          .enum([
            'strength',
            'dexterity',
            'constitution',
            'intelligence',
            'wisdom',
            'charisma',
          ])
          .nullable()
          .optional(),
        applyProficiency: z.boolean().optional(),
        customBonus: optionalInteger(30),
        range: z
          .string()
          .max(50, i18n.t('validation.stringMax', { max: 50 }))
          .nullable()
          .optional(),
        properties: z
          .string()
          .max(100, i18n.t('validation.stringMax', { max: 100 }))
          .nullable()
          .optional(),
        description: z
          .string()
          .max(1000, i18n.t('validation.stringMax', { max: 1000 }))
          .nullable()
          .optional(),
        _destroy: z.literal(true).optional(),
      })
      .optional(),
    damages: z
      .array(
        z.object({
          id: z.number().optional(),
          diceAmount: z
            .number()
            .int(i18n.t('validation.mustBeInteger'))
            .min(1, i18n.t('validation.numberMin', { min: 1 }))
            .max(99, i18n.t('validation.numberMax', { max: 99 }))
            .nullable()
            .optional(),
          diceSize: z
            .union([
              z.literal(4),
              z.literal(6),
              z.literal(8),
              z.literal(10),
              z.literal(12),
            ])
            .nullable()
            .optional(),
          mainAttribute: z
            .enum([
              'strength',
              'dexterity',
              'constitution',
              'intelligence',
              'wisdom',
              'charisma',
            ])
            .nullable()
            .optional(),
          customBonus: optionalInteger(99),
          kind: z
            .string()
            .max(30, i18n.t('validation.stringMax', { max: 30 }))
            .nullable()
            .optional(),
          deleted: z.boolean().optional(),
        }),
      )
      .optional(),
  })
  .superRefine((values, context) => {
    for (const [index, damage] of (values.damages ?? []).entries()) {
      if (damage.deleted) continue;

      if (damage.diceAmount == null) {
        context.addIssue({
          code: 'custom',
          message: i18n.t('validation.numberMin', { min: 1 }),
          path: ['damages', index, 'diceAmount'],
        });
      }

      if (damage.diceSize == null) {
        context.addIssue({
          code: 'custom',
          message: i18n.t('validation.invalidFormat'),
          path: ['damages', index, 'diceSize'],
        });
      }
    }
  });

type NpcEntryFormProps = {
  npc: Npc;
  entry?: NpcEntry;
  kind?: NpcEntryKind;
};

export const NpcEntryForm = ({ npc, entry, kind }: NpcEntryFormProps) => {
  const router = useRouter();
  const { mutate: updateNpc, isPending } = useUpdateNpcMutation();
  const { control, handleSubmit, setValue } = useForm<NpcEntryFormValues>({
    resolver: zodResolver(npcEntrySchema) as Resolver<NpcEntryFormValues>,
    defaultValues: getNpcEntryDefaultValues(entry, kind),
  });
  const currentKind = useWatch({ control, name: 'kind' });

  const selectKind = (selectedValue: string | number | null) => {
    const nextKind = entryKinds.find(({ id }) => id === selectedValue)?.id;

    if (nextKind) {
      setValue('kind', nextKind);

      if (nextKind !== 'legendaryAction') setValue('cost', undefined);

      if (nextKind !== 'action') {
        setValue('attack', undefined);
        setValue('damages', undefined);
      } else if (currentKind !== 'action') {
        setValue('damages', []);
      }
    }
  };

  const onSubmit = handleSubmit((values) => {
    const legendaryCost = values.cost?.trim();
    const entryParams = buildNpcEntryParams({
      ...values,
      cost:
        values.kind === 'legendaryAction'
          ? legendaryCost?.length
            ? legendaryCost
            : null
          : undefined,
      ...(values.kind === 'action'
        ? {}
        : { attack: undefined, damages: undefined }),
    });

    updateNpc(
      { id: npc.id, params: { entriesAttributes: [entryParams] } },
      { onSuccess: () => router.back() },
    );
  });

  return (
    <AppKeyboardAvoidingView>
      <View className="gap-4 rounded-2xl bg-white p-5 shadow-sm">
        <Text className="text-lg font-semibold text-gray-800">
          {entry ? i18n.t('npcs.editEntry') : i18n.t('npcs.newEntry')}
        </Text>

        <Controller
          control={control}
          name="kind"
          render={({ field, fieldState: { error } }) => (
            <Field label={i18n.t('npcs.entryKind')} error={error?.message}>
              <SelectPicker
                value={field.value}
                onChange={selectKind}
                items={entryKinds}
                error={error?.message}
              />
            </Field>
          )}
        />

        <Controller
          control={control}
          name="title"
          render={({ field, fieldState: { error } }) => (
            <InputField
              label={i18n.t('general.title')}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={error?.message}
              maxLength={100}
            />
          )}
        />

        <Controller
          control={control}
          name="description"
          render={({ field, fieldState: { error } }) => (
            <InputField
              label={i18n.t('general.description')}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={error?.message}
              maxLength={1000}
              multiline
            />
          )}
        />

        {currentKind === 'legendaryAction' && (
          <Controller
            control={control}
            name="cost"
            render={({ field: costField, fieldState: { error } }) => (
              <InputField
                label={i18n.t('npcs.cost')}
                value={costField.value ?? ''}
                onChange={costField.onChange}
                onBlur={costField.onBlur}
                error={error?.message}
                maxLength={30}
              />
            )}
          />
        )}

        {currentKind === 'action' && (
          <>
            <NpcAttackFields control={control} setValue={setValue} />
            <NpcDamageFields control={control} />
          </>
        )}

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

type FieldProps = {
  label: string;
  error?: string;
  children: React.ReactNode;
};

const Field = ({ label, error, children }: FieldProps) => (
  <View>
    <Text className="text-sm font-medium text-gray-700 mb-1">{label}</Text>
    {children}
    {error && <Text className="text-red-400 text-sm mt-1">{error}</Text>}
  </View>
);

type InputFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  error?: string;
  maxLength: number;
  multiline?: boolean;
};

const InputField = ({
  label,
  value,
  onChange,
  onBlur,
  error,
  maxLength,
  multiline = false,
}: InputFieldProps) => (
  <Field label={label} error={error}>
    <TextInput
      value={value}
      onChangeText={onChange}
      onBlur={onBlur}
      maxLength={maxLength}
      multiline={multiline}
      className="min-h-12 rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-800"
      accessibilityLabel={label}
    />
  </Field>
);
