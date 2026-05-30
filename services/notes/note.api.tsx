import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { useCharacter } from '@/contexts/CharacterContext';
import type { ApiErrorResponse } from '@/core/error/handler';
import { handleErrorMessage } from '@/core/error/handler';
import { noteService } from '@/services/notes/note.service';
import type { Note } from '@/types/character';

export const getNoteKey = ({
  characterId,
}: {
  characterId: number;
}): ['characters', number, 'note'] => ['characters', characterId, 'note'];

export const useGetNote = () => {
  const { character, characterId } = useCharacter();

  return useQuery<Note, Error, Note, ['characters', number, 'note']>({
    queryKey: getNoteKey({ characterId: characterId! }),
    queryFn: () => noteService.fetch({ characterId: characterId! }),
    enabled: !!character,
  });
};

export const useUpdateNoteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<Note, AxiosError<ApiErrorResponse>, UpdateNoteParams>({
    mutationFn: (params: UpdateNoteParams) => noteService.update(params),
    onSuccess: (_, { characterId }) => {
      queryClient.invalidateQueries({
        queryKey: getNoteKey({ characterId }),
      });
    },
    onError: ({ response }) => {
      handleErrorMessage(response?.data);
    },
  });
};
