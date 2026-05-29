import { Skull } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { useDebounce } from 'use-debounce';

import { useCharacter } from '@/contexts/CharacterContext';
import i18n from '@/i18n';
import { useUpdateGeneralInfoMutation } from '@/services/generalInfos/generalInfos';
import type { CharacterGeneralInfo } from '@/types/character';

type ExhaustionProps = { generalInfo: CharacterGeneralInfo; canEdit: boolean };

export const Exhaustion = ({ generalInfo, canEdit }: ExhaustionProps) => {
  const [tempExhaustion, setTempExhaustion] = useState<number>(
    generalInfo.exhaustion,
  );
  const [debouncedExhaustion] = useDebounce(tempExhaustion, 500);

  const { characterId } = useCharacter();

  const { mutate: updateCharacter, isPending } = useUpdateGeneralInfoMutation();

  useEffect(() => {
    if (debouncedExhaustion != generalInfo.exhaustion) {
      updateCharacter({
        characterId: characterId!,
        exhaustion: debouncedExhaustion,
      });
    }
  }, [
    characterId,
    debouncedExhaustion,
    generalInfo.exhaustion,
    updateCharacter,
  ]);

  const handleChangeExhaustion = () => {
    let newExhaustion = 0;
    if (tempExhaustion < 6) {
      newExhaustion = tempExhaustion + 1;
    }

    setTempExhaustion(newExhaustion);
  };

  return (
    <TouchableOpacity
      onPress={handleChangeExhaustion}
      disabled={isPending || !canEdit}
      className="relative flex flex-col items-center justify-center w-[90px]"
    >
      <Skull size={90} color="#cbd5e1" fill="#e2e8f0" />

      <View className="absolute flex flex-col items-center justify-start h-full w-full pt-2">
        <Text className="text-gray-900 text-sm font-semibold text-center">
          {i18n.t('titles.exhaustion')}
        </Text>
        {isPending ? (
          <ActivityIndicator />
        ) : (
          <Text className="text-3xl font-bold text-center">
            {tempExhaustion}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};
