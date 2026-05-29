import { Eye, EyeOff, Lock } from 'lucide-react-native';
import { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

type PasswordInputProps = {
  onChangeText: (value: string) => void;
  value: string;
  error?: string;
};

export const PasswordInput = ({
  onChangeText,
  value,
  error,
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View
      className={`flex-row items-center bg-slate-50 rounded-xl px-4 border ${error ? 'border-red-400' : 'border-slate-200'}`}
    >
      <Lock size={20} color="#9CA3AF" />
      <TextInput
        className="flex-1 py-4 px-3 text-gray-800"
        placeholder="••••••••"
        placeholderTextColor="#9CA3AF"
        autoCapitalize="none"
        secureTextEntry={!showPassword}
        value={value}
        onChangeText={onChangeText}
      />
      <TouchableOpacity
        hitSlop={20}
        onPress={() => setShowPassword(!showPassword)}
      >
        {showPassword ? (
          <EyeOff size={20} color="#9CA3AF" />
        ) : (
          <Eye size={20} color="#9CA3AF" />
        )}
      </TouchableOpacity>
    </View>
  );
};
