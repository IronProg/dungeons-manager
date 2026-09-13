// eslint-disable-next-line @typescript-eslint/no-require-imports -- this isolated test runs after CommonJS compilation.
const { getChangedNpcScalars } = require('./npcFormValues');

const unchangedValues = getChangedNpcScalars(
  { name: 'Ogre', armorClass: 11, challengeRating: '1' },
  { name: 'Ogre', armorClass: 11, challengeRating: '1' },
);

if (Object.keys(unchangedValues).length !== 0) {
  throw new Error('Expected an unchanged form to produce an empty patch');
}

const changedValues = getChangedNpcScalars(
  { name: 'Ogre', armorClass: 11, challengeRating: '1' },
  { name: 'Mage', armorClass: 12, challengeRating: '1' },
);

if (changedValues.name !== 'Mage' || changedValues.armorClass !== 12) {
  throw new Error('Expected a patch to contain only changed scalar fields');
}

if ('challengeRating' in changedValues) {
  throw new Error('Expected an unchanged scalar to be omitted from the patch');
}
