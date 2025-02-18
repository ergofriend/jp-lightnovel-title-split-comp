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

入力例: "転移したら山の中だった。反動で強さよりも快適さを選びました。"
回答例: ["転移", "したら", "山の中", "だった", "。", "反動", "で", "強さ", "よりも", "快適さ", "を", "選びました", "。"]

## ルール2

- 区切る範囲は、最低限の意味を持つ文脈の単位である必要があります。

入力例: "悪人面したB級冒険者 主人公とその幼馴染みたちのパパになる"
回答例: ["悪人面した", "B級冒険者", "主人公", "と", "その", "幼馴染み", "たち", "の", "パパ", "に", "なる"]

## ルール3

- "【書籍1巻2/25発売！】"や "（旧題：Iris Revolution Online）"といった、タイトルに無関係の装飾文字列はそのまま出力してください。

入力例: "裏稼業転生～元極道が家族の為に領地発展させますが何か？～【web版】"
回答例: ["裏稼業", "転生", "〜", "元極道", "が", "家族", "の", "為に", "領地", "発展", "させます", "が", "何か", "？", "〜", "【web版】"]

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
