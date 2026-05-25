import { Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import i18n from 'i18n';

import { SPELL_SLOT_LEVELS } from 'core/enums/spellSlotLevel';

import { SpellSlotLevelType } from 'types/character';

interface SpellLevelNavigatorProps {
  setLevel: (level: SpellSlotLevelType) => void;
  level: SpellSlotLevelType;
}

export const SpellLevelNavigator = ({
  setLevel,
  level,
}: SpellLevelNavigatorProps) => {
  const { bottom } = useSafeAreaInsets();

  return (
    <View
      className="absolute bottom-4 left-4 right-4 bg-indigo-500 rounded-full flex flex-row items-center justify-around py-2 shadow-lg"
      style={{ marginBottom: bottom }}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="flex flex-row items-center gap-0 justify-center px-2"
      >
        {SPELL_SLOT_LEVELS.map((lvlLine) => (
          <TouchableOpacity
            key={lvlLine}
            onPress={() => setLevel(lvlLine)}
            className={`px-4 py-2 rounded-full ${level === lvlLine ? 'bg-white' : 'bg-transparent'}`}
          >
            <Text
              className={`font-bold ${level === lvlLine ? 'text-gray-800' : 'text-white'}`}
            >
              {lvlLine === 0
                ? i18n.t('spells.cantrip').charAt(0)
                : `${lvlLine}`}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};
