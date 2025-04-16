<script>
  /**
   * @typedef {Object} FormData
   * @property {string} inputChars - Caracteres de entrada
   * @property {number} length - Longitud de cada permutación
   * @property {boolean} withRepetition - Si se permiten repeticiones
   */
  
  /** @type {string} */
  export let inputChars = '0123456789';
  
  /** @type {number} */
  export let length = 2;
  
  /** @type {boolean} */
  export let withRepetition = true;
  
  /** @type {() => void} */
  export let onGenerate;
  
  /**
   * Añade los números del 0 al 9 al textarea
   */
  function addNumbers() {
    const numbers = '0123456789';
    // Verificar si ya existen algunos de estos caracteres para no duplicarlos
    const uniqueChars = new Set(inputChars.split(''));
    
    for (const num of numbers) {
      uniqueChars.add(num);
    }
    
    inputChars = Array.from(uniqueChars).join('');
  }
  
  /**
   * Añade el abecedario al textarea
   */
  function addAlphabet() {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    // Verificar si ya existen algunos de estos caracteres para no duplicarlos
    const uniqueChars = new Set(inputChars.split(''));
    
    for (const letter of alphabet) {
      uniqueChars.add(letter);
    }
    
    inputChars = Array.from(uniqueChars).join('');
  }
  
  /**
   * Limpia el textarea de caracteres
   */
  function clearChars() {
    inputChars = '';
  }
</script>

<div class="input-section">
  <div class="form-group">
    <label for="input-chars">Caracteres:</label>
    <textarea 
      id="input-chars" 
      bind:value={inputChars} 
      placeholder="Escribe los caracteres (ej: 0123456789)"
      rows="3"
    ></textarea>
    
    <div class="button-group">
      <button type="button" class="secondary-button" on:click={clearChars}>
        Limpiar
      </button>
      <button type="button" class="secondary-button" on:click={addNumbers}>
        Añadir números 0-9
      </button>
      <button type="button" class="secondary-button" on:click={addAlphabet}>
        Añadir abecedario
      </button>
    </div>
  </div>
  
  <div class="form-group">
    <label for="length">Longitud de cada permutación:</label>
    <input 
      id="length" 
      type="number" 
      bind:value={length} 
      min="1" 
      max="10"
    />
  </div>
  
  <div class="form-group">
    <label>Modo:</label>
    <div class="radio-group">
      <label>
        <input 
          type="radio" 
          bind:group={withRepetition} 
          value={true}
        />
        Permutaciones (con repetición)
      </label>
      <label>
        <input 
          type="radio" 
          bind:group={withRepetition} 
          value={false}
        />
        Combinaciones (sin repetición)
      </label>
    </div>
    
    <div class="mode-explanation">
      {#if withRepetition}
        <p>
          <strong>Permutaciones:</strong> Los caracteres pueden repetirse en cada resultado, 
          como un candado donde cada posición puede tener cualquier dígito.
        </p>
      {:else}
        <p>
          <strong>Combinaciones:</strong> Cada carácter se usa solo una vez, 
          como sacar bolas de una bolsa sin devolverlas.
        </p>
      {/if}
    </div>
  </div>
  
  <button class="primary-button" on:click={onGenerate}>Generar Permutaciones</button>
</div>

<style>
  .input-section {
    background-color: #f5f5f5;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  input[type="text"],
  input[type="number"],
  textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
    font-family: inherit;
  }
  
  textarea {
    resize: vertical;
    min-height: 80px;
  }
  
  .button-group {
    display: flex;
    gap: 10px;
    margin-top: 10px;
    flex-wrap: wrap;
  }
  
  .radio-group {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
  }
  
  .radio-group label {
    font-weight: normal;
    display: flex;
    align-items: center;
    gap: 5px;
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
  
  .mode-explanation {
    margin-top: 10px;
    padding: 10px;
    background-color: #f0f8ff;
    border-left: 3px solid #4CAF50;
    border-radius: 4px;
  }
  
  .mode-explanation p {
    margin: 0;
    font-size: 14px;
    line-height: 1.4;
  }
  
  @media (max-width: 600px) {
    .button-group, .radio-group {
      flex-direction: column;
      gap: 5px;
    }
    
    button {
      margin-right: 0;
      margin-bottom: 5px;
    }
  }
</style>