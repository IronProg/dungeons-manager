import * as SQLite from 'expo-sqlite';

import type { Spell } from '@/types/character';

let db: SQLite.SQLiteDatabase | null = null;

try {
  db = SQLite.openDatabaseSync('spells_external.db');
} catch (error) {
  console.error('Failed to open external spells DB', error);
}

export const initExternalSpellsDb = () => {
  if (!db) return;

  try {
    const tableInfo = db.getAllSync<{ name: string }>(
      `PRAGMA table_info(external_spells)`,
    );
    if (
      tableInfo.length > 0 &&
      !tableInfo.some((col) => col.name === 'school')
    ) {
      db.execSync(`DROP TABLE IF EXISTS external_spells;`);
    }
  } catch {
    // Ignore error if PRAGMA fails
  }

  db.execSync(`
    CREATE TABLE IF NOT EXISTS external_spells (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      level INTEGER NOT NULL,
      school TEXT,
      castingTime TEXT,
      components TEXT,
      concentration INTEGER,
      description TEXT,
      duration TEXT,
      higherLevelDescription TEXT,
      innateTotal INTEGER,
      material INTEGER,
      materialDescription TEXT,
      prepared INTEGER,
      range TEXT,
      somatic INTEGER,
      target TEXT,
      verbal INTEGER,
      attack TEXT,
      damages TEXT,
      higherLevelsDamages TEXT,
      data TEXT NOT NULL
    );
  `);
};

export const getExternalSpellsCount = (): number => {
  if (!db) return 0;

  const result = db.getFirstSync<{ count: number }>(
    `SELECT COUNT(*) as count FROM external_spells`,
  );

  return result?.count || 0;
};

export const insertExternalSpells = (spells: Spell[]) => {
  if (!db) return;

  try {
    db.execSync('BEGIN TRANSACTION;');

    db.runSync(`DELETE FROM external_spells`);

    const statement = db.prepareSync(
      `INSERT INTO 
        external_spells
          (name, level, school, castingTime, components, concentration,
           description, duration, higherLevelDescription, innateTotal,
           material, materialDescription, prepared, range, somatic, target,
           verbal, attack, damages, higherLevelsDamages, data)
       VALUES
        ($name, $level, $school, $castingTime, $components, $concentration,
         $description, $duration, $higherLevelDescription, $innateTotal,
         $material, $materialDescription, $prepared, $range, $somatic, $target,
         $verbal, $attack, $damages, $higherLevelsDamages, $data)`,
    );

    for (const spell of spells) {
      const attackStr = spell.attack ? JSON.stringify(spell.attack) : null;
      const damagesStr = spell.damages ? JSON.stringify(spell.damages) : '[]';
      const higherLevelsDamagesStr = spell.higherLevelsDamages
        ? JSON.stringify(spell.higherLevelsDamages)
        : '[]';

      statement.executeSync({
        $name: spell.name,
        $level: spell.level,
        $school: spell.school || '',
        $castingTime: spell.castingTime || '',
        $components: spell.components || '',
        $concentration: spell.concentration ? 1 : 0,
        $description: spell.description || '',
        $duration: spell.duration || '',
        $higherLevelDescription: spell.higherLevelDescription || null,
        $innateTotal: spell.innateTotal || 0,
        $material: spell.material ? 1 : 0,
        $materialDescription: spell.materialDescription || null,
        $prepared: spell.prepared ? 1 : 0,
        $range: spell.range || '',
        $somatic: spell.somatic ? 1 : 0,
        $target: spell.target || '',
        $verbal: spell.verbal ? 1 : 0,
        $attack: attackStr,
        $damages: damagesStr,
        $higherLevelsDamages: higherLevelsDamagesStr,
        $data: JSON.stringify(spell),
      });
    }

    statement.finalizeSync();

    db.execSync('COMMIT;');
  } catch (e) {
    db.execSync('ROLLBACK;');
    throw e;
  }
};

export const searchExternalSpells = (query: string): Spell[] => {
  if (!db) return [];

  const q = `%${query}%`;

  const results: { id: number; data: string }[] = query
    ? db.getAllSync<{ id: number; data: string }>(
        `SELECT id, data FROM external_spells WHERE name LIKE ? ORDER BY level ASC, name ASC`,
        [q],
      )
    : db.getAllSync<{ id: number; data: string }>(
        `SELECT id, data FROM external_spells ORDER BY level ASC, name ASC`,
      );

  return results.map((row) => ({
    ...(JSON.parse(row.data) as Spell),
    id: row.id,
  }));
};

export const getExternalSpellById = (id: number): Spell | null => {
  if (!db) return null;
  const result = db.getFirstSync<{ data: string }>(
    `SELECT data FROM external_spells WHERE id = ?`,
    [id],
  );
  if (!result) return null;
  return { ...JSON.parse(result.data), id };
};
