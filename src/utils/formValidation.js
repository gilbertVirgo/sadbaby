// UK Postcode validation regex
const UK_POSTCODE_REGEX = /^[A-Z]{1,2}\d{1,2}[A-Z]?\s?\d[A-Z]{2}$/i;

/**
 * Validates a UK postcode format
 * @param {string} postcode - The postcode to validate
 * @returns {boolean} - Whether the postcode is valid
 */
export const isValidPostcode = (postcode) => {
	if (!postcode || typeof postcode !== "string") return false;
	return UK_POSTCODE_REGEX.test(postcode.trim());
};

/**
 * Validates email format
 * @param {string} email - The email to validate
 * @returns {boolean} - Whether the email is valid
 */
export const isValidEmail = (email) => {
	if (!email || typeof email !== "string") return false;
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email.trim());
};

/**
 * Validates that a field is not empty
 * @param {string} value - The value to validate
 * @returns {boolean} - Whether the value is valid
 */
export const isRequired = (value) => {
	if (typeof value === "string") {
		return value.trim().length > 0;
	}
	return !!value;
};

/**
 * Validates field length
 * @param {string} value - The value to validate
 * @param {number} min - Minimum length
 * @param {number} max - Maximum length
 * @returns {boolean} - Whether the length is valid
 */
export const isValidLength = (value, min = 0, max = Infinity) => {
	if (!value) return min === 0;
	const length = value.trim().length;
	return length >= min && length <= max;
};

/**
 * Validates the entire delivery form
 * @param {Object} data - The form data
 * @returns {Object} - Object containing validation errors
 */
export const validateDeliveryForm = (data) => {
	const errors = {};

	// Name validation
	if (!isRequired(data.name)) {
		errors.name = "Name is required";
	} else if (!isValidLength(data.name, 2, 100)) {
		errors.name = "Name must be between 2 and 100 characters";
	}

	// Address line 1 validation
	if (!isRequired(data.address1)) {
		errors.address1 = "Address line 1 is required";
	} else if (!isValidLength(data.address1, 3, 200)) {
		errors.address1 = "Address must be between 3 and 200 characters";
	}

	// Address line 2 validation (optional but with length limit)
	if (data.address2 && !isValidLength(data.address2, 0, 200)) {
		errors.address2 = "Address line 2 must not exceed 200 characters";
	}

	// City validation
	if (!isRequired(data.city)) {
		errors.city = "Town/City is required";
	} else if (!isValidLength(data.city, 2, 100)) {
		errors.city = "Town/City must be between 2 and 100 characters";
	}

	// Postcode validation
	if (!isRequired(data.postcode)) {
		errors.postcode = "Postcode is required";
	} else if (!isValidPostcode(data.postcode)) {
		errors.postcode = "Please enter a valid UK postcode";
	}

	// Shipping validation
	if (!data.shipping) {
		errors.shipping = "Please select a shipping option";
	}

	// Email validation
	if (!isRequired(data.email)) {
		errors.email = "Email is required";
	} else if (!isValidEmail(data.email)) {
		errors.email = "Please enter a valid email address";
	}

	// Terms validation
	if (!data.terms) {
		errors.terms = "You must agree to the terms and conditions";
	}

	return errors;
};

/**
 * Validates a single field
 * @param {string} fieldName - The name of the field
 * @param {any} value - The value to validate
 * @param {Object} allData - All form data (for context-dependent validation)
 * @returns {string|null} - Error message or null if valid
 */
export const validateField = (fieldName, value, allData = {}) => {
	const errors = validateDeliveryForm({ ...allData, [fieldName]: value });
	return errors[fieldName] || null;
};
