import React, { useEffect, useState } from 'react';

import { useCharacters } from 'contexts/CharactersContext';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useAttributes } from 'contexts/AttributesContext';

export const WeaponsAndTools = () => {
  const [loading, setLoading] = useState(true);
  const { character, getDetails } = useCharacters();
  const { modifiers } = useAttributes();

  useEffect(() => {
    if (!character) {
      getDetails({
        id: '1',
        success: () => {
          setLoading(false);
        },
      });
    } else {
      setLoading(false);
    }
  }, [character, getDetails]);

  return (
    <>
      {character && (
        <ScrollView>
          <Text className="text-black text-2xl font-bold text-center pb-2">
            Ataques
          </Text>

          {character.attacks?.map((attack, index) => {
            const attributeModifier = modifiers[attack.attribute];

            const attackBonus =
              attributeModifier +
              (attack.applyProficiency ? character.proficiency : 0);

            return (
              <View
                key={index}
                className="rounded-lg flex flex-row items-center gap-2 border-b border-gray-300 pb-2 mb-2"
              >
                <Text className="bg-gray-100 rounded-lg px-2 py-1 grow">
                  {attack.name}
                </Text>
                <Text className="bg-gray-100 rounded-lg px-2 py-1">
                  {attackBonus > 0 && '+'}
                  {attackBonus}
                </Text>
                <View className="flex flex-col bg-gray-100 rounded-lg px-2 py-1 grow">
                  {attack.damages.map((damage, index) => {
                    const attributeModifier = modifiers[damage.attribute];

                    return (
                      <Text className="" key={index}>
                        {damage.dice}{' '}
                        {`${attributeModifier > 0 ? '+' : ''}${attributeModifier}`}{' '}
                        {damage.customBonus && damage.customBonus} {damage.kind}
                      </Text>
                    );
                  })}
                </View>
              </View>
            );
          })}

          <Text className="text-black text-2xl font-bold text-center pb-2">
            Recursos e Munições
          </Text>

          {character.resources?.map((resource, index) => {
            return (
              <View
                key={index}
                className="rounded-lg flex flex-row items-center gap-2 border-b border-gray-300 pb-2 mb-2"
              >
                <Text className="bg-gray-100 rounded-lg px-2 py-1 grow">
                  {resource.name}
                </Text>

                <Text className="bg-gray-100 rounded-lg px-2 py-1" key={index}>
                  {resource.amount}
                  {resource.max && `/${resource.max}`}
                </Text>
              </View>
            );
          })}

          <Text className="text-black text-2xl font-bold text-center pb-2">
            Características
          </Text>

          {character.features?.map((feature, index) => {
            return (
              <View
                key={index}
                className="rounded-lg gap-2 border-b border-gray-300 pb-2 mb-2"
              >
                <View className="bg-gray-100 rounded-lg px-2 py-1 flex flex-row gap-1 items-center flex-wrap">
                  <Text>{feature.title}</Text>

                  {feature.origin && (
                    <Text className="text-gray-700">({feature.origin})</Text>
                  )}
                </View>
              </View>
            );
          })}
        </ScrollView>
      )}
    </>
  );
};
