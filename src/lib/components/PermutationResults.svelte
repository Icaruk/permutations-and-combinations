<script>
  import { createEventDispatcher } from 'svelte';
  
  /** @type {string[]} */
  export let permutations = [];
  
  /** @type {number} */
  export let totalPermutations = 0;
  
  /** @type {Object.<string, boolean>} */
  export let selectedPermutations = {};
  
  /** @type {number} */
  export const CHECKBOX_LIMIT = 50;
  
  const dispatch = createEventDispatcher();
  
  /**
   * Selecciona o deselecciona todas las permutaciones
   * @param {boolean} select - Si se deben seleccionar todas
   */
  function toggleSelectAll(select) {
    permutations.forEach(p => {
      selectedPermutations[p] = select;
    });
    selectedPermutations = selectedPermutations; // Trigger reactivity
    dispatch('selectionChange', selectedPermutations);
  }
  
  /**
   * Copia las permutaciones seleccionadas al portapapeles
   */
  function copySelected() {
    const selected = permutations.filter(p => selectedPermutations[p]);
    if (selected.length === 0) {
      alert('No hay permutaciones seleccionadas para copiar.');
      return;
    }
    
    navigator.clipboard.writeText(selected.join('\n'))
      .then(() => alert('Permutaciones copiadas al portapapeles.'))
      .catch(err => alert('Error al copiar: ' + err));
  }
  
  /**
   * Maneja el cambio en un checkbox
   */
  function handleCheckboxChange() {
    dispatch('selectionChange', selectedPermutations);
  }
</script>

<div class="results-section">
  <h2>Resultados</h2>
  
  <p>Hay <strong>{totalPermutations}</strong> posibles permutaciones.</p>
  
  {#if totalPermutations > 1000}
    <p class="warning">
      Hay demasiadas permutaciones para mostrar (más de 1000). 
      Intenta reducir la longitud o usar menos caracteres.
    </p>
  {:else if permutations.length > 0}
    {#if permutations.length <= CHECKBOX_LIMIT}
      <div class="actions">
        <button class="primary-button" on:click={() => toggleSelectAll(true)}>Seleccionar Todas</button>
        <button class="secondary-button" on:click={() => toggleSelectAll(false)}>Deseleccionar Todas</button>
        <button class="primary-button" on:click={copySelected}>Copiar Seleccionadas</button>
      </div>
      
      <div class="permutations-grid">
        {#each permutations as perm}
          <label class="perm-item">
            <input 
              type="checkbox" 
              bind:checked={selectedPermutations[perm]} 
              on:change={handleCheckboxChange}
            />
            {perm}
          </label>
        {/each}
      </div>
    {:else}
      <p>Hay demasiadas permutaciones para mostrar como checkboxes (más de {CHECKBOX_LIMIT}).</p>
      <div class="actions">
        <button class="primary-button" on:click={() => {
          navigator.clipboard.writeText(permutations.join('\n'))
            .then(() => alert('Todas las permutaciones copiadas al portapapeles.'))
            .catch(err => alert('Error al copiar: ' + err));
        }}>Copiar Todas</button>
      </div>
      <div class="permutations-list">
        {#each permutations as perm}
          <div>{perm}</div>
        {/each}
      </div>
    {/if}
  {/if}
</div>

<style>
  .results-section {
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
  }
  
  .permutations-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 10px;
    margin-top: 20px;
  }
  
  .perm-item {
    display: flex;
    align-items: center;
    gap: 5px;
    font-weight: normal;
  }
  
  .permutations-list {
    max-height: 300px;
    overflow-y: auto;
    border: 1px solid #ddd;
    padding: 10px;
    margin-top: 10px;
    column-count: 3;
  }
  
  .actions {
    margin-bottom: 15px;
  }
  
  .warning {
    color: #ff6b6b;
    font-weight: bold;
  }
  
  button {
    border: none;
    padding: 10px 15px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    margin-right: 10px;
    transition: background-color 0.2s;
  }
  
  .primary-button {
    background-color: #4CAF50;
    color: white;
  }
  
  .primary-button:hover {
    background-color: #45a049;
  }
  
  .secondary-button {
    background-color: #f0f0f0;
    color: #333;
    border: 1px solid #ddd;
  }
  
  .secondary-button:hover {
    background-color: #e0e0e0;
  }
</style>