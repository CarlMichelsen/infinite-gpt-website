import axios from "axios";
import { GptRequest } from "./model/gptRequest";
import { GptResponse } from "./model/gptResponse";
import { AppConfiguration } from "../config/appConfiguration";

export const gptRequest = async (
	rawRequest: GptRequest
): Promise<GptResponse> => {
	const baseUrl = "https://api.openai.com";
	const path = "/v1/chat/completions";

	const request = structuredClone(rawRequest);
	request.messages.forEach(
		(m) => (m.content = m.content.replace("\\t", "").trim())
	);

	const axiosResponse = await axios.post<GptResponse>(baseUrl + path, request, {
		headers: {
			Authorization: `Bearer ${AppConfiguration.instance.gptToken}`,
		},
	});

	if (axiosResponse.status !== 200) {
		throw new Error(`GPT request failed with status ${axiosResponse.status}`);
	}

	return axiosResponse.data;
};
