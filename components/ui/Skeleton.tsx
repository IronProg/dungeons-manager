import type { ViewProps } from 'react-native';
import { View } from 'react-native';

import { cn } from '@/core/helpers/cn';

interface SkeletonProps extends ViewProps {
  className?: string;
}

export const Skeleton = ({ className, ...props }: SkeletonProps) => {
  return (
    <View
      // "animate-pulse" cria o efeito de fade in/out
      // "bg-slate-200" ou "bg-gray-300" são cores padrão de skeleton
      className={cn('animate-pulse rounded-md bg-slate-300 w-full', className)}
      {...props}
    />
  );
};
