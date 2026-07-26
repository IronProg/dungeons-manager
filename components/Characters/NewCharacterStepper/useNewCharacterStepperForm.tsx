import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import i18n from '@/i18n';

const schema = z.object({
  tableId: z.number().nullable(),
  name: z
    .string({ error: i18n.t('validation.required') })
    .min(2, i18n.t('validation.stringMin', { min: 2 })),
  characterId: z.number().nullable(),
});

export type NewCharacterStepperFormType = z.infer<typeof schema>;

export const useNewCharacterStepperForm = () => {
  return useForm<NewCharacterStepperFormType>({
    resolver: zodResolver(schema),
    defaultValues: { tableId: null, name: '', characterId: null },
    mode: 'onChange',
  });
};
