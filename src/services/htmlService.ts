import { gptRequest } from "../gpt/gptClient";
import { htmlGptRequest } from "../gpt/htmlGptRequest";
import { GptChatMessage } from "../gpt/model/gptChatMessage";
import { GptChoice } from "../gpt/model/gptChoice";
import { GptRequest } from "../gpt/model/gptRequest";
import { GptResponse } from "../gpt/model/gptResponse";
import { CacheService } from "./cacheService";
import { example } from "../testdata/example";

const choiceSort = (a: GptChoice, b: GptChoice): number => {
	return a.index - b.index;
};

const requestWithPreviousHtml = async (
	baseRequest: GptRequest,
	previousHtml: string,
	linkId: string
): Promise<GptRequest> => {
	const message: GptChatMessage = {
		role: "assistant",
		content: previousHtml,
	};
	baseRequest.messages.push(message);

	const systemMessage: GptChatMessage = {
		role: "system",
		content: `The user clicked the this link on the page "${linkId}".`,
	};
	baseRequest.messages.push(systemMessage);

	const userMessage: GptChatMessage = {
		role: "user",
		content: `Generate a very detailed page based on the link that i clicked!`,
	};
	baseRequest.messages.push(userMessage);

	return baseRequest;
};

const getLatestAssistantResponse = (res: GptResponse): string | null => {
	const sortedChoices = res.choices.sort(choiceSort);
	const lastChoice = sortedChoices.at(-1);
	return lastChoice?.message.content ?? null;
};

export const replaceAnchorHref = (html: string): string => {
	const anchorTagHrefRegex = /<a[^>]*href="([^"]*)"/g;
	const matches = html.matchAll(anchorTagHrefRegex);
	for (const match of matches) {
		const url = match[1] as string;
		const replacementUrl = `/${encodeURIComponent(url)}`;
		html = html?.replace(url, replacementUrl);
	}
	return html;
};

export const htmlGenerator = async (
	sessionId: string,
	linkId: string | null,
	useTestData = false
): Promise<string | null> => {
	let baseRequest = structuredClone(htmlGptRequest);
	const previousHtml = CacheService.getCachedValue<string>(sessionId);

	if (previousHtml && !linkId) {
		return previousHtml;
	}

	if (previousHtml && linkId) {
		baseRequest = await requestWithPreviousHtml(
			baseRequest,
			previousHtml,
			linkId
		);
	}

	if (useTestData) return replaceAnchorHref(example);

	console.log("REQUEST", baseRequest);
	const gptResponse = await gptRequest(baseRequest);
	const html = getLatestAssistantResponse(gptResponse);
	if (!html) return null;

	const twentyFourHours = 60 * 24;
	CacheService.registerCacheValue<string>(sessionId, html, twentyFourHours);

	return replaceAnchorHref(html);
};
