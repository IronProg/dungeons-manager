import Toast, { ToastType } from 'react-native-toast-message';

export const showMessage = (message: string, type: ToastType = 'success') => {
  Toast.show({
    text1: message,
    type,
  });
};
