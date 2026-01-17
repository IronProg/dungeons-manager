import { zodResolver } from '@hookform/resolvers/zod';
import { ATTRIBUTES } from 'core/enums/attributes';
import { PROFICIENCIES } from 'core/enums/proficiencies';
import { useForm } from 'react-hook-form';
import { Skill } from 'types/character';
import * as z from 'zod';

export const schema = z.object({
  name: z.enum(PROFICIENCIES.map((prof) => prof.name)),
  attribute: z.enum(ATTRIBUTES),
  proficiency: z.boolean(),
  expertise: z.boolean(),
  customBonus: z.coerce.number<number>().int().optional(),
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
        attribute: skill.attribute,
        proficiency: skill.proficiency || false,
        expertise: skill.expertise || false,
        customBonus: skill.customBonus,
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
