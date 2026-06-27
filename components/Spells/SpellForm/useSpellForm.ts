import { zodResolver } from '@hookform/resolvers/zod';
import type { Resolver } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import z from 'zod';

import { damageSchema } from '@/components/WeaponsAndTools/Attacks/useAttacksForm';
import { ATTRIBUTES } from '@/core/enums/attributes';
import { SPELL_SCHOOLS } from '@/core/enums/spellSchool';
import i18n from '@/i18n';
import type { Spell, SpellSlotLevelType } from '@/types/character';

const spellAttackSchema = z.object({
  id: z.coerce.number<number>(i18n.t('validation.mustBeNumber')).optional(),
  mainAttribute: z.enum(ATTRIBUTES).optional().nullable(),
  applyProficiency: z.boolean(),
  customBonus: z.coerce
    .number<number>(i18n.t('validation.mustBeNumber'))
    .optional(),
});

const schema = z.object({
  id: z.number().optional(),
  name: z.string({ error: i18n.t('validation.required') }),
  level: z.coerce
    .number(i18n.t('validation.mustBeNumber'))
    .min(0, i18n.t('validation.numberMin', { min: 0 }))
    .max(9, i18n.t('validation.numberMax', { max: 9 })),
  school: z.enum(SPELL_SCHOOLS),
  castingTime: z.string({ error: i18n.t('validation.required') }),
  range: z.string({ error: i18n.t('validation.required') }),
  duration: z.string({ error: i18n.t('validation.required') }),
  target: z.string({ error: i18n.t('validation.required') }),
  components: z.string({ error: i18n.t('validation.required') }),
  verbal: z.boolean(),
  somatic: z.boolean(),
  material: z.boolean(),
  concentration: z.boolean(),
  ritual: z.boolean(),
  description: z.string({ error: i18n.t('validation.required') }),
  higherLevelDescription: z.string({ error: i18n.t('validation.required') }),
  innateTotal: z.coerce
    .number<number>(i18n.t('validation.mustBeNumber'))
    .optional(),
  hasAttack: z.boolean(),
  attackAttributes: spellAttackSchema.optional(),
  damagesAttributes: damageSchema.array(),
  higherLevelsDamagesAttributes: damageSchema.array(),
});

export type SpellFormValues = Omit<z.infer<typeof schema>, 'level'> & {
  level: SpellSlotLevelType;
};

export const useSpellForm = (
  { spell }: { spell?: Spell } = { spell: undefined },
) => {
  return useForm<SpellFormValues>({
    resolver: zodResolver(schema) as Resolver<SpellFormValues>,
    defaultValues: {
      id: spell?.id,
      name: spell?.name ?? '',
      level: spell?.level ?? 0,
      school: spell?.school ?? SPELL_SCHOOLS[0],
      castingTime: spell?.castingTime ?? '',
      range: spell?.range ?? '',
      duration: spell?.duration ?? '',
      target: spell?.target ?? '',
      components: spell?.components ?? '',
      verbal: spell?.verbal ?? false,
      somatic: spell?.somatic ?? false,
      material: spell?.material ?? false,
      concentration: spell?.concentration ?? false,
      ritual: spell?.ritual ?? false,
      description: spell?.description ?? '',
      higherLevelDescription: spell?.higherLevelDescription ?? '',
      innateTotal: spell?.innateTotal ?? 0,
      hasAttack: !!spell?.attack,
      attackAttributes: {
        id: spell?.attack?.id,
        mainAttribute: spell?.attack?.mainAttribute ?? null,
        customBonus: spell?.attack?.customBonus,
        applyProficiency: spell?.attack?.applyProficiency ?? false,
      },
      damagesAttributes: spell?.damages ?? [],
      higherLevelsDamagesAttributes: spell?.higherLevelsDamages ?? [],
    },
  });
};
