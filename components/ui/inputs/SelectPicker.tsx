import { Check, ChevronDown } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import colors from 'tailwindcss/colors';

import { BaseModal } from '@/components/ui/Modals/BaseModal';
import { cn } from '@/core/helpers/cn';

export type SelectPickerItem = {
  id: string | number | null;
  label: string;
  description?: string;
};

export type SelectPickerHandle = {
  show: () => void;
};

type SelectPickerProps = {
  items: SelectPickerItem[];
  value?: string | number | null;
  onChange?: (value: string | number | null) => void;
  placeholder?: string;
  error?: string;
};

export const SelectPicker = ({
  items,
  value,
  onChange,
  placeholder,
  error,
}: SelectPickerProps) => {
  const [visible, setVisible] = useState(false);
  const { height } = useWindowDimensions();

  const maxHeight = height * 0.8;

  const selectedItem = items.find((item) => item.id === value);

  const styles = buildStyle({ maxHeight });

  return (
    <View>
      <TouchableOpacity
        className="flex-row items-center bg-gray-100 rounded-lg h-12 w-full px-4"
        onPress={() => {
          Keyboard.dismiss();
          setVisible(true);
        }}
      >
        <Text
          className={cn(
            'flex-1',
            selectedItem ? 'text-gray-800' : 'text-gray-400',
          )}
          numberOfLines={1}
        >
          {selectedItem?.id ? (
            selectedItem.label
          ) : (
            <Text className="text-gray-400">{placeholder ?? ''}</Text>
          )}
        </Text>

        <ChevronDown size={20} color={colors.gray[500]} />
      </TouchableOpacity>

      {error && <Text className="text-red-400 text-sm mt-1">{error}</Text>}

      <BaseModal visible={visible} onClose={() => setVisible(false)}>
        <ScrollView style={styles.container} contentContainerClassName="gap-2">
          {items.map((item) => (
            <TouchableOpacity
              key={item.id}
              className={cn(
                'flex-row items-center py-3 px-2 rounded-lg border border-slate-300 bg-slate-50',
                {
                  'bg-indigo-100 border-indigo-400':
                    selectedItem?.id === item.id,
                },
              )}
              onPress={() => {
                onChange?.(item.id);
                setVisible(false);
              }}
            >
              <View className="flex-1">
                <Text className="text-gray-800">{item.label}</Text>

                {item.description && (
                  <Text className="text-gray-500 text-sm">
                    {item.description}
                  </Text>
                )}
              </View>

              {item.id === value && (
                <Check size={20} color={colors.indigo[600]} />
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </BaseModal>
    </View>
  );
};

const buildStyle = ({ maxHeight }: { maxHeight: number }) =>
  StyleSheet.create({ container: { height: 'auto', maxHeight } });
