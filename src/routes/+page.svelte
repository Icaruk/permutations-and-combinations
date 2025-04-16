<script>
  import { onMount } from 'svelte';
  import { PermutationForm, PermutationResults } from '$lib';
  import { 
    generatePermutationsWithRepetition, 
    generatePermutationsWithoutRepetition, 
    calculateTotalPermutations 
  } from '$lib/utils/permutations.js';
  
  // Importar estilos globales
  import '$lib/styles/global.css';
  
  // Estado para los caracteres de entrada
  let inputChars = '0123456789';
  
  // Estado para el modo de permutación
  let withRepetition = true;
  
  // Resultados
  let permutations = [];
  let totalPermutations = 0;
  let length = 2; // Longitud de cada permutación
  
  // Estado para los checkboxes
  let selectedPermutations = {};
  
  /**
   * Genera las permutaciones basadas en los parámetros actuales
   */
  function handleGenerate() {
    const chars = inputChars.split('').filter(char => char.trim() !== '');
    
    // Calcular el total de permutaciones
    totalPermutations = calculateTotalPermutations(chars.length, length, withRepetition);
    
    // Verificar si hay demasiadas permutaciones
    if (totalPermutations > 1000) {
      permutations = [];
      return;
    }
    
    // Verificar si es posible generar permutaciones sin repetición
    if (!withRepetition && length > chars.length) {
      totalPermutations = 0;
      permutations = [];
      alert(`No se pueden generar permutaciones de longitud ${length} sin repetición con solo ${chars.length} caracteres.`);
      return;
    }
    
    // Generar permutaciones según el modo seleccionado
    if (withRepetition) {
      permutations = generatePermutationsWithRepetition(chars, length);
    } else {
      permutations = generatePermutationsWithoutRepetition(chars, length);
    }
    
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
  <h1>Generador de Permutaciones</h1>
  
  <PermutationForm 
    bind:inputChars
    bind:length
    bind:withRepetition
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
