import type { DrawerContentComponentProps } from '@react-navigation/drawer';
import {
  Bell,
  LogOut,
  Settings,
  Table as TableIcon,
  Users,
} from 'lucide-react-native';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import i18n from '@/i18n';

interface MainMenuProps extends DrawerContentComponentProps {
  onLogout: () => void;
}

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  onPress?: () => void;
  disabled?: boolean;
}

const MenuItem = ({ icon, label, onPress, disabled }: MenuItemProps) => (
  <TouchableOpacity
    onPress={onPress}
    disabled={disabled}
    activeOpacity={disabled ? 1 : 0.7}
    className={`flex-row items-center px-5 py-4 ${disabled ? 'opacity-30' : ''}`}
  >
    <View className="w-10 items-center">{icon}</View>
    <Text
      className={`text-base font-medium ml-3 ${disabled ? 'text-gray-400' : 'text-gray-800'}`}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

const Divider = () => <View className="h-px bg-gray-200 mx-5 my-2" />;

export const MainMenu = ({ navigation, onLogout }: MainMenuProps) => {
  const handleNavigate = (route: string) => {
    navigation.navigate(route);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-5 pt-6 pb-4">
        <Text className="text-2xl font-bold text-indigo-600">
          Dungeons Manager
        </Text>
      </View>

      <Divider />

      <View className="mt-2">
        <MenuItem
          icon={<Users size={22} color="#4f46e5" />}
          label={i18n.t('titles.characters')}
          onPress={() => handleNavigate('my-characters')}
        />
        <MenuItem
          icon={<TableIcon size={22} color="#4f46e5" />}
          label={i18n.t('tables.title')}
          onPress={() => handleNavigate('tables')}
        />
      </View>

      <Divider />

      <MenuItem
        icon={<Settings size={22} color="#4f46e5" />}
        label={i18n.t('titles.options', { defaultValue: 'Options' })}
        onPress={() => handleNavigate('options')}
      />
      <MenuItem
        icon={<Bell size={22} color="#9ca3af" />}
        label={i18n.t('titles.notifications', {
          defaultValue: 'Notifications',
        })}
        disabled
      />

      <View className="flex-1" />

      <Divider />

      <MenuItem
        icon={<LogOut size={22} color="#ef4444" />}
        label={i18n.t('titles.logout')}
        onPress={onLogout}
      />
    </SafeAreaView>
  );
};
