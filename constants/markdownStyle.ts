import type { MarkdownStyle } from 'react-native-enriched-markdown';

const BLACK = '#000000';
const WHITE = '#ffffff';
const FONT = 'System';

export const blackMarkdownStyle: MarkdownStyle = {
  paragraph: {
    color: BLACK,
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 'normal',
  },

  h1: {
    color: BLACK,
    fontFamily: FONT,
    fontSize: 28,
    fontWeight: 'bold',
  },

  h2: {
    color: BLACK,
    fontFamily: FONT,
    fontSize: 22,
    fontWeight: 'bold',
  },

  h3: {
    color: BLACK,
    fontFamily: FONT,
    fontSize: 18,
    fontWeight: 'bold',
  },

  h4: {
    color: BLACK,
    fontFamily: FONT,
    fontSize: 16,
    fontWeight: 'bold',
  },

  h5: {
    color: BLACK,
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 'bold',
  },

  h6: {
    color: BLACK,
    fontFamily: FONT,
    fontSize: 12,
    fontWeight: 'bold',
  },

  strong: {
    color: BLACK,
    fontFamily: FONT,
    fontWeight: 'bold',
  },

  em: {
    color: BLACK,
    fontFamily: FONT,
    fontStyle: 'italic',
  },

  strikethrough: {
    color: BLACK,
  },

  underline: {
    color: BLACK,
  },

  link: {
    color: BLACK,
    fontFamily: FONT,
    underline: false,
  },

  code: {
    color: BLACK,
    fontFamily: FONT,
    fontSize: 14,
  },

  codeBlock: {
    color: BLACK,
    backgroundColor: WHITE,

    fontFamily: FONT,
    fontSize: 14,

    borderColor: WHITE,
    borderWidth: 0,
    borderRadius: 0,
  },

  blockquote: {
    color: BLACK,
    backgroundColor: WHITE,

    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 'normal',

    borderColor: WHITE,
    borderWidth: 0,
    gapWidth: 0,
  },

  list: {
    color: BLACK,

    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 'normal',

    bulletColor: BLACK,
    markerColor: BLACK,
  },

  table: {
    color: BLACK,

    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 'normal',

    headerFontFamily: FONT,
    headerTextColor: BLACK,
    headerBackgroundColor: WHITE,

    rowEvenBackgroundColor: WHITE,
    rowOddBackgroundColor: WHITE,

    borderColor: WHITE,
    borderWidth: 0,
    borderRadius: 0,
  },

  taskList: {
    checkedColor: WHITE,
    borderColor: WHITE,
    checkmarkColor: BLACK,
    checkedTextColor: BLACK,
    checkedStrikethrough: false,
  },

  math: { color: BLACK, backgroundColor: WHITE, fontSize: 14 },

  inlineMath: {
    color: BLACK,
  },

  thematicBreak: {
    color: WHITE,
    height: 0,
  },

  image: {
    borderRadius: 0,
  },

  inlineImage: {
    size: 16,
  },

  superscript: {
    fontScale: 0.75,
    baselineOffsetScale: 0.35,
  },

  subscript: {
    fontScale: 0.75,
    baselineOffsetScale: 0.2,
  },
};
