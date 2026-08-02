import * as Clipboard from 'expo-clipboard';
import { useRouter } from 'expo-router';
import { Copy, Edit, Share2 } from 'lucide-react-native';
import React from 'react';
import { View, Text, TouchableOpacity, Share } from 'react-native';

import { showMessage } from '@/core/utils/messages';
import i18n from '@/i18n';
import type { Table } from '@/types/table';

export const DmDashboardHeader = ({ table }: { table: Table }) => {
  const router = useRouter();

  const copyCode = async () => {
    await Clipboard.setStringAsync(table.inviteCode!);
    showMessage(i18n.t('tables.inviteCodeCopied'));
  };

  const shareCode = () => {
    const url = `dungeons-manager-scheme://(authenticated)/(drawer)/tables?inviteCode=${table.inviteCode}`;
    const message = `${i18n.t('tables.inviteMessage')} ${url}`;
    Share.share({ url, message });
  };

  return (
    <View className="px-4 py-6">
      <View className="flex-row justify-between">
        <View className="flex-1">
          <Text className="text-2xl font-bold text-slate-800">
            {table?.name}
          </Text>

          <Text className="text-slate-500 font-medium">
            {i18n.t('titles.dmDashboard')}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => router.push('/(authenticated)/edit-table')}
          className="h-10 w-10 items-center justify-center rounded-full bg-indigo-500"
          hitSlop={10}
          accessibilityRole="button"
          accessibilityLabel={i18n.t('tables.renameTable')}
        >
          <Edit size={16} color="white" />
        </TouchableOpacity>
      </View>

      {table?.inviteCode && (
        <View className="bg-white rounded-xl p-4 mt-4 shadow-sm">
          <Text className="text-gray-500 text-sm mb-2">
            {i18n.t('tables.inviteCode')}
          </Text>

          <View className="flex-row items-center justify-between">
            <Text
              className="text-gray-800 font-mono text-sm flex-1 mr-3"
              numberOfLines={1}
            >
              {table.inviteCode}
            </Text>

            <View className="flex-row gap-2">
              <TouchableOpacity
                onPress={copyCode}
                className="w-10 h-10 rounded-full bg-indigo-100 items-center justify-center"
                hitSlop={10}
                accessibilityRole="button"
                accessibilityLabel={i18n.t('tables.inviteCodeCopied')}
              >
                <Copy size={18} color="#4f46e5" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={shareCode}
                className="w-10 h-10 rounded-full bg-indigo-100 items-center justify-center"
                hitSlop={10}
                accessibilityRole="button"
                accessibilityLabel={i18n.t('tables.shareInvite')}
              >
                <Share2 size={18} color="#4f46e5" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};
