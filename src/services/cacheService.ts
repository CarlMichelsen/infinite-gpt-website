type CacheValue<T> = {
	encodedValue: T;
	recorded: number; // epoch
	ttlMinutes: number;
};

export class CacheService {
	private static _cache: { [key: string]: CacheValue<object | string> } = {};

	public static registerCacheValue<T extends object | string>(
		key: string,
		value: T,
		ttlMinutes: number
	): void {
		const encodedValue = value;
		const cacheValue: CacheValue<T> = {
			encodedValue,
			ttlMinutes,
			recorded: Date.now(),
		};
		CacheService._cache[key] = cacheValue;
	}

	public static getCachedValue<T extends object | string>(
		key: string
	): T | null {
		const value = CacheService._cache[key] ?? null;
		if (!value) return null;

		const recordedDiff = Date.now() - value.recorded;
		if (recordedDiff / 60 > value.ttlMinutes) {
			delete CacheService._cache[key];
			return null;
		}

		const decodedValue = value.encodedValue as T;

		return decodedValue ?? null;
	}
}
