import { GptChatMessage } from "./model/gptChatMessage";
import { GptRequest } from "./model/gptRequest";

const messages: GptChatMessage[] = [
	{
		role: "system",
		content: `From now on only respond with valid HTML CSS and JavaScript.
			Make sure there are lots of links and javascript embedded in the HTML.`,
	},
	{
		role: "user",
		content: `Create a complex wikipedia page about current world affairs.
			Make sure to add a bunch of links in the text like wikipedia does.
			Make the page look amazing using css. Really try and do a fantastic job with the styling.
			Don't forget to add some javascript functionality`,
	},
];

export const htmlGptRequest: GptRequest = {
	messages,
	model: "gpt-4",
	max_tokens: 4097,
	temperature: 0.4,
	n: 1,
};
