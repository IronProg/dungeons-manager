import { useNavigation } from 'expo-router';
import { useEffect, useRef, useState } from 'react';

import { getNoteUpdate } from '@/core/helpers/getNoteUpdate';

type UseDebouncedNotePairingParams = {
  characterId?: number;
  canEdit: boolean;
  noteText?: string;
  updateNote: (params: { characterId: number; text: string }) => void;
};

export const useDebouncedNotePairing = ({
  characterId,
  canEdit,
  noteText,
  updateNote,
}: UseDebouncedNotePairingParams) => {
  const navigation = useNavigation();
  const [text, setText] = useState('');
  const textRef = useRef(text);
  const initialTextRef = useRef(text);
  const canEditRef = useRef(canEdit);
  const characterIdRef = useRef(characterId);

  useEffect(() => {
    const nextText = noteText ?? '';

    setText(nextText);
    textRef.current = nextText;
    initialTextRef.current = nextText;
  }, [noteText]);

  useEffect(() => {
    canEditRef.current = canEdit;
  }, [canEdit]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      const update = getNoteUpdate({
        characterId: characterIdRef.current,
        canEdit: canEditRef.current,
        initialText: initialTextRef.current,
        text: textRef.current,
      });

      if (update) {
        initialTextRef.current = update.text;
        updateNote(update);
      }
    });

    return unsubscribe;
  }, [navigation, updateNote]);

  useEffect(() => {
    characterIdRef.current = characterId;

    return () => {
      const update = getNoteUpdate({
        characterId,
        canEdit: canEditRef.current,
        initialText: initialTextRef.current,
        text: textRef.current,
      });

      if (update) {
        initialTextRef.current = update.text;
        updateNote(update);
      }
    };
  }, [characterId, updateNote]);

  const updateText = (value: string) => {
    textRef.current = value;
    setText(value);
  };

  return { text, updateText };
};
