/* eslint-disable no-restricted-syntax */
import { useCallback, useMemo, useState } from 'react';
import type { LayoutChangeEvent } from 'react-native';

type UseExpandableParams = { maxHeight: number };

export const useExpandable = ({ maxHeight }: UseExpandableParams) => {
  const [expanded, setExpanded] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    setContentHeight(event.nativeEvent.layout.height);
  }, []);

  const overflow = useMemo(
    () => contentHeight >= maxHeight,
    [contentHeight, maxHeight],
  );

  const toggle = useCallback(() => {
    setExpanded((prev) => !prev);
  }, []);

  return {
    expanded,
    overflow,
    contentHeight,
    onLayout,
    toggle,
  };
};
