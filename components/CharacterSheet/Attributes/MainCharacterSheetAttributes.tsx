import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import i18n from 'i18n';

import { useBottomSheetRef } from 'hooks/useBottomSheetRef';
import { useGetAllAttributes } from 'services/attributes/attributes';
import { useCharacter } from 'contexts/CharacterContext';

import { ReusableBottomSheetModal } from 'components/ui/ReusableBottomSheet';
import { AttributesForm } from './AttributesForm';

import { Attribute } from 'types/character';

export const MainCharacterSheetAttributes = () => {
  const { ref: bottomSheetRef, open, close } = useBottomSheetRef();
  const { canEdit } = useCharacter();

  const { data: characterAttributes } = useGetAllAttributes();

  if (characterAttributes?.length !== 6) {
    return <ActivityIndicator />;
  }

  return (
    <>
      <View className="flex rounded-lg">
        <View className="flex flex-row flex-wrap justify-between p-2 gap-y-2">
          <AttributeCard
            openModal={open}
            attribute={
              characterAttributes.find(
                (attribute) => attribute.name === 'strength',
              )!
            }
            canEdit={canEdit}
          />
          <AttributeCard
            openModal={open}
            attribute={
              characterAttributes.find(
                (attribute) => attribute.name === 'dexterity',
              )!
            }
            canEdit={canEdit}
          />
          <AttributeCard
            openModal={open}
            attribute={
              characterAttributes.find(
                (attribute) => attribute.name === 'constitution',
              )!
            }
            canEdit={canEdit}
          />
          <AttributeCard
            openModal={open}
            attribute={
              characterAttributes.find(
                (attribute) => attribute.name === 'intelligence',
              )!
            }
            canEdit={canEdit}
          />
          <AttributeCard
            openModal={open}
            attribute={
              characterAttributes.find(
                (attribute) => attribute.name === 'wisdom',
              )!
            }
            canEdit={canEdit}
          />
          <AttributeCard
            openModal={open}
            attribute={
              characterAttributes.find(
                (attribute) => attribute.name === 'charisma',
              )!
            }
            canEdit={canEdit}
          />
        </View>
      </View>

      <ReusableBottomSheetModal
        onDismiss={close}
        ref={bottomSheetRef}
        snapPoints={[550, 875]}
      >
        <AttributesForm
          characterAttributes={characterAttributes}
          onClose={close}
        />
      </ReusableBottomSheetModal>
    </>
  );
};

type AttributeCardProps = {
  attribute: Attribute;
  openModal: () => void;
  canEdit: boolean;
};

const AttributeCard = ({
  attribute,
  openModal,
  canEdit,
}: AttributeCardProps) => {
  return (
    <View className="w-[33%] px-4 flex justify-center">
      <TouchableOpacity
        onLongPress={canEdit ? openModal : undefined}
        className="relative border-gray-900 rounded-lg flex-col flex items-stretch"
      >
        <Text className="text-gray-900 text-sm font-semibold text-center">
          {i18n.t(`attributes.${attribute.name}`)}
        </Text>
        <Text className="text-2xl font-bold text-center">
          {attribute.modifier}
        </Text>
        <View className="absolute rounded-full bg-gray-200 p-1 bottom-0 min-w-7">
          <Text className="text-gray-900 text-sm font-semibold text-center">
            {attribute?.tempValue || attribute.value}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
