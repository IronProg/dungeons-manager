import { Modal, Pressable } from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideOutDown,
} from 'react-native-reanimated';

type BaseModalProps = {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export const BaseModal = ({ visible, onClose, children }: BaseModalProps) => {
  return (
    <Modal
      transparent
      visible={visible}
      onRequestClose={onClose}
      animationType="none"
    >
      <Animated.View
        entering={FadeIn.duration(200)}
        exiting={FadeOut.duration(200)}
        className="flex-1 justify-center items-center"
        style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      >
        <Pressable className="absolute inset-0" onPress={onClose} />

        <Animated.View
          entering={SlideInDown.duration(250).springify()}
          exiting={SlideOutDown.duration(200)}
          className="w-4/5 rounded-lg bg-white gap-4 items-stretch p-4"
        >
          {children}
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};
