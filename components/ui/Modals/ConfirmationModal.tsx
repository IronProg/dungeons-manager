import { Text, View } from 'react-native';
import i18n from 'i18n';

import { cn } from 'core/helpers/cn';

import { BaseModal } from './BaseModal';
import { Button } from '../Button';

type ConfirmationModalProps = {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  buttonClassName?: string;
  title?: string;
  subTitle?: string;
};

export const ConfirmationModal = ({
  onClose,
  isVisible,
  onConfirm,
  buttonClassName,
  title,
  subTitle,
}: ConfirmationModalProps) => {
  return (
    <BaseModal visible={isVisible} onClose={onClose}>
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
            className={cn('bg-red-500', buttonClassName)}
            text={i18n.t('general.confirm')}
            onPress={onConfirm}
          />
        </View>
      </View>
    </BaseModal>
  );
};
