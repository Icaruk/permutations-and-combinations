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
 * Genera todas las combinaciones con repetición
 * @param {string[]} chars - Caracteres a combinar
 * @param {number} length - Longitud de cada combinación
 * @returns {string[]} - Array con todas las combinaciones
 */
export function generateCombinationsWithRepetition(chars, length) {
	const result = [];

	function generate(current, start) {
		if (current.length === length) {
			result.push(current.join(""));
			return;
		}

		for (let i = start; i < chars.length; i++) {
			generate([...current, chars[i]], i);
		}
	}

	generate([], 0);
	return result;
}

/**
 * Genera todas las combinaciones sin repetición
 * @param {string[]} chars - Caracteres a combinar
 * @param {number} length - Longitud de cada combinación
 * @returns {string[]} - Array con todas las combinaciones
 */
export function generateCombinationsWithoutRepetition(chars, length) {
	const result = [];

	function generate(current, start) {
		if (current.length === length) {
			result.push(current.join(""));
			return;
		}

		for (let i = start; i < chars.length; i++) {
			generate([...current, chars[i]], i + 1);
		}
	}

	generate([], 0);
	return result;
}

/**
 * Calcula el número total de permutaciones o combinaciones posibles
 * @param {number} charsLength - Número de caracteres disponibles
 * @param {number} length - Longitud de cada resultado
 * @param {string} operationType - Tipo de operación
 * @returns {number} - Número total de resultados
 */
export function calculateTotalPermutations(charsLength, length, operationType) {
	if (operationType === "permutation-with-repetition") {
		return Math.pow(charsLength, length);
	} else if (operationType === "permutation-without-repetition") {
		if (length > charsLength) return 0;
		return factorial(charsLength) / factorial(charsLength - length);
	} else if (operationType === "combination-with-repetition") {
		return (
			factorial(charsLength + length - 1) /
			(factorial(length) * factorial(charsLength - 1))
		);
	} else if (operationType === "combination-without-repetition") {
		if (length > charsLength) return 0;
		return (
			factorial(charsLength) /
			(factorial(length) * factorial(charsLength - length))
		);
	}
	return 0;
}
