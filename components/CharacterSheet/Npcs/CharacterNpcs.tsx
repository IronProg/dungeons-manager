import { useRouter } from 'expo-router';
import { Skull } from 'lucide-react-native';
import { useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

import { BaseModal } from '@/components/ui/Modals/BaseModal';
import { ConfirmationModal } from '@/components/ui/Modals/ConfirmationModal';
import { useCharacter } from '@/contexts/CharacterContext';
import i18n from '@/i18n';
import {
  useDestroyNpcMutation,
  useGetNpcs,
  useImportNpcMutation,
} from '@/services/npcs/npc.api';
import type { NpcSummary } from '@/types/npc';

export const CharacterNpcs = () => {
  const { characterId, canEdit } = useCharacter();
  if (!canEdit || !characterId) return null;

  return <EditableCharacterNpcs characterId={characterId} />;
};

const EditableCharacterNpcs = ({ characterId }: { characterId: number }) => {
  const router = useRouter();
  const {
    data: npcs = [],
    isError,
    isLoading,
    refetch,
  } = useGetNpcs({
    characterId,
  });
  const { mutate: importNpc, isPending: isCopyPending } =
    useImportNpcMutation();
  const { mutate: destroyNpc, isPending: isDestroyPending } =
    useDestroyNpcMutation();
  const [selectedNpc, setSelectedNpc] = useState<NpcSummary>();
  const [npcToDelete, setNpcToDelete] = useState<NpcSummary>();
  const isActionPending = isCopyPending || isDestroyPending;

  const openNpc = (npc: NpcSummary) =>
    router.push({
      pathname: '/(authenticated)/npc-sheet',
      params: { id: npc.id.toString() },
    });

  const copyNpc = () => {
    if (!selectedNpc) return;

    importNpc(
      { id: selectedNpc.id },
      { onSuccess: () => setSelectedNpc(undefined) },
    );
  };

  const deleteNpc = () => {
    if (!npcToDelete) return;

    destroyNpc(
      { id: npcToDelete.id, characterId },
      {
        onSuccess: () => {
          setNpcToDelete(undefined);
          setSelectedNpc(undefined);
        },
      },
    );
  };

  return (
    <>
      <View className="bg-white rounded-lg flex-col items-stretch mt-4 shadow-md shadow-blue-600 border border-slate-300 p-4">
        <Text className="text-gray-900 text-lg font-semibold text-center mb-3">
          {i18n.t('npcs.attached')}
        </Text>

        {isLoading ? (
          <View className="py-4 items-center">
            <ActivityIndicator color="#4f46e5" />
          </View>
        ) : isError ? (
          <View className="items-center py-4">
            <Text className="text-red-400 mb-3">
              {i18n.t('npcs.couldNotLoadNpcs')}
            </Text>
            <TouchableOpacity
              onPress={() => refetch()}
              className="bg-indigo-500 px-4 py-2 rounded-lg"
              activeOpacity={0.8}
            >
              <Text className="text-white font-medium">
                {i18n.t('general.tryAgain')}
              </Text>
            </TouchableOpacity>
          </View>
        ) : npcs.length === 0 ? (
          <Text className="text-gray-500 text-center py-4">
            {i18n.t('npcs.noNpcs')}
          </Text>
        ) : (
          <View className="gap-2">
            {npcs.map((npc) => (
              <TouchableOpacity
                key={npc.id}
                onPress={() => openNpc(npc)}
                onLongPress={() => setSelectedNpc(npc)}
                className="flex-row items-center rounded-lg border border-slate-200 p-3"
                activeOpacity={0.7}
              >
                <View className="w-10 h-10 rounded-full bg-indigo-100 items-center justify-center mr-3">
                  <Skull size={20} color="#4f46e5" />
                </View>
                <View className="flex-1">
                  <Text className="text-gray-900 font-semibold">
                    {npc.name}
                  </Text>
                  <Text className="text-gray-500 text-sm">
                    {i18n.t('titles.hp')}: {npc.hitPoints}
                  </Text>
                </View>
                <Text className="text-indigo-600 text-xs font-semibold">
                  {i18n.t('npcs.challengeRating', {
                    rating: npc.challengeRating,
                  })}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <BaseModal
        visible={!!selectedNpc}
        onClose={() => !isActionPending && setSelectedNpc(undefined)}
      >
        <Text className="text-xl text-center font-semibold text-gray-900">
          {selectedNpc?.name}
        </Text>

        <TouchableOpacity
          onPress={copyNpc}
          disabled={isActionPending}
          className="rounded-lg bg-indigo-500 py-3"
          activeOpacity={0.8}
        >
          {isCopyPending ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-center text-white font-semibold">
              {i18n.t('npcs.copyToMyNpcs')}
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => selectedNpc && setNpcToDelete(selectedNpc)}
          disabled={isActionPending}
          className="rounded-lg bg-red-500 py-3"
          activeOpacity={0.8}
        >
          <Text className="text-center text-white font-semibold">
            {i18n.t('general.delete')}
          </Text>
        </TouchableOpacity>
      </BaseModal>

      <ConfirmationModal
        isVisible={!!npcToDelete}
        onClose={() => !isDestroyPending && setNpcToDelete(undefined)}
        onConfirm={deleteNpc}
        subTitle={i18n.t('npcs.deleteConfirmation')}
        isPending={isDestroyPending}
      />
    </>
  );
};
