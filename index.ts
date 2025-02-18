import * as intl from "./1-intl-segmenter.ts";
import * as tiny from "./2-tiny-segmenter.ts";
import * as budoux from "./3-budoux.ts";
import * as kuromoji from "./4-kuromoji.ts";
import * as wakachigaki from "./5-wakachigaki.ts";
import * as sudachi from "./6-sudachi.ts";
import * as llm from "./7-llm.ts";

// ダミーのサンプルタイトルです
const texts = [
	"転生してAIになりましたが、スローライフは120秒で飽きました",
	"異世界クラウドサーバー～魔法があれば量子コンピュータ開発なんて楽勝じゃない？～",
	"劣等OSの建国録〜コンパイラとデバッガは、魔法と剣術を凌駕し得るか？〜",
	"【書籍化決定】CTOの息子はリストラされる～才能がないので全部捨ててプログラマーになります～",
	"フルスタックエンジニアーズ!!　転生したら小学生でした。家に居づらいのでAIおばあちゃんと仮想空間に旅立ちます（web版）",
];

const parsers = [intl, tiny, budoux, kuromoji, wakachigaki, sudachi, llm];

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
