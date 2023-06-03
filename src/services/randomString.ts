export const randomString = (length: number): string => {
	let randomString = "";
	const characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for (let i = 0; i < length; i++) {
		randomString += characters.charAt(
			Math.floor(Math.random() * characters.length)
		);
	}
	return randomString;
};
