import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import i18n from 'i18n';
import { Skeleton } from 'components/ui/Skeleton';

type DetailsEditableTextBoxProps = {
  text?: string;
  label: string;
  isLoading: boolean;
  isPending: boolean;
  onSave: (newText: string, callback: () => void) => void;
  disabled?: boolean;
};

export const DetailsEditableTextBox = ({
  isLoading,
  text = '',
  label,
  isPending,
  onSave,
  disabled,
}: DetailsEditableTextBoxProps) => {
  const [newText, setNewText] = useState(text);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    setNewText(text ?? '');
  }, [text]);

  if (isLoading) {
    return <Skeleton className="h-10" />;
  }

  return (
    <>
      <TouchableOpacity
        disabled={editing || disabled}
        onLongPress={() => setEditing(true)}
      >
        <Text className="font-semibold mb-1">{label}</Text>

        <View className="border border-neutral-200   bg-white rounded-md px-2 py-1.5">
          {editing ? (
            <TextInput
              autoFocus
              multiline
              value={newText}
              className="px-0 py-0"
              onChangeText={setNewText}
            />
          ) : (
            <Text>{text}</Text>
          )}
        </View>

        {editing && (
          <TouchableOpacity
            disabled={isPending}
            onPress={() => onSave(newText, () => setEditing(false))}
            className={`w-full mt-4 bg-purple-600 rounded-lg py-1.5 ${isPending && 'opacity-80'}`}
          >
            <Text className="text-white font-semibold text-center">
              {i18n.t('general.save')}
            </Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </>
  );
};
