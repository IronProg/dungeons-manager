import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import i18n from '@/i18n';

const profileSchema = z.object({
  nickname: z
    .string()
    .min(1, i18n.t('validation.required'))
    .max(50, i18n.t('validation.stringMax', { max: 50 })),
});

export type ProfileFormData = z.infer<typeof profileSchema>;

export const useProfileForm = (initialNickname: string) => {
  return useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: { nickname: initialNickname },
  });
};
