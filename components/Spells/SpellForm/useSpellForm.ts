import { zodResolver } from '@hookform/resolvers/zod';
import { Resolver, useForm } from 'react-hook-form';
import z from 'zod';

import { SPELL_SCHOOLS } from 'core/enums/spellSchool';

import { Spell, SpellSlotLevelType } from 'types/character';

const schema = z.object({
  id: z.number().optional(),
  name: z.string(),
  level: z.coerce.number().min(0).max(9),
  school: z.enum(SPELL_SCHOOLS),
  castingTime: z.string(),
  range: z.string(),
  duration: z.string(),
  target: z.string(),
  components: z.string(),
  verbal: z.boolean(),
  somatic: z.boolean(),
  material: z.boolean(),
  concentration: z.boolean(),
  description: z.string(),
  higherLevelDescription: z.string(),
  innateTotal: z.coerce.number<number>().optional(),
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
      name: spell?.name || '',
      level: spell?.level || 0,
      school: spell?.school || SPELL_SCHOOLS[0],
      castingTime: spell?.castingTime ?? '',
      range: spell?.range ?? '',
      duration: spell?.duration ?? '',
      target: spell?.target ?? '',
      components: spell?.components ?? '',
      verbal: spell?.verbal ?? false,
      somatic: spell?.somatic ?? false,
      material: spell?.material ?? false,
      concentration: spell?.concentration ?? false,
      description: spell?.description ?? '',
      higherLevelDescription: spell?.higherLevelDescription ?? '',
      innateTotal: spell?.innateTotal ?? 0,
    },
  });
};
