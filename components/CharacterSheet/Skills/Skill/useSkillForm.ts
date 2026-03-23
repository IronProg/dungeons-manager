import { zodResolver } from '@hookform/resolvers/zod';
import { ATTRIBUTES } from 'core/enums/attributes';
import { SKILLS } from 'core/enums/proficiencies';
import { useForm } from 'react-hook-form';
import { Skill } from 'types/character';
import * as z from 'zod';

export const schema = z.object({
  name: z.enum(SKILLS),
  mainAttribute: z.enum(ATTRIBUTES),
  proficiency: z.boolean(),
  expertise: z.boolean(),
  customBonus: z.coerce.number<number>().int().optional(),
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
        proficiency: skill.proficiency || false,
        expertise: skill.expertise || false,
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
