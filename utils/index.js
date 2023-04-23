/**
 * Checks if a given URL is a valid image URL with the extensions png, jpg, jpeg, bmp, gif, or webp.
 *
 * @param {string} url - The URL to check.
 * @returns {boolean} - True if the URL is a valid image URL, false otherwise.
 */
export const checkImageURL = (url) => {
	if (!url) {
		// If the URL is falsy (null, undefined, empty string, etc.), return false.
		return false
	} else {
		// Use a regular expression to test if the URL has a valid image file extension.
		const pattern = new RegExp(
			'^https?:\\/\\/.+\\.(png|jpg|jpeg|bmp|gif|webp)$',
			'i'
		)
		return pattern.test(url)
	}
}
