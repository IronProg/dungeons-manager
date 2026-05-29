import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Users, LogOut } from 'lucide-react-native';

import { cn } from 'core/helpers/cn';

import type { Table } from 'types/table';

interface TablesItemProps {
  item: Table;
  onSelect: () => void;
  onDelete: () => void;
}

export const TablesItem = ({ item, onSelect, onDelete }: TablesItemProps) => (
  <TouchableOpacity
    onPress={onSelect}
    activeOpacity={0.7}
    className="bg-white rounded-xl p-4 mb-3 shadow-sm border border-gray-100 flex-row items-center"
  >
    <View className="w-12 h-12 rounded-xl bg-indigo-100 items-center justify-center mr-4">
      <Users size={24} color="#4f46e5" />
    </View>
    <View className="flex-1">
      <Text className="font-bold text-lg text-gray-800">{item.name}</Text>
      <Text className="text-gray-500 text-sm mt-1">
        {item.usersCount || 0} Members
      </Text>
      <Text className="text-gray-500 text-sm mt-1">
        {item.charactersCount || 0} Characters
      </Text>
    </View>

    <View>
      {!item.isCreator && (
        <TouchableOpacity
          onPress={onDelete}
          className={cn(
            'rounded-lg bg-red-500 h-10 w-10 items-center justify-center',
          )}
        >
          <LogOut size={20} color={'white'} />
        </TouchableOpacity>
      )}
    </View>
  </TouchableOpacity>
);
