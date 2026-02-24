import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Note } from 'types/character';
import { noteService } from './note.service';
import { useCharacter } from 'contexts/CharacterContext';

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
    staleTime: 10 * 60_000,
    enabled: !!character,
  });
};

export const useUpdateNoteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<Note, Error, UpdateNoteParams>({
    mutationFn: (params: UpdateNoteParams) => noteService.update(params),
    onSuccess: (_, { characterId }) => {
      queryClient.invalidateQueries({
        queryKey: getNoteKey({ characterId }),
      });
    },
  });
};
