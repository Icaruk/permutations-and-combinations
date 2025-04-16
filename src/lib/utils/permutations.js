/**
 * Calcula el factorial de un número
 * @param {number} n - Número para calcular el factorial
 * @returns {number} - Resultado del factorial
 */
export function factorial(n) {
	if (n === 0 || n === 1) return 1;
	return n * factorial(n - 1);
}

/**
 * Genera todas las permutaciones con repetición
 * @param {string[]} chars - Caracteres a permutar
 * @param {number} length - Longitud de cada permutación
 * @returns {string[]} - Array con todas las permutaciones
 */
export function generatePermutationsWithRepetition(chars, length) {
	const result = [];

	function generate(current, remaining) {
		if (remaining === 0) {
			result.push(current);
			return;
		}

		for (let i = 0; i < chars.length; i++) {
			generate(current + chars[i], remaining - 1);
		}
	}

	generate("", length);
	return result;
}

/**
 * Genera todas las permutaciones sin repetición
 * @param {string[]} chars - Caracteres a permutar
 * @param {number} length - Longitud de cada permutación
 * @returns {string[]} - Array con todas las permutaciones
 */
export function generatePermutationsWithoutRepetition(chars, length) {
	const result = [];

	function generate(current) {
		if (current.length === length) {
			result.push(current.join(""));
			return;
		}

		for (let i = 0; i < chars.length; i++) {
			if (!current.includes(chars[i])) {
				generate([...current, chars[i]]);
			}
		}
	}

	generate([]);
	return result;
}

/**
 * Calcula el número total de permutaciones posibles
 * @param {number} charsLength - Número de caracteres disponibles
 * @param {number} permLength - Longitud de cada permutación
 * @param {boolean} withRepetition - Si se permiten repeticiones
 * @returns {number} - Número total de permutaciones
 */
export function calculateTotalPermutations(
	charsLength,
	permLength,
	withRepetition,
) {
	if (withRepetition) {
		return Math.pow(charsLength, permLength);
	} else {
		if (permLength > charsLength) return 0;
		return factorial(charsLength) / factorial(charsLength - permLength);
	}
}
