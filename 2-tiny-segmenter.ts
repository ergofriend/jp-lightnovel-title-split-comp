import { TinySegmenter } from "https://code4fukui.github.io/TinySegmenter/TinySegmenter.js";

// http://chasen.org/~taku/software/TinySegmenter/
// https://fukuno.jig.jp/3596

export const name = "TinySegmenter";

export const parse = (text: string): string[] => {
	return TinySegmenter.segment(text);
};
