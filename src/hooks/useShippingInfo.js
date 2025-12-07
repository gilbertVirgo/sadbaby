import { useState, useEffect } from "react";

export const useShippingInfo = () => {
	const [shippingInfo, setShippingInfo] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchShippingInfo = async () => {
			try {
				setLoading(true);
				const response = await fetch(
					"/.netlify/functions/getShippingOptions"
				);

				if (!response.ok) {
					throw new Error("Failed to fetch shipping options");
				}

				const data = await response.json();
				setShippingInfo(data);
				setError(null);
			} catch (err) {
				console.error("Error fetching shipping info:", err);
				setError(err.message);
				setShippingInfo(null);
			} finally {
				setLoading(false);
			}
		};

		fetchShippingInfo();
	}, []);

	return { shippingInfo, loading, error };
};
