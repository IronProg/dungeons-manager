import { ActivityIndicator, Text, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { BaseModal } from '@/components/ui/Modals/BaseModal';
import { cn } from '@/core/helpers/cn';
import i18n from '@/i18n';

type ConfirmationModalProps = {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  buttonClassName?: string;
  title?: string;
  subTitle?: string;
  isPending?: boolean;
};

export const ConfirmationModal = ({
  onClose,
  isVisible,
  onConfirm,
  buttonClassName,
  title,
  subTitle,
  isPending = false,
}: ConfirmationModalProps) => {
  return (
    <BaseModal visible={isVisible} onClose={onClose}>
      <Text className="text-2xl font-medium text-center">
        {title ?? i18n.t('titles.confirmation')}
      </Text>

      <Text className="font-medium text-center">
        {subTitle ?? i18n.t('titles.confirmationSubtitle')}
      </Text>

      {isPending && (
        <View className="flex-row w-full justify-center">
          <ActivityIndicator />
        </View>
      )}

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
            disabled={isPending}
            onPress={onConfirm}
          />
        </View>
      </View>
    </BaseModal>
  );
};
