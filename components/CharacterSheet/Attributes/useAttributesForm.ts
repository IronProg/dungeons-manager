import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Character } from 'types/character';
import * as yup from 'yup';

export type AttributesFormType = {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
};

const schema = yup.object({
  strength: yup.number().required('Is required').integer('Must be an integer'),
  dexterity: yup.number().required('Is required').integer('Must be an integer'),
  constitution: yup
    .number()
    .required('Is required')
    .integer('Must be an integer'),
  intelligence: yup
    .number()
    .required('Is required')
    .integer('Must be an integer'),
  wisdom: yup.number().required('Is required').integer('Must be an integer'),
  charisma: yup.number().required('Is required').integer('Must be an integer'),
});

type useAttributesFormProps = {
  character: Character;
};

export const useAttributesForm = ({ character }: useAttributesFormProps) => {
  const { control, handleSubmit, watch, getValues, formState } =
    useForm<AttributesFormType>({
      resolver: yupResolver(schema),
      defaultValues: {
        strength: character.strength || 10,
        dexterity: character.dexterity || 10,
        constitution: character.constitution || 10,
        intelligence: character.intelligence || 10,
        wisdom: character.wisdom || 10,
        charisma: character.charisma || 10,
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
