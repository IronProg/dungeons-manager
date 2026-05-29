import api from '@/core/api/api';
import type { SpellSlot } from '@/types/character';

export const spellSlotService = {
  fetchAll: (characterId: number, level?: number) =>
    api
      .get<SpellSlot[]>(`/characters/${characterId}/spell_slots`, {
        params: { level },
      })
      .then((res) => res.data),

  update: (characterId: number, params: Partial<SpellSlot>) =>
    api
      .put<SpellSlot>(
        `/characters/${characterId}/spell_slots/${params.id}`,
        params,
      )
      .then((res) => res.data),
  resetAll: (characterId: number) =>
    api
      .put<SpellSlot>(`/characters/${characterId}/spell_slots/reset_all`)
      .then((res) => res.data),
};
