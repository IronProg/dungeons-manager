import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

import { cn } from '@/core/helpers/cn';
import i18n from '@/i18n';
import type { Table } from '@/types/table';

interface StepTableSelectProps {
  tables: Table[] | undefined;
  isLoading: boolean;
  error: Error | null;
  selectedTableId: number | null;
  onSelect: (tableId: number | null) => void;
  onRetry?: () => void;
}

export const StepTableSelect = ({
  tables,
  isLoading,
  error,
  selectedTableId,
  onSelect,
  onRetry,
}: StepTableSelectProps) => {
  if (isLoading) {
    return (
      <View className="grow justify-center items-center">
        <ActivityIndicator size="large" color="#4f46e5" />
      </View>
    );
  }

  return (
    <View className="flex-1 w-full px-4">
      <Text className="text-gray-500 text-sm mb-4">
        {i18n.t('character.chooseTable')}
      </Text>

      {error ? (
        <View className="items-center py-8 px-4">
          <Text className="text-red-400 text-center mb-4">
            {i18n.t('errors.couldNotLoadTables')}
          </Text>
          {onRetry && (
            <TouchableOpacity
              onPress={onRetry}
              className="bg-indigo-500 px-6 py-3 rounded-xl"
              activeOpacity={0.8}
            >
              <Text className="text-white font-medium">
                {i18n.t('general.tryAgain')}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <>
          <TouchableOpacity
            onPress={() => onSelect(null)}
            className={cn(
              'border rounded-xl p-4 mb-3',
              selectedTableId === null
                ? 'border-indigo-400 bg-indigo-50'
                : 'border-dashed border-gray-400',
            )}
            activeOpacity={0.7}
          >
            <Text
              className={cn(
                'text-center font-medium',
                selectedTableId === null ? 'text-indigo-600' : 'text-gray-400',
              )}
            >
              {i18n.t('tables.noTable')}
            </Text>
          </TouchableOpacity>

          {tables?.map((table) => {
            const isSelected = table.id === selectedTableId;

            return (
              <TouchableOpacity
                key={table.id}
                onPress={() => onSelect(table.id ?? null)}
                className={cn(
                  'border rounded-xl p-4 mb-3',
                  isSelected
                    ? 'border-2 border-indigo-400 bg-indigo-50'
                    : 'border border-gray-200 bg-white',
                )}
                activeOpacity={0.7}
              >
                <Text className="font-bold text-gray-800">{table.name}</Text>
                <Text className="text-gray-400 text-sm mt-1">
                  {table.usersCount} {i18n.t('tables.players')} ·{' '}
                  {table.charactersCount}{' '}
                  {i18n.t('titles.characters').toLowerCase()}
                </Text>
              </TouchableOpacity>
            );
          })}
        </>
      )}
    </View>
  );
};
