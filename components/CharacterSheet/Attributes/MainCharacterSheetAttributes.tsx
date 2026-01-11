import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import { AttributesForm } from './AttributesForm';
import { Attribute, Character } from 'types/character';

type MainCharacterSheetAttributes = {
  character: Character;
};

export const MainCharacterSheetAttributes = ({
  character,
}: MainCharacterSheetAttributes) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <View className="flex bg-gray-100 rounded-lg">
        <View className="flex flex-row flex-wrap justify-between flex-wrap p-2 gap-y-2">
          <AttributeCard
            openModal={() => setModalOpen(true)}
            attribute={
              character.attributes.find(
                (attribute) => attribute.name === 'strength',
              )!
            }
          />
          <AttributeCard
            openModal={() => setModalOpen(true)}
            attribute={
              character.attributes.find(
                (attribute) => attribute.name === 'dexterity',
              )!
            }
          />
          <AttributeCard
            openModal={() => setModalOpen(true)}
            attribute={
              character.attributes.find(
                (attribute) => attribute.name === 'constitution',
              )!
            }
          />
          <AttributeCard
            openModal={() => setModalOpen(true)}
            attribute={
              character.attributes.find(
                (attribute) => attribute.name === 'intelligence',
              )!
            }
          />
          <AttributeCard
            openModal={() => setModalOpen(true)}
            attribute={
              character.attributes.find(
                (attribute) => attribute.name === 'wisdom',
              )!
            }
          />
          <AttributeCard
            openModal={() => setModalOpen(true)}
            attribute={
              character.attributes.find(
                (attribute) => attribute.name === 'charisma',
              )!
            }
          />
        </View>
      </View>

      <ReactNativeModal
        backdropColor={'rgba(0,0,0,0.4)'}
        isVisible={modalOpen}
        onModalHide={() => setModalOpen(false)}
        onDismiss={() => setModalOpen(false)}
        onBackButtonPress={() => setModalOpen(false)}
        onBackdropPress={() => setModalOpen(false)}
        backdropTransitionOutTiming={0}
      >
        <View className="flex-1 items-center justify-center">
          <View className="bg-gray-100 p-6 rounded-lg w-full">
            <AttributesForm character={character} />
          </View>
        </View>
      </ReactNativeModal>
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
          {attribute.name}
        </Text>
        <Text className="text-2xl font-bold text-center">
          {attribute.modifier > 0 && '+'}
          {attribute.modifier}
        </Text>
        <View className="absolute rounded-full bg-gray-200 p-1 bottom-0 min-w-7">
          <Text className="text-gray-900 text-sm font-semibold text-center">
            {attribute.value}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
