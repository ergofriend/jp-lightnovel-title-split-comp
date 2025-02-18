import { tokenize } from "npm:wakachigaki@1.3.2";

// https://github.com/yuhsak/wakachigaki

export const name = "wakachigaki";

export const parse = (text: string): string[] => {
	return tokenize(text);
};
