import { tokenize, TokenizeMode } from "npm:sudachi@0.1.5";

// https://github.com/hata6502/sudachi-wasm

export const name = "sudachi";

export const parse = (text: string): string[] => {
  const tokens = JSON.parse(tokenize(text, TokenizeMode.C));
  return tokens.map((token: { surface: string }) => token.surface);
};
