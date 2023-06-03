import { GptChatMessage } from "./gptChatMessage";

export type GptChoice = {
	message: GptChatMessage;
	finnish_reason: string;
	index: number;
};
