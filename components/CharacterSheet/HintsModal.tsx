import { BaseModal } from 'components/ui/Modals/BaseModal';
import i18n from 'i18n';
import { Text, View, useWindowDimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type HintsModalProps = {
  visible: boolean;
  onClose: () => void;
};

export const HintsModal = ({ visible, onClose }: HintsModalProps) => {
  const { bottom } = useSafeAreaInsets();
  const { height } = useWindowDimensions();

  return (
    <BaseModal visible={visible} onClose={onClose}>
      <ScrollView
        style={{ height: height * 0.8 }}
        contentContainerStyle={{ paddingBottom: bottom }}
      >
        <Text className="text-center font-semibold text-lg">
          {i18n.t('hints.title')}
        </Text>

        <View className="flex flex-col gap-2 mt-2">
          <Text className="text-center font-semibold text-base">
            {i18n.t('tabs.equipments')}
          </Text>

          <Text className="text-sm">{i18n.t('hints.equipmentsBase')}</Text>

          <Text className="text-sm">{i18n.t('hints.equipmentsNotes')}</Text>
        </View>

        <View className="flex flex-col gap-2 mt-2">
          <Text className="text-center font-semibold text-base">
            {i18n.t('tabs.sheet')}
          </Text>

          <Text className="text-sm">{i18n.t('hints.sheetHP')}</Text>

          <Text className="text-sm">
            {i18n.t('hints.sheetInitiativeSavingThrowsSkills')}
          </Text>

          <Text className="text-sm">{i18n.t('hints.sheetEdit')}</Text>

          <Text className="text-sm">{i18n.t('hints.sheetDetails')}</Text>
        </View>

        <View className="flex flex-col gap-2 mt-2">
          <Text className="text-center font-semibold text-base">
            {i18n.t('tabs.details')}
          </Text>

          <Text className="text-sm">{i18n.t('hints.detailsAttacks')}</Text>

          <Text className="text-sm">
            {i18n.t('hints.detailsAttacksLongPress')}
          </Text>

          <Text className="text-sm">
            {i18n.t('hints.detailsResourcesAmmunitions')}
          </Text>

          <Text className="text-sm">{i18n.t('hints.detailsFeatures')}</Text>
        </View>

        <View className="flex flex-col gap-2 mt-2">
          <Text className="text-center font-semibold text-base">
            {i18n.t('tabs.spells')}
          </Text>

          <Text className="text-sm">{i18n.t('hints.spellsBase')}</Text>

          <Text className="text-sm">{i18n.t('hints.spellsSlots')}</Text>

          <Text className="text-sm">{i18n.t('hints.spellsSlotsButtons')}</Text>
        </View>
      </ScrollView>
    </BaseModal>
  );
};
