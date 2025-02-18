import { createOpenAI } from "npm:@ai-sdk/openai@1.1.11";
import { generateObject } from "npm:ai@4.1.41";
import { z } from "npm:zod@3.24.2";

const system_message = `
# グランドルール

- 指定された小説のタイトルを分割してください。
- 下記のルールーを全て満たすように分割してください。

## ルール1

- 出力は、半角スペースで区切られた文字列の配列である必要があります。
- 全ての文字列を連結すると、入力例と完全に一致する必要があります。

入力例: "転移したらバグだらけのダンジョンだった。反動で攻略よりもデバッグを選びました。"
回答例: ["転移", "したら", "バグ", "だらけ", "の", "ダンジョン", "だった", "。", "反動", "で", "攻略", "よりも", "デバッグ", "を", "選びました", "。"],

## ルール2

- 区切る範囲は、最低限の意味を持つ文脈の単位である必要があります。
- "【書籍化】"や "（旧題）", "（web版）"といった、タイトルに無関係の装飾文字列はそのまま出力してください。

入力例: "クラウド転生～元SEが家族の為にインフラ整備しますが何か？～【web版】"
回答例: ["クラウド", "転生", "～", "元SE", "が", "家族", "の", "為に", "インフラ整備", "します", "が", "何か", "？", "～", "【web版】"],

`;

const execute = async (input: string, apiKey: string) =>
  await generateObject({
    model: createOpenAI({ apiKey })("gpt-4o-mini"),
    schema: z.object({
      input: z.string(),
      output: z.array(z.string()),
    }),
    messages: [
      { role: "system", content: system_message },
      {
        role: "user",
        content: input,
      },
    ],
  });

export const name = "llm (OpenAI GPT-4o Mini)";

export const parse = async (text: string): Promise<string[]> => {
  const result = await execute(text, Deno.env.get("OPENAI_API_KEY") || "");
  return result.object.output;
};
