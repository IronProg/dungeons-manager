import i18n from 'i18n';
import { Heart } from 'lucide-react-native';
import { Text, TouchableOpacity, View } from 'react-native';
import { CharacterGeneralInfo } from 'types/character';

type HitPointsProps = {
  generalInfo: CharacterGeneralInfo;
  onPress: () => void;
  onLongPress: () => void;
  canEdit: boolean;
};

export const HitPoints = ({
  generalInfo,
  onPress,
  onLongPress,
  canEdit,
}: HitPointsProps) => {
  const hitPointsMaximum =
    generalInfo.hitPointsLimitTemporary || generalInfo.hitPointsLimit;

  return (
    <TouchableOpacity
      disabled={!canEdit}
      onLongPress={onLongPress}
      onPress={onPress}
      className="relative flex flex-col items-center justify-center w-[90px]"
    >
      <Heart size={90} color={'#cbd5e1'} fill={'#e2e8f0'} />

      <View className="absolute flex flex-col items-center justify-center h-full w-full">
        <Text className="text-gray-900 text-sm font-semibold text-center">
          {i18n.t('titles.hp')}
        </Text>

        <View className="flex flex-col">
          <Text className="text-2xl font-bold text-center">
            {generalInfo.hitPoints} / {hitPointsMaximum}
          </Text>

          {generalInfo?.temporaryHitPoints && (
            <Text className="text-2xl font-bold text-center">
              ({generalInfo.temporaryHitPoints})
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};
