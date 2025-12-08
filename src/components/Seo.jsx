export default ({ title, description, canonical, image, schemaMarkup }) => {
	// Update document title
	if (title) {
		document.title = title;
	}

	// Update meta description
	const updateMeta = (name, content) => {
		let element = document.querySelector(`meta[name="${name}"]`);
		if (!element) {
			element = document.createElement("meta");
			element.setAttribute("name", name);
			document.head.appendChild(element);
		}
		element.setAttribute("content", content);
	};

	// Update Open Graph meta
	const updateOGMeta = (property, content) => {
		let element = document.querySelector(`meta[property="${property}"]`);
		if (!element) {
			element = document.createElement("meta");
			element.setAttribute("property", property);
			document.head.appendChild(element);
		}
		element.setAttribute("content", content);
	};

	if (description) {
		updateMeta("description", description);
		updateOGMeta("og:description", description);
	}

	if (title) {
		updateOGMeta("og:title", title);
	}

	if (image) {
		updateOGMeta("og:image", image);
	}

	if (canonical) {
		let link = document.querySelector("link[rel='canonical']");
		if (!link) {
			link = document.createElement("link");
			link.rel = "canonical";
			document.head.appendChild(link);
		}
		link.href = canonical;
	}

	// Add structured data / JSON-LD schema markup
	if (schemaMarkup) {
		let script = document.querySelector(
			"script[type='application/ld+json']"
		);
		if (!script) {
			script = document.createElement("script");
			script.type = "application/ld+json";
			document.head.appendChild(script);
		}
		script.textContent = JSON.stringify(schemaMarkup);
	}

	return null;
};
