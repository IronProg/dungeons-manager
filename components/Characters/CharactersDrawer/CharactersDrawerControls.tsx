import type { DrawerContentComponentProps } from '@react-navigation/drawer';
import { LayoutDashboard, LogOut, Plus } from 'lucide-react-native';
import { Text, TouchableOpacity, View } from 'react-native';

import { useTable } from '@/contexts/TableContext';
import i18n from '@/i18n';

interface CharactersDrawerControlsProps {
  navigation: DrawerContentComponentProps['navigation'];
  onLogout: () => void;
  onNewCharacter: () => void;
}

export const CharactersDrawerControls = ({
  navigation,
  onLogout,
  onNewCharacter,
}: CharactersDrawerControlsProps) => {
  const { table } = useTable();

  return (
    <View className="px-4 pb-4 gap-3">
      {table?.isCreator && (
        <TouchableOpacity
          onPress={() => navigation.navigate('dm-dashboard')}
          className="bg-indigo-100 border border-indigo-200 rounded-xl py-4 flex-row items-center justify-center shadow-sm"
          activeOpacity={0.8}
        >
          <LayoutDashboard size={20} color="#4f46e5" />

          <Text className="text-indigo-600 font-bold text-base ml-2">
            {i18n.t('titles.dmDashboardInternal')}
          </Text>
        </TouchableOpacity>
      )}

      <View className="flex flex-row items-stretch">
        <View className="w-1/2 pr-2">
          <TouchableOpacity
            onPress={onNewCharacter}
            className="bg-emerald-500 rounded-xl py-4 flex-row items-center justify-center shadow-md"
            activeOpacity={0.8}
          >
            <Plus size={20} color="white" />

            <Text className="text-white font-bold text-base ml-2">
              {i18n.t('titles.character')}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={onLogout}
          className="bg-white border border-red-200 rounded-xl py-3 flex-row items-center justify-center grow"
          activeOpacity={0.8}
        >
          <LogOut size={18} color="#EF4444" />

          <Text className="text-red-500 font-medium text-sm ml-2">
            {i18n.t('titles.logout')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
