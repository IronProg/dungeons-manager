import type { ImageComponent } from 'react-native';

declare module '*.svg' {
  const content: ImageComponent;
  export default content;
}
