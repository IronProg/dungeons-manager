/* eslint-disable @typescript-eslint/no-require-imports -- this isolated test runs after CommonJS compilation. */
const {
  getChangedNpcScalars,
  getNpcGeneralDefaultValues,
} = require('./npcFormValues');

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

const changedSkills = getChangedNpcScalars(
  { skills: null },
  { skills: 'Perception +5' },
);

if (changedSkills.skills !== 'Perception +5') {
  throw new Error('Expected changed NPC skills to be included in the patch');
}

if (changedValues.name !== 'Mage' || changedValues.armorClass !== 12) {
  throw new Error('Expected a patch to contain only changed scalar fields');
}

if ('challengeRating' in changedValues) {
  throw new Error('Expected an unchanged scalar to be omitted from the patch');
}

const nullableTemporaryHitPointDefaults = getNpcGeneralDefaultValues({
  name: 'Ogre',
  hitPoints: 59,
  hitPointsLimit: 59,
  hitPointsLimitTemporary: null,
  temporaryHitPoints: null,
  armorClass: 11,
  speeds: null,
  skills: 'Perception +5',
  senses: null,
  languages: null,
  challengeRating: '1',
  challengeRatingInfo: null,
});

if (nullableTemporaryHitPointDefaults.skills !== 'Perception +5') {
  throw new Error('Expected NPC skills to populate the general form');
}

if (
  nullableTemporaryHitPointDefaults.hitPointsLimitTemporary !== null ||
  nullableTemporaryHitPointDefaults.temporaryHitPoints !== null
) {
  throw new Error(
    'Expected nullable temporary hit point defaults to remain null',
  );
}

const unchangedNullableTemporaryHitPoints = getChangedNpcScalars(
  nullableTemporaryHitPointDefaults,
  nullableTemporaryHitPointDefaults,
);

if (Object.keys(unchangedNullableTemporaryHitPoints).length !== 0) {
  throw new Error(
    'Expected unchanged nullable temporary hit points to be omitted',
  );
}

const explicitZeroTemporaryHitPoints = getChangedNpcScalars(
  nullableTemporaryHitPointDefaults,
  {
    ...nullableTemporaryHitPointDefaults,
    hitPointsLimitTemporary: 0,
    temporaryHitPoints: 0,
  },
);

if (
  explicitZeroTemporaryHitPoints.hitPointsLimitTemporary !== 0 ||
  explicitZeroTemporaryHitPoints.temporaryHitPoints !== 0
) {
  throw new Error(
    'Expected explicitly entered zero temporary hit points to be patched',
  );
}
