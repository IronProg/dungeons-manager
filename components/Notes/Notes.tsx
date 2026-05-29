import { useEffect, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { useDebounce } from 'use-debounce';

import { Skeleton } from '@/components/ui/Skeleton';
import { useCharacter } from '@/contexts/CharacterContext';
import i18n from '@/i18n';
import { useGetNote, useUpdateNoteMutation } from '@/services/notes/note.api';

export const Notes = () => {
  const { characterId, canEdit } = useCharacter();

  const { mutate: updateNote } = useUpdateNoteMutation();

  const { data: note, isPending } = useGetNote();

  const [text, setText] = useState('');

  const [debouncedText] = useDebounce(text, 5_000);

  useEffect(() => {
    setText(note?.text ?? '');
  }, [note]);

  useEffect(() => {
    if (characterId && debouncedText.length > 0 && canEdit) {
      updateNote({ characterId: characterId, text: debouncedText });
    }
  }, [characterId, debouncedText, updateNote, canEdit]);

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
          onChangeText={canEdit ? setText : undefined}
          multiline
          editable={canEdit}
        />
      )}
    </View>
  );
};
