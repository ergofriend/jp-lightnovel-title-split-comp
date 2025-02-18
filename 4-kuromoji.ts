import { tokenize } from "npm:kuromojin@3.0.0";

// https://github.com/azu/kuromojin

export const name = "kuromojin（kuromoji.js）";

export const parse = async (text: string): Promise<string[]> => {
	const tokens = await tokenize(text);
	return tokens.map((token) => token.surface_form);
};
