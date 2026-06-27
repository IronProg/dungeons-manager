import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { ATTRIBUTES } from '@/core/enums/attributes';
import { SKILLS } from '@/core/enums/proficiencies';
import i18n from '@/i18n';
import type { Skill } from '@/types/character';

export const schema = z.object({
  name: z.enum(SKILLS),
  mainAttribute: z.enum(ATTRIBUTES),
  proficiency: z.boolean(),
  expertise: z.boolean(),
  customBonus: z.coerce
    .number<number>(i18n.t('validation.mustBeNumber'))
    .int(i18n.t('validation.mustBeInteger'))
    .optional(),
  extraAttribute: z.enum(ATTRIBUTES).optional().nullable(),
});

export type SkillFormType = z.infer<typeof schema>;

type useSkillFormProps = {
  skill: Skill;
};

export const useSkillForm = ({ skill }: useSkillFormProps) => {
  const { control, handleSubmit, watch, getValues, formState } =
    useForm<SkillFormType>({
      resolver: zodResolver(schema),
      defaultValues: {
        name: skill.name,
        mainAttribute: skill.mainAttribute,
        proficiency: skill.proficiency ?? false,
        expertise: skill.expertise ?? false,
        customBonus: skill.customBonus,
        extraAttribute: skill.extraAttribute,
      },
    });

  return {
    control,
    handleSubmit,
    watch,
    getValues,
    formState,
    errors: formState.errors,
  };
};
