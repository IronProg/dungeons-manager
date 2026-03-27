import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import i18n from 'i18n';

import {
  useCreateSpellMutation,
  useDeleteSpellMutation,
  useUpdateSpellMutation,
} from 'services/spells/spell.api';
import { useCharacter } from 'contexts/CharacterContext';
import { SpellFormValues, useSpellForm } from './useSpellForm';

import { ConfirmationModal } from 'components/ui/Modals/ConfirmationModal';
import { SpellFormInputs } from './SpellFormInputs';
import { SpellAttackForm } from './SpellAttackForm';

import { Spell, SpellSlotLevelType } from 'types/character';

type SpellFormProps = {
  initialData?: Spell;
  defaultLevel: SpellSlotLevelType;
  onSuccess: () => void;
};

export const SpellForm = ({
  initialData,
  defaultLevel,
  onSuccess,
}: SpellFormProps) => {
  const { back } = useRouter();
  const { characterId } = useCharacter();
  const isEditing = !!initialData?.id;

  const [deleting, setDeleting] = useState(false);
  const [editingAttack, setEditingAttack] = useState(false);

  const { mutate: createSpell, isPending: isCreating } =
    useCreateSpellMutation(defaultLevel);
  const { mutate: updateSpell, isPending: isUpdating } =
    useUpdateSpellMutation();
  const { mutate: deleteSpell } = useDeleteSpellMutation(defaultLevel);

  const { control, handleSubmit, watch } = useSpellForm({ spell: initialData });

  const onSubmit = (data: SpellFormValues) => {
    if (isEditing && initialData?.id) {
      updateSpell(
        { characterId: characterId!, id: initialData.id, ...data },
        { onSuccess },
      );
    } else {
      createSpell({ characterId: characterId!, ...data }, { onSuccess });
    }
  };

  const handleDelete = useCallback(() => {
    deleteSpell(initialData!.id!, {
      onSuccess: () => {
        back();
      },
    });
    setDeleting(false);
  }, [back, deleteSpell, initialData]);

  const insets = useSafeAreaInsets();
  const isSubmitting = isCreating || isUpdating;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={insets.top + StatusBar.currentHeight!}
      style={{ flex: 1, backgroundColor: 'white' }}
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingTop: 0, padding: 16 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="gap-4">
          {editingAttack ? (
            <SpellAttackForm control={control} watch={watch} />
          ) : (
            <SpellFormInputs
              spell={initialData}
              control={control}
              watch={watch}
              isEditing={isEditing}
              setDeleting={setDeleting}
            />
          )}

          <TouchableOpacity
            onPress={() => setEditingAttack((prev) => !prev)}
            disabled={isSubmitting}
            className={`bg-purple-600 p-4 rounded-xl mt-4 items-center ${isSubmitting ? 'opacity-50' : ''}`}
          >
            <Text className="text-white font-bold text-lg">
              {editingAttack ? 'Back' : 'Setup attack / damage'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            className={`bg-indigo-600 p-4 rounded-xl mt-4 items-center ${isSubmitting ? 'opacity-50' : ''}`}
          >
            <Text className="text-white font-bold text-lg">
              {isSubmitting
                ? i18n.t('general.current') + '...'
                : i18n.t('general.save')}
            </Text>
          </TouchableOpacity>
        </View>

        <ConfirmationModal
          isVisible={deleting}
          onClose={() => setDeleting(false)}
          onConfirm={handleDelete}
          buttonClassName="bg-red-500"
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
