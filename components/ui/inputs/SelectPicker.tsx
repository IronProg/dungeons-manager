import { FlashList } from '@shopify/flash-list';
import { Check, ChevronDown } from 'lucide-react-native';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import type { Ref } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Portal } from 'react-native-portalize';
import colors from 'tailwindcss/colors';

import { AdaptiveBottomSheet } from '@/components/ui/BottomSheet/AdaptiveBottomSheet';
import type { AdaptiveBottomSheetHandle } from '@/components/ui/BottomSheet/AdaptiveBottomSheet';
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

function SelectPickerInner(
  { items, value, onChange, placeholder, error }: SelectPickerProps,
  ref: Ref<SelectPickerHandle>,
) {
  const sheetRef = useRef<AdaptiveBottomSheetHandle<void>>(null);

  const selectedItem = items.find((item) => item.id === value);

  useImperativeHandle(
    ref,
    () => ({
      show() {
        sheetRef.current?.show();
      },
    }),
    [],
  );

  return (
    <View>
      <TouchableOpacity
        className="flex-row items-center bg-gray-100 rounded-lg h-12 w-full px-4"
        onPress={() => sheetRef.current?.show()}
      >
        <Text
          className={'flex-1 '.concat(
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

      <Portal>
        <AdaptiveBottomSheet
          ref={sheetRef}
          renderContent={({ onClose }) => (
            <FlashList
              data={items}
              keyExtractor={(item) => String(item.id)}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  className={cn('flex-row items-center py-3 px-2', {
                    'bg-slate-200': index % 2 === 0,
                    'bg-slate-50': index % 2 !== 0,
                  })}
                  onPress={() => {
                    onChange?.(item.id);
                    onClose();
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
              )}
              keyboardShouldPersistTaps="handled"
            />
          )}
        />
      </Portal>
    </View>
  );
}

export const SelectPicker = forwardRef(SelectPickerInner) as (
  props: SelectPickerProps & { ref?: Ref<SelectPickerHandle> },
) => React.JSX.Element;
