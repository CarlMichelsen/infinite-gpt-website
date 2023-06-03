type CacheValue = {
	encodedValue: string;
	recorded: number; // epoch
	ttlMinutes: number;
};

export class CacheService {
	private static _cache: { [key: string]: CacheValue } = {};

	public static registerCacheValue<T>(
		key: string,
		value: T,
		ttlMinutes: number
	): void {
		const encodedValue = atob(JSON.stringify(value));
		const cacheValue: CacheValue = {
			encodedValue,
			ttlMinutes,
			recorded: Date.now(),
		};
		CacheService._cache[key] = cacheValue;
	}

	public static getCachedValue<T>(key: string): T | null {
		const value = CacheService._cache[key] ?? null;
		if (!value) return null;

		const recordedDiff = Date.now() - value.recorded;
		if (recordedDiff / 60 > value.ttlMinutes) {
			delete CacheService._cache[key];
			return null;
		}

		const decodedValue = JSON.parse(btoa(value.encodedValue)) as T;

		return decodedValue ?? null;
	}
}
