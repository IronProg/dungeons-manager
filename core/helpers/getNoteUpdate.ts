type GetNoteUpdateParams = {
  characterId?: number;
  canEdit: boolean;
  initialText: string;
  text: string;
};

export const getNoteUpdate = ({
  characterId,
  canEdit,
  initialText,
  text,
}: GetNoteUpdateParams) => {
  if (!characterId || !canEdit || text === initialText) return;

  return { characterId, text };
};
