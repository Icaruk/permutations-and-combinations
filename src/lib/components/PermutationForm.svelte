<script>
	/**
	 * @typedef {Object} FormData
	 * @property {string} inputChars - Caracteres de entrada
	 * @property {number} length - Longitud de cada permutación
	 * @property {string} operationType - Tipo de operación (permutación o combinación)
	 */

	/** @type {string} */
	export let inputChars = "0123456789";

	/** @type {number} */
	export let length = 2;

	/** @type {string} */
	export let operationType = "permutation-with-repetition";

	/** @type {() => void} */
	export let onGenerate;

	/**
	 * Añade los números del 0 al 9 al textarea
	 */
	function addNumbers() {
		const numbers = "0123456789";
		// Verificar si ya existen algunos de estos caracteres para no duplicarlos
		const uniqueChars = new Set(inputChars.split(""));

		for (const num of numbers) {
			uniqueChars.add(num);
		}

		inputChars = Array.from(uniqueChars).join("");
	}

	/**
	 * Añade el abecedario al textarea
	 */
	function addAlphabet() {
		const alphabet = "abcdefghijklmnopqrstuvwxyz";
		// Verificar si ya existen algunos de estos caracteres para no duplicarlos
		const uniqueChars = new Set(inputChars.split(""));

		for (const letter of alphabet) {
			uniqueChars.add(letter);
		}

		inputChars = Array.from(uniqueChars).join("");
	}

	/**
	 * Limpia el textarea de caracteres
	 */
	function clearChars() {
		inputChars = "";
	}
</script>

<div class="input-section">
	<div class="form-group">
		<label
			for="input-chars"
			class="main-label">Caracteres:</label
		>
		<textarea
			id="input-chars"
			bind:value={inputChars}
			placeholder="Escribe los caracteres (ej: 0123456789)"
			rows="3"
		></textarea>

		<div class="button-group">
			<button
				type="button"
				class="secondary-button"
				on:click={clearChars}
			>
				Limpiar
			</button>
			<button
				type="button"
				class="secondary-button"
				on:click={addNumbers}
			>
				Añadir números 0-9
			</button>
			<button
				type="button"
				class="secondary-button"
				on:click={addAlphabet}
			>
				Añadir abecedario
			</button>
		</div>
	</div>

	<div class="form-group">
		<label
			for="length"
			class="main-label">Longitud de cada permutación:</label
		>
		<input
			id="length"
			type="number"
			bind:value={length}
			min="1"
			max="10"
		/>
	</div>

	<div class="form-group">
		<label class="main-label">Tipo de operación:</label>
		<div class="operation-types">
			<div class="operation-category">
				<h3>Permutaciones</h3>
				<div class="radio-group">
					<label>
						<input
							type="radio"
							bind:group={operationType}
							value="permutation-with-repetition"
						/>
						Con repetición
					</label>
					<label>
						<input
							type="radio"
							bind:group={operationType}
							value="permutation-without-repetition"
						/>
						Sin repetición
					</label>
				</div>
			</div>

			<div class="operation-category">
				<h3>Combinaciones</h3>
				<div class="radio-group">
					<label>
						<input
							type="radio"
							bind:group={operationType}
							value="combination-with-repetition"
						/>
						Con repetición
					</label>
					<label>
						<input
							type="radio"
							bind:group={operationType}
							value="combination-without-repetition"
						/>
						Sin repetición
					</label>
				</div>
			</div>
		</div>

		<div class="mode-explanation">
			{#if operationType === "permutation-with-repetition"}
				<p>
					<strong>Permutaciones con repetición:</strong> El orden importa y los elementos pueden repetirse. Como un candado donde cada posición puede tener cualquier
					dígito, incluso repetido.
					<br />
					<em>Ejemplo: Con "ABC" y longitud 2, obtendrás: AA, AB, AC, BA, BB, BC, CA, CB, CC.</em>
				</p>
			{:else if operationType === "permutation-without-repetition"}
				<p>
					<strong>Permutaciones sin repetición:</strong> El orden importa pero cada elemento se usa solo una vez. Como ordenar personas en una fila donde cada posición es
					ocupada por una sola persona.
					<br />
					<em>Ejemplo: Con "ABC" y longitud 2, obtendrás: AB, AC, BA, BC, CA, CB.</em>
				</p>
			{:else if operationType === "combination-with-repetition"}
				<p>
					<strong>Combinaciones con repetición:</strong> El orden no importa y los elementos pueden repetirse. Como elegir sabores de helado donde puedes repetir el mismo
					sabor varias veces.
					<br />
					<em>Ejemplo: Con "ABC" y longitud 2, obtendrás: AA, AB, AC, BB, BC, CC.</em>
				</p>
			{:else if operationType === "combination-without-repetition"}
				<p>
					<strong>Combinaciones sin repetición:</strong> El orden no importa y cada elemento se usa solo una vez. Como seleccionar un equipo de personas donde solo
					importa quién está en el equipo, no su posición.
					<br />
					<em>Ejemplo: Con "ABC" y longitud 2, obtendrás: AB, AC, BC.</em>
				</p>
			{/if}
		</div>
	</div>

	<button
		class="primary-button"
		on:click={onGenerate}
	>
		{#if operationType.startsWith("permutation")}
			Generar Permutaciones
		{:else}
			Generar Combinaciones
		{/if}
	</button>
</div>

<style>
	.input-section {
		background-color: #f5f5f5;
		padding: 20px;
		border-radius: 8px;
		margin-bottom: 20px;
	}

	.form-group {
		margin-bottom: 30px;
	}

	label {
		display: block;
		margin-bottom: 8px;
		font-weight: bold;
		font-size: 16px;
	}

	.main-label {
		font-size: 20px;
		color: #333;
		margin-bottom: 12px;
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

	.operation-types {
		display: flex;
		gap: 30px;
		flex-wrap: wrap;
		margin-bottom: 15px;
	}

	.operation-category {
		flex: 1;
		min-width: 250px;
	}

	.operation-category h3 {
		margin-top: 0;
		margin-bottom: 12px;
		font-size: 18px;
		color: #333;
		border-bottom: 1px solid #ddd;
		padding-bottom: 8px;
	}

	.radio-group {
		display: flex;
		flex-direction: column;
		gap: 15px;
		margin-bottom: 15px;
	}

	.radio-group label {
		font-weight: normal;
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 16px;
	}

	.radio-group input[type="radio"] {
		width: 18px;
		height: 18px;
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
		background-color: #4caf50;
		color: white;
		font-size: 18px;
		padding: 12px 20px;
		margin-top: 10px;
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
		margin-top: 20px;
		padding: 15px;
		background-color: #f0f8ff;
		border-left: 4px solid #4caf50;
		border-radius: 4px;
	}

	.mode-explanation p {
		margin: 0;
		font-size: 15px;
		line-height: 1.5;
	}

	@media (max-width: 600px) {
		.button-group {
			flex-direction: column;
			gap: 5px;
		}

		.operation-types {
			flex-direction: column;
			gap: 20px;
		}

		.operation-category {
			width: 100%;
		}

		button {
			margin-right: 0;
			margin-bottom: 5px;
		}
	}
</style>
