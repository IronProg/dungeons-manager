import { ActivityIndicator, Button, View, Text } from 'react-native';

import { ProfileView } from '@/components/Profile/ProfileView';
import i18n from '@/i18n';
import { useGetCurrentUser } from '@/services/auth/auth.api';

export default function ProfileScreen() {
  const { data: user, isLoading, isError, refetch } = useGetCurrentUser();

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-slate-200">
        <ActivityIndicator size="large" color="#4f46e5" />
      </View>
    );
  }

  if (isError || !user) {
    return (
      <View className="flex-1 justify-center items-center bg-slate-200 p-5">
        <Text className="text-red-500 text-center mb-4">
          {i18n.t('profile.loadError')}
        </Text>

        <Button title={i18n.t('general.tryAgain')} onPress={() => refetch()} />
      </View>
    );
  }

  return <ProfileView user={user} />;
}
