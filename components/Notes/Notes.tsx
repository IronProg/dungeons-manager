import { useEffect, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { useDebounce } from 'use-debounce';
import i18n from 'i18n';

import { useCharacter } from 'contexts/CharacterContext';
import { useGetNote, useUpdateNoteMutation } from 'services/notes/note.api';

import { Skeleton } from 'components/ui/Skeleton';

export const Notes = () => {
  const { characterId } = useCharacter();

  const { mutate: updateNote } = useUpdateNoteMutation();

  const { data: note, isPending } = useGetNote({ characterId: characterId! });

  const [text, setText] = useState('');

  const [debouncedText] = useDebounce(text, 5_000);

  useEffect(() => {
    setText(note?.text ?? '');
  }, [note]);

  useEffect(() => {
    if (characterId && debouncedText.length > 0) {
      updateNote({ characterId: characterId!, text: debouncedText });
    }
  }, [characterId, debouncedText, updateNote]);

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
          onChangeText={setText}
          multiline
        />
      )}
    </View>
  );
};
