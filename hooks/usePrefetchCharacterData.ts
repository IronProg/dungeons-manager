import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import { getAllAttacksKey } from '@/services/attacks/attack';
import { attacksService } from '@/services/attacks/attack.service';
import { getAllAttributesKey } from '@/services/attributes/attributes';
import { attributesService } from '@/services/attributes/attributes.service';
import { getBackgroundKey } from '@/services/backgrounds/background.api';
import { backgroundService } from '@/services/backgrounds/background.service';
import { getAllClassesKey } from '@/services/classes/class';
import { classService } from '@/services/classes/class.service';
import { getCharacterCurrencyKey } from '@/services/currencies/currencies';
import { currenciesService } from '@/services/currencies/currencies.service';
import { getAllEquipmentsKey } from '@/services/equipments/equipment.api';
import { equipmentService } from '@/services/equipments/equipment.service';
import { getAllFeaturesKey } from '@/services/features/feature';
import { featuresService } from '@/services/features/feature.service';
import { getCharacterGeneralInfoKey } from '@/services/generalInfos/generalInfos';
import { generalInfoService } from '@/services/generalInfos/generalInfos.service';
import { getNoteKey } from '@/services/notes/note.api';
import { noteService } from '@/services/notes/note.service';
import { getProficiencyKey } from '@/services/proficiencies/proficiency.api';
import { proficiencyService } from '@/services/proficiencies/proficiency.service';
import { getAllResourcesKey } from '@/services/resources/resource';
import { resourcesService } from '@/services/resources/resource.service';
import { getAllSavingThrowsKey } from '@/services/savingThrows/savingThrow';
import { savingThrowService } from '@/services/savingThrows/savingThrow.service';
import { getAllSkillsKey } from '@/services/skills/skill';
import { skillsService } from '@/services/skills/skill.service';
import { getAllCharacterSpellSlotsKey } from '@/services/spellSlots/spellSlot';
import { spellSlotService } from '@/services/spellSlots/spellSlot.service';
import type { Character } from '@/types/character';

type Props = {
  character?: Character;
  characterId?: number;
};

export const usePrefetchCharacterData = ({ character, characterId }: Props) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!character || !characterId) return;

    const id = characterId;

    Promise.allSettled([
      queryClient.prefetchQuery({
        queryKey: getAllAttributesKey({ characterId: id }),
        queryFn: () => attributesService.fetchAll({ characterId: id }),
      }),
      queryClient.prefetchQuery({
        queryKey: getCharacterCurrencyKey({ characterId: id }),
        queryFn: () => currenciesService.fetch({ characterId: id }),
      }),
      queryClient.prefetchQuery({
        queryKey: getAllSavingThrowsKey({ characterId: id }),
        queryFn: () => savingThrowService.fetchAll({ characterId: id }),
      }),
      queryClient.prefetchQuery({
        queryKey: getAllSkillsKey({ characterId: id }),
        queryFn: () => skillsService.fetchAll({ characterId: id }),
      }),
      queryClient.prefetchQuery({
        queryKey: getAllAttacksKey({ characterId: id }),
        queryFn: () => attacksService.fetchAll({ characterId: id }),
      }),
      queryClient.prefetchQuery({
        queryKey: getAllResourcesKey({ characterId: id }),
        queryFn: () => resourcesService.fetchAll({ characterId: id }),
      }),
      queryClient.prefetchQuery({
        queryKey: getAllFeaturesKey({ characterId: id }),
        queryFn: () => featuresService.fetchAll({ characterId: id }),
      }),
      queryClient.prefetchQuery({
        queryKey: getCharacterGeneralInfoKey({ characterId: id }),
        queryFn: () => generalInfoService.fetch({ characterId: id }),
      }),
      queryClient.prefetchQuery({
        queryKey: getAllEquipmentsKey({ characterId: id }),
        queryFn: () => equipmentService.fetchAll({ characterId: id }),
      }),
      queryClient.prefetchQuery({
        queryKey: getBackgroundKey({ characterId: id }),
        queryFn: () => backgroundService.fetch({ characterId: id }),
      }),
      queryClient.prefetchQuery({
        queryKey: getProficiencyKey({ characterId: id }),
        queryFn: () => proficiencyService.fetch({ characterId: id }),
      }),
      queryClient.prefetchQuery({
        queryKey: getAllClassesKey({ characterId: id }),
        queryFn: () => classService.fetchAll({ characterId: id }),
      }),
      queryClient.prefetchQuery({
        queryKey: getNoteKey({ characterId: id }),
        queryFn: () => noteService.fetch({ characterId: id }),
      }),
      queryClient.prefetchQuery({
        queryKey: getAllCharacterSpellSlotsKey({ characterId: id }),
        queryFn: () => spellSlotService.fetchAll(id),
      }),
    ]);
  }, [character, characterId, queryClient]);
};
