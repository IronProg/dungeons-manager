import Toast from 'react-native-toast-message';

import i18n from '@/i18n';

export interface ApiErrorResponse {
  messages?: string[];
}

export const handleErrorMessage = (response?: ApiErrorResponse) => {
  const messages = response?.messages;

  if (!messages || messages.length === 0) {
    Toast.show({
      type: 'error',
      text1: i18n.t('errors.general'),
      text2: i18n.t('errors.api_unknown_error'),
    });

    return;
  }

  messages.forEach((message) => {
    Toast.show({
      type: 'error',
      text1: i18n.t('errors.general'),
      text2: message,
    });
  });
};
