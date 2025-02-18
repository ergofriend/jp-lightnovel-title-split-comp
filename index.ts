import * as intl from "./1-intl-segmenter.ts";
import * as tiny from "./2-tiny-segmenter.ts";
import * as budoux from "./3-budoux.ts";
import * as kuromoji from "./4-kuromoji.ts";
import * as wakachigaki from "./5-wakachigaki.ts";
import * as sudachi from "./6-sudachi.ts";

const texts = [
	"転生してハイエルフになりましたが、スローライフは１２０年で飽きました",
	"異世界航空宇宙局～魔法があれば宇宙に行くのなんか簡単じゃない？～",
	"劣等種の建国録〜銃剣と歯車は、剣と魔法を打倒し得るか？〜",
	"【書籍化決定】侯爵次男は家出する～才能がないので全部捨てて冒険者になります～",
	"オールラウンダーズ!!　転生したら幼女でした。家に居づらいのでおっさんと冒険に出ます（web版）",
];

const parsers = [intl, tiny, budoux, kuromoji, wakachigaki, sudachi];

type Result = {
	text: string;
	results: Array<{
		method: string;
		output: string;
	}>;
};

const parseText = async (text: string): Promise<Result> => {
	const results = await Promise.all(
		parsers.map(async (parser) => {
			const result = await parser.parse(text);
			return {
				method: parser.name,
				output: result.join("|"),
			};
		}),
	);
	return {
		text,
		results,
	};
};

const main = async () => {
	const results = await Promise.all(texts.map(parseText));
	const path = new URL("./result.json", import.meta.url).pathname;
	await Deno.writeTextFile(path, JSON.stringify(results, null, 2));
};

main();
