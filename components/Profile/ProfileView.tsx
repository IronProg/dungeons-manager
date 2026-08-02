import { useRouter } from 'expo-router';
import { Pencil } from 'lucide-react-native';
import { View, Text, TouchableOpacity } from 'react-native';

import i18n from '@/i18n';
import type { User } from '@/types/user';

interface ProfileViewProps {
  user: User;
}

export const ProfileView = ({ user }: ProfileViewProps) => {
  const router = useRouter();
  const displayName = `${user.nickname}#${user.discriminator}`;

  return (
    <View className="flex-1 bg-slate-200 p-5">
      <View className="bg-white rounded-2xl p-6 shadow-sm">
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-2xl font-bold text-gray-800">
            {displayName}
          </Text>

          <TouchableOpacity
            onPress={() => router.push('/(authenticated)/profile/edit')}
            className="w-10 h-10 rounded-full bg-indigo-100 items-center justify-center"
            hitSlop={10}
            accessibilityRole="button"
            accessibilityLabel="Edit profile"
          >
            <Pencil size={20} color="#4f46e5" />
          </TouchableOpacity>
        </View>

        <View className="mb-4">
          <Text className="text-gray-500 text-sm mb-1">
            {i18n.t('profile.email')}
          </Text>

          <Text className="text-gray-800 text-base font-medium">
            {user.email}
          </Text>
        </View>

        <View>
          <Text className="text-gray-500 text-sm mb-1">
            {i18n.t('profile.discriminator')}
          </Text>

          <Text className="text-gray-800 text-base font-medium">
            {user.discriminator}
          </Text>
        </View>
      </View>
    </View>
  );
};
