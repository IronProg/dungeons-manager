import { Text, View } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import i18n from 'i18n';

import { Button } from '../Button';

type ConfirmationModalProps = {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  subTitle?: string;
};

export const ConfirmationModal = ({
  onClose,
  isVisible,
  onConfirm,
  title,
  subTitle,
}: ConfirmationModalProps) => {
  return (
    <ReactNativeModal isVisible={isVisible} onBackdropPress={() => onClose()}>
      <View className="flex flex-col rounded-lg bg-white gap-4 items-stretch p-4">
        <Text className="text-2xl font-medium text-center">
          {title || i18n.t('titles.confirmation')}
        </Text>

        <Text className="font-medium text-center">
          {subTitle || i18n.t('titles.confirmationSubtitle')}
        </Text>

        <View className="flex flex-row gap-4">
          <View className="grow">
            <Button
              className="bg-neutral-500"
              text={i18n.t('general.cancel')}
              onPress={onClose}
            />
          </View>

          <View className="grow">
            <Button
              className="bg-red-500"
              text={i18n.t('general.confirm')}
              onPress={onConfirm}
            />
          </View>
        </View>
      </View>
    </ReactNativeModal>
  );
};
