import { loadDefaultJapaneseParser } from "npm:budoux@0.6.4";

// https://github.com/google/budoux

export const name = "budoux";

export const parse = (text: string): string[] => {
	const parser = loadDefaultJapaneseParser();
	return parser.parse(text);
};
