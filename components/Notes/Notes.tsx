import { Text, TextInput, View } from 'react-native';

import { Skeleton } from '@/components/ui/Skeleton';
import { useCharacter } from '@/contexts/CharacterContext';
import { useDebouncedNotePairing } from '@/hooks/notes/useDebouncedNotePairing';
import i18n from '@/i18n';
import { useGetNote, useUpdateNoteMutation } from '@/services/notes/note.api';

export const Notes = () => {
  const { characterId, canEdit } = useCharacter();
  const { mutate: updateNote } = useUpdateNoteMutation();
  const { data: note, isPending } = useGetNote();
  const { text, updateText } = useDebouncedNotePairing({
    characterId,
    canEdit,
    noteText: note?.text,
    updateNote,
  });

  return (
    <View>
      <Text className="text-xl font-medium text-center mb-3">
        {i18n.t('notes.title')}
      </Text>

      {isPending ? (
        <Skeleton className="h-40" />
      ) : (
        <TextInput
          className="bg-white min-h-40 rounded-lg px-2"
          textAlignVertical="top"
          value={text}
          onChangeText={canEdit ? updateText : undefined}
          multiline
          editable={canEdit}
        />
      )}
    </View>
  );
};
