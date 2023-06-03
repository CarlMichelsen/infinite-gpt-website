import { GptRole } from "./gptRole";

export type GptChatMessage = {
	role: GptRole;
	content: string;
};
