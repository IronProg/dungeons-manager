const { getNoteUpdate } =
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require('./getNoteUpdate') as {
    getNoteUpdate: (params: {
      characterId?: number;
      canEdit: boolean;
      initialText: string;
      text: string;
    }) => { characterId: number; text: string } | undefined;
  };

const update = getNoteUpdate({
  characterId: 1,
  canEdit: true,
  initialText: 'Original note',
  text: 'Updated note',
});

if (update?.characterId !== 1 || update.text !== 'Updated note') {
  throw new Error(
    `Expected the draft to save for character 1, received ${JSON.stringify(update)}`,
  );
}

const unchangedUpdate = getNoteUpdate({
  characterId: 2,
  canEdit: true,
  initialText: 'Unchanged note',
  text: 'Unchanged note',
});

if (unchangedUpdate !== undefined) {
  throw new Error(
    `Expected no update for an unchanged note, received ${JSON.stringify(unchangedUpdate)}`,
  );
}
