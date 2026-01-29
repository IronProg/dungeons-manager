import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { AttributesForm } from './AttributesForm';
import { Attribute } from 'types/character';
import { ReusableBottomSheetModal } from 'components/ui/ReusableBottomSheet';
import { useBottomSheetRef } from 'hooks/useBottomSheetRef';
import i18n from 'i18n';
import { useGetAllAttributes } from 'services/attributes/attributes';
import { useCharacter } from 'contexts/CharacterContext';

export const MainCharacterSheetAttributes = () => {
  const { characterId } = useCharacter();
  const { ref: bottomSheetRef, open, close } = useBottomSheetRef();

  const { data: characterAttributes } = useGetAllAttributes({
    characterId: characterId!,
  });

  if (characterAttributes?.length !== 6) {
    return <ActivityIndicator />;
  }

  return (
    <>
      <View className="flex bg-gray-100 rounded-lg">
        <View className="flex flex-row flex-wrap justify-between flex-wrap p-2 gap-y-2">
          <AttributeCard
            openModal={open}
            attribute={
              characterAttributes.find(
                (attribute) => attribute.name === 'strength',
              )!
            }
          />
          <AttributeCard
            openModal={open}
            attribute={
              characterAttributes.find(
                (attribute) => attribute.name === 'dexterity',
              )!
            }
          />
          <AttributeCard
            openModal={open}
            attribute={
              characterAttributes.find(
                (attribute) => attribute.name === 'constitution',
              )!
            }
          />
          <AttributeCard
            openModal={open}
            attribute={
              characterAttributes.find(
                (attribute) => attribute.name === 'intelligence',
              )!
            }
          />
          <AttributeCard
            openModal={open}
            attribute={
              characterAttributes.find(
                (attribute) => attribute.name === 'wisdom',
              )!
            }
          />
          <AttributeCard
            openModal={open}
            attribute={
              characterAttributes.find(
                (attribute) => attribute.name === 'charisma',
              )!
            }
          />
        </View>
      </View>

      <ReusableBottomSheetModal
        onDismiss={close}
        ref={bottomSheetRef}
        snapPoints={[600, 875]}
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
};

const AttributeCard = ({ attribute, openModal }: AttributeCardProps) => {
  return (
    <View className="w-[33%] px-4 flex justify-center">
      <TouchableOpacity
        onLongPress={openModal}
        className="relative border-gray-900 rounded-lg flex-col flex items-stretch"
      >
        <Text className="text-gray-900 text-sm font-semibold text-center">
          {i18n.t(`attributes.${attribute.name}`)}
        </Text>
        <Text className="text-2xl font-bold text-center">
          {/* {modifiers[attribute.name] > 0 && '+'}
          {modifiers[attribute.name]} */}
          0
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
