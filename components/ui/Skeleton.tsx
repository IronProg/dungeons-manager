import { cn } from 'core/helpers/cn';
import { View, ViewProps } from 'react-native';

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
