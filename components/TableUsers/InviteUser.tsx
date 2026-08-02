import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  View,
} from 'react-native';
import colors from 'tailwindcss/colors';
import { useDebounce } from 'use-debounce';

import { Button } from '@/components/ui/Button';
import { showMessage } from '@/core/utils/messages';
import { useTable } from '@/hooks/useTable';
import i18n from '@/i18n';
import {
  useInviteUserMutation,
  useSearchUsers,
} from '@/services/tableRequests/tableRequest.api';
import type { SearchUserResult } from '@/services/tableRequests/tableRequest.service';

const parseSearch = (input: string) => {
  const trimmed = input.trim();

  if (trimmed.includes('@')) {
    return { email: trimmed };
  }

  if (trimmed.includes('#')) {
    const [nickname, discriminator] = trimmed.split('#');
    return { nickname: nickname.trim(), discriminator: discriminator.trim() };
  }

  return { nickname: trimmed };
};

export const InviteUser = () => {
  const router = useRouter();
  const { tableId } = useTable();
  const [input, setInput] = useState('');
  const [debouncedInput] = useDebounce(input, 300);
  const [params, setParams] = useState<SearchUsersParams | null>(null);
  const { data: results, isFetching } = useSearchUsers(params);
  const { mutate: inviteUser, isPending: isInviting } = useInviteUserMutation();

  useEffect(() => {
    if (!tableId || !debouncedInput) {
      setParams(null);
      return;
    }

    const parsed = parseSearch(debouncedInput);
    setParams({ tableId, ...parsed });
  }, [debouncedInput, tableId]);

  const handleInvite = (user: SearchUserResult) => {
    if (!tableId) return;

    inviteUser(
      { tableId, receiverId: user.id },
      {
        onSuccess: () => {
          showMessage(i18n.t('tableRequests.invited'));
          router.back();
        },
      },
    );
  };

  const renderResult = ({ item }: { item: SearchUserResult }) => (
    <View className="flex-row items-center justify-between bg-white rounded-xl p-4 mb-3 shadow-sm">
      <Text className="font-medium text-gray-800">
        {`${item.nickname}#${item.discriminator}`}
      </Text>

      <View>
        <Button
          className="px-4"
          text={i18n.t('tableRequests.invite')}
          onPress={() => handleInvite(item)}
          disabled={isInviting}
          loading={isInviting}
          accessibilityLabel={i18n.t('tableRequests.invite')}
        />
      </View>
    </View>
  );

  const emptyText = debouncedInput
    ? i18n.t('general.noDataFound')
    : i18n.t('tableRequests.searchPlaceholder');

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-slate-200"
    >
      <View className="flex-1 p-4">
        <View className="bg-white rounded-xl p-4 mb-4 shadow-sm">
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder={i18n.t('tableRequests.searchPlaceholder')}
            placeholderTextColor={colors.gray[400]}
            className="bg-white border border-gray-200 rounded-xl py-3 px-4 text-gray-800 font-medium h-12"
            textAlignVertical="center"
            autoCapitalize="none"
            autoCorrect={false}
            autoFocus
            accessibilityLabel={i18n.t('tableRequests.searchPlaceholder')}
          />
        </View>

        {isFetching && <ActivityIndicator className="my-4" color="#4f46e5" />}

        <FlatList
          data={results ?? []}
          renderItem={renderResult}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          ListEmptyComponent={() => (
            <View className="items-center py-10 px-4">
              <Text className="text-gray-500 text-center">{emptyText}</Text>
            </View>
          )}
        />
      </View>
    </KeyboardAvoidingView>
  );
};
