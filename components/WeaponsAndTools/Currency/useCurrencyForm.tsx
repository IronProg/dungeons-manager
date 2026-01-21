import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Currencies } from 'types/character';
import * as z from 'zod';

const schema = z.object({
  copperPoints: z.coerce.number<number>().optional(),
  silverPoints: z.coerce.number<number>().optional(),
  electrumPoints: z.coerce.number<number>().optional(),
  goldPoints: z.coerce.number<number>().optional(),
  platinumPoints: z.coerce.number<number>().optional(),
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
