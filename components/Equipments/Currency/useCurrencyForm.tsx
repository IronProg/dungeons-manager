import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import i18n from '@/i18n';
import type { Currencies } from '@/types/character';

const schema = z.object({
  copperPoints: z.coerce
    .number<number>(i18n.t('validation.mustBeNumber'))
    .optional(),
  silverPoints: z.coerce
    .number<number>(i18n.t('validation.mustBeNumber'))
    .optional(),
  electrumPoints: z.coerce
    .number<number>(i18n.t('validation.mustBeNumber'))
    .optional(),
  goldPoints: z.coerce
    .number<number>(i18n.t('validation.mustBeNumber'))
    .optional(),
  platinumPoints: z.coerce
    .number<number>(i18n.t('validation.mustBeNumber'))
    .optional(),
});

export type CurrencyFormType = z.infer<typeof schema>;

type useCurrencyFormProps = {
  currencies: Currencies;
};

export const useCurrencyForm = ({ currencies }: useCurrencyFormProps) => {
  const { control, handleSubmit, watch, getValues, formState } =
    useForm<CurrencyFormType>({
      resolver: zodResolver(schema),
      defaultValues: currencies,
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
