import { zodResolver } from '@hookform/resolvers/zod';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { Text, TextInput, View } from 'react-native';
import { z } from 'zod';

import { AppKeyboardAvoidingView } from '@/components/ui/AppKeyboardAvoidingView';
import { Button } from '@/components/ui/Button';
import i18n from '@/i18n';
import { useCreateNpcMutation } from '@/services/npcs/npc.api';

const npcNameSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, i18n.t('validation.stringMin', { min: 2 }))
    .max(100, i18n.t('validation.stringMax', { max: 100 })),
});

type NpcNameFormValues = z.infer<typeof npcNameSchema>;

export const NpcNameForm = () => {
  const router = useRouter();
  const { characterId: characterIdValue } = useLocalSearchParams<{
    characterId?: string | string[];
  }>();
  const { control, handleSubmit } = useForm<NpcNameFormValues>({
    resolver: zodResolver(npcNameSchema),
    defaultValues: { name: '' },
  });
  const { mutate: create, isPending } = useCreateNpcMutation();

  const characterIdText = Array.isArray(characterIdValue)
    ? characterIdValue[0]
    : characterIdValue;
  const parsedCharacterId = Number.parseInt(characterIdText ?? '', 10);
  const characterId =
    Number.isFinite(parsedCharacterId) && parsedCharacterId > 0
      ? parsedCharacterId
      : undefined;

  const onSubmit = handleSubmit(({ name }) => {
    create(
      { name, characterId },
      {
        onSuccess: (npc) => {
          router.replace({
            pathname: '/(authenticated)/npc-sheet',
            params: { id: npc.id.toString() },
          });
        },
      },
    );
  });

  return (
    <AppKeyboardAvoidingView>
      <View className="bg-white rounded-2xl p-6 shadow-sm">
        <Text className="text-lg font-semibold text-gray-800 mb-4">
          {i18n.t('npcs.createNamePrompt')}
        </Text>

        <Controller
          control={control}
          name="name"
          render={({ field, fieldState: { error } }) => (
            <View>
              <TextInput
                value={field.value}
                onChangeText={field.onChange}
                onBlur={field.onBlur}
                placeholder={i18n.t('general.name')}
                className="bg-white border border-gray-200 rounded-xl py-3 px-4 text-gray-800 font-medium h-12"
                autoFocus
                autoCapitalize="words"
                autoCorrect={false}
                maxLength={100}
                accessibilityLabel={i18n.t('general.name')}
              />

              {error?.message && (
                <Text className="text-red-400 text-sm mt-2 mb-4">
                  {error.message}
                </Text>
              )}
            </View>
          )}
        />

        <View className="mt-2">
          <Button
            text={i18n.t('general.save')}
            onPress={onSubmit}
            disabled={isPending}
            loading={isPending}
          />
        </View>
      </View>
    </AppKeyboardAvoidingView>
  );
};
