import dotenv from "dotenv";

export class AppConfiguration {
	private static _instance: AppConfiguration | null = null;

	public static get instance(): AppConfiguration {
		if (!this._instance) {
			dotenv.config();
			this._instance = new AppConfiguration();
		}
		return this._instance;
	}

	public gptToken: string = this.getConfigurationValue<string>("GPT-TOKEN");

	public port: number =
		this.getConfigurationValue<number>("PORT", false) ?? 3000;

	public useTestdata: boolean =
		this.getConfigurationValue<string>("TEST", false)?.toLowerCase() ===
			"true" || false;

	private getConfigurationValue<T extends string | number>(
		key: string,
		required = true
	): T {
		const rawValue = process.env[key];
		if (rawValue == null && required) {
			throw new Error(`Required configuration value "${key}" was not found`);
		}
		return rawValue as T;
	}
}
