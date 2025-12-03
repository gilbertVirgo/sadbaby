// Helper functions to safely access localStorage with expiration
const ONE_HOUR = 60 * 60 * 1000; // 1 hour in milliseconds

export const getStoredData = (storageKey) => {
	try {
		if (typeof window !== "undefined") {
			const saved = localStorage.getItem(storageKey);
			if (saved) {
				const { data, timestamp } = JSON.parse(saved);
				const now = Date.now();

				// Check if data is expired (older than 1 hour)
				if (now - timestamp > ONE_HOUR) {
					localStorage.removeItem(storageKey);
					return null;
				}

				return data;
			}
		}
	} catch (e) {
		console.warn("localStorage access denied:", e);
	}
	return null;
};

export const setStoredData = (storageKey, data) => {
	try {
		if (typeof window !== "undefined") {
			const dataWithTimestamp = {
				data,
				timestamp: Date.now(),
			};
			localStorage.setItem(storageKey, JSON.stringify(dataWithTimestamp));
		}
	} catch (e) {
		console.warn("localStorage access denied:", e);
	}
};

export const getStoredStep = (stepKey) => {
	try {
		if (typeof window !== "undefined") {
			const saved = localStorage.getItem(stepKey);
			if (saved) {
				return parseInt(saved, 10);
			}
		}
	} catch (e) {
		console.warn("localStorage access denied:", e);
	}
	return 0;
};

export const setStoredStep = (stepKey, step) => {
	try {
		if (typeof window !== "undefined") {
			localStorage.setItem(stepKey, step.toString());
		}
	} catch (e) {
		console.warn("localStorage access denied:", e);
	}
};

export const clearStoredData = (storageKey, stepKey) => {
	try {
		if (typeof window !== "undefined") {
			localStorage.removeItem(storageKey);
			if (stepKey) {
				localStorage.removeItem(stepKey);
			}
		}
	} catch (e) {
		console.warn("localStorage access denied:", e);
	}
};
