import {
  LayoutDashboard,
  LogOut,
  Pencil,
  Trash2,
  Users,
} from 'lucide-react-native';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import i18n from '@/i18n';
import type { Table } from '@/types/table';

interface TablesItemProps {
  item: Table;
  onSelect: () => void;
  onLeave?: () => void;
  onDelete?: () => void;
  onDashboard?: () => void;
  onCharacters?: () => void;
  onUsers?: () => void;
  onEdit?: () => void;
}

export const TablesItem = ({
  item,
  onSelect,
  onLeave,
  onDelete,
  onDashboard,
  onCharacters,
  onUsers,
  onEdit,
}: TablesItemProps) => (
  <TouchableOpacity
    onPress={onSelect}
    activeOpacity={0.7}
    className="bg-white rounded-xl p-4 mb-3 shadow-sm border border-gray-100"
  >
    <View className="flex-row items-center">
      <View className="w-12 h-12 rounded-xl bg-indigo-100 items-center justify-center mr-4">
        <Users size={24} color="#4f46e5" />
      </View>
      <View className="flex-1">
        <View className="flex-row items-center justify-between">
          <Text className="font-bold text-lg text-gray-800 flex-1 mr-2">
            {item.name}
          </Text>
          {item.isCreator && (
            <TouchableOpacity
              onPress={onEdit}
              className="p-1"
              hitSlop={10}
              activeOpacity={0.7}
            >
              <Pencil size={18} color="#4f46e5" />
            </TouchableOpacity>
          )}
        </View>
        <Text className="text-gray-500 text-sm mt-1">
          {item.usersCount || 0} {i18n.t('tables.players')} ·{' '}
          {item.charactersCount || 0} {i18n.t('titles.characters')}
          {item.isCreator ? ' · DM' : ''}
        </Text>
      </View>
    </View>

    {item.isCreator ? (
      <View className="flex-row gap-2 mt-3">
        <TouchableOpacity
          onPress={onDashboard}
          className="flex-1 bg-indigo-100 rounded-lg py-2 items-center"
          activeOpacity={0.7}
        >
          <LayoutDashboard size={16} color="#4f46e5" />
          <Text className="text-indigo-600 text-xs font-medium mt-1">
            {i18n.t('tables.dashboard')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onCharacters}
          className="flex-1 bg-indigo-100 rounded-lg py-2 items-center"
          activeOpacity={0.7}
        >
          <Users size={16} color="#4f46e5" />
          <Text className="text-indigo-600 text-xs font-medium mt-1">
            {i18n.t('titles.characters')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onUsers}
          className="flex-1 bg-indigo-100 rounded-lg py-2 items-center"
          activeOpacity={0.7}
        >
          <Users size={16} color="#4f46e5" />
          <Text className="text-indigo-600 text-xs font-medium mt-1">
            {i18n.t('tables.users')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onDelete}
          className="flex-1 bg-red-50 rounded-lg py-2 items-center"
          activeOpacity={0.7}
        >
          <Trash2 size={16} color="#ef4444" />
          <Text className="text-red-500 text-xs font-medium mt-1">
            {i18n.t('tables.delete')}
          </Text>
        </TouchableOpacity>
      </View>
    ) : (
      <View className="flex-row gap-2 mt-3">
        <TouchableOpacity
          onPress={onUsers}
          className="flex-1 bg-indigo-100 rounded-lg py-2 items-center"
          activeOpacity={0.7}
        >
          <Users size={16} color="#4f46e5" />
          <Text className="text-indigo-600 text-xs font-medium mt-1">
            {i18n.t('tables.users')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onLeave}
          className="flex-1 bg-red-500 rounded-lg py-2 items-center flex-row justify-center gap-1"
          activeOpacity={0.7}
        >
          <LogOut size={16} color="white" />
          <Text className="text-white font-medium text-sm">
            {i18n.t('tables.leave')}
          </Text>
        </TouchableOpacity>
      </View>
    )}
  </TouchableOpacity>
);
