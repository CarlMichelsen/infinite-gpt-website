import { GptChatMessage } from "./gptChatMessage";
import { GptModel } from "./gptModel";

export type GptRequest = {
	messages: GptChatMessage[]; // Actual messages. Always send the whole conversation.
	model: GptModel; // model string.
	max_tokens: number; // limit the amount of tokens allowed per request.
	temperature: number; // 0 is boring 1 is spicy. Maybe use something in between?
	n: number; // always keep at 1 this is a literal api-cost multiplier.
};
