import express from "express";
import cookieParser from "cookie-parser";
import { htmlGenerator } from "./services/htmlService";
import { randomString } from "./services/randomString";
import { AppConfiguration } from "./config/appConfiguration";
const app = express();

app.use(cookieParser());

app.get("/:href?", async (req, res) => {
	const linkHref = req.params.href ?? null;
	const sessionId: string = req.cookies.sessionId ?? randomString(32);
	if (!req.cookies.sessionId) res.cookie("sessionId", sessionId);

	console.log(`<${sessionId}> requesting...`);
	const html = await htmlGenerator(
		sessionId,
		linkHref,
		AppConfiguration.instance.useTestdata
	);
	console.log(`<${sessionId}> finnished request.`);

	res.send(html);
});

app.listen(AppConfiguration.instance.port, async () => {
	console.log(
		"Application started on",
		"port ->",
		AppConfiguration.instance.port
	);
});
