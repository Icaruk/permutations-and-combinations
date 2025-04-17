<script>
	import { PermutationForm, PermutationResults } from "$lib";
	import {
		calculateTotalPermutations,
		generateCombinationsWithRepetition,
		generateCombinationsWithoutRepetition,
		generatePermutationsWithRepetition,
		generatePermutationsWithoutRepetition,
	} from "$lib/utils/permutations.js";
	import { onMount } from "svelte";

	// Importar estilos globales
	import "$lib/styles/global.css";

	// Estado para los caracteres de entrada
	let inputChars = "0123456789";

	// Estado para el tipo de operación
	let operationType = "permutation-with-repetition";

	// Resultados
	let permutations = [];
	let totalPermutations = 0;
	let length = 2; // Longitud de cada resultado

	// Constantes
	const MAX_DISPLAY_LIMIT = 1000;
	const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER;

	/**
	 * Formatea un número con separadores de miles
	 * @param {number} num - Número a formatear
	 * @returns {string} - Número formateado
	 */
	function formatNumber(num) {
		return num.toLocaleString("es-ES");
	}

	// Estado para los checkboxes
	let selectedPermutations = {};

	/**
	 * Genera las permutaciones o combinaciones basadas en los parámetros actuales
	 */
	function handleGenerate() {
		const chars = inputChars.split("").filter(char => char.trim() !== "");

		// Calcular el total de resultados
		totalPermutations = calculateTotalPermutations(chars.length, length, operationType);

		// Verificar si hay demasiados resultados
		if (totalPermutations > MAX_DISPLAY_LIMIT) {
			// Si el número es demasiado grande, lo formateamos
			if (totalPermutations >= MAX_SAFE_INTEGER) {
				totalPermutations = "más de " + formatNumber(MAX_SAFE_INTEGER);
			} else {
				totalPermutations = formatNumber(totalPermutations);
			}
			permutations = [];
			return;
		}

		// Verificar si es posible generar los resultados sin repetición
		if ((operationType === "permutation-without-repetition" || operationType === "combination-without-repetition") && length > chars.length) {
			totalPermutations = 0;
			permutations = [];
			const tipoOperacion = operationType.startsWith("permutation") ? "permutaciones" : "combinaciones";
			alert(`No se pueden generar ${tipoOperacion} de longitud ${length} sin repetición con solo ${chars.length} caracteres.`);
			return;
		}

		// Generar resultados según el tipo de operación seleccionado
		if (operationType === "permutation-with-repetition") {
			permutations = generatePermutationsWithRepetition(chars, length);
		} else if (operationType === "permutation-without-repetition") {
			permutations = generatePermutationsWithoutRepetition(chars, length);
		} else if (operationType === "combination-with-repetition") {
			permutations = generateCombinationsWithRepetition(chars, length);
		} else if (operationType === "combination-without-repetition") {
			permutations = generateCombinationsWithoutRepetition(chars, length);
		}

		// Formatear el número total de resultados
		totalPermutations = formatNumber(totalPermutations);
		
		// Reiniciar selecciones
		selectedPermutations = {};
	}

	/**
	 * Maneja cambios en la selección de permutaciones
	 * @param {CustomEvent} event - Evento con los datos de selección
	 */
	function handleSelectionChange(event) {
		selectedPermutations = event.detail;
	}

	// Generar permutaciones iniciales
	onMount(() => {
		handleGenerate();
	});
</script>

<main class="container">
	<h1>Generador de Permutaciones y Combinaciones</h1>

	<PermutationForm
		bind:inputChars
		bind:length
		bind:operationType
		onGenerate={handleGenerate}
	/>

	<PermutationResults
		{permutations}
		{totalPermutations}
		bind:selectedPermutations
		on:selectionChange={handleSelectionChange}
	/>
</main>

<style>
	h1 {
		text-align: center;
		margin-bottom: 30px;
	}
</style>