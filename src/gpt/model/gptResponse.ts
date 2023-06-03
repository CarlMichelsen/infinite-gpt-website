import { GptChoice } from "./gptChoice";
import { GptModel } from "./gptModel";
import { GptUsage } from "./gptUsage";

export type GptResponse = {
	id: string;
	object: object;
	created: number;
	model: GptModel;
	usage: GptUsage;
	choices: GptChoice[];
};
