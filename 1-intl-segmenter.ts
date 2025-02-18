// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter

export const name = "Intl.Segmenter";

export const parse = (text: string): string[] => {
	const segmenter = new Intl.Segmenter("ja-JP", { granularity: "word" });
	const segments = segmenter.segment(text);
	return Array.from(segments, (segment) => segment.segment);
};
