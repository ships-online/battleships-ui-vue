<template>
	<form
		v-if="isVisible"
		class="game-settings"
		@submit="handleSubmit">
		<div>
			<label for="set-size">Battlefield size:</label>
			<input
				id="set-size"
				v-model.number="size"
				type="number"
				min="2">
		</div>

		<div>
			<p>
				Ships schema
				<button
					type="button"
					@click="handleAdd">Add</button>
			</p>
			<ul>
				<li
					v-for="( type, index ) in shipTypes"
					:key="index">
					<label :for="'ship-length-' + index">Ship length</label>
					<input
						v-model.number="type[ 0 ]"
						:id="'ship-length-' + index"
						:max="size"
						type="number"
						min="1"> -

					<label :for="'ship-number-' + index">Number of ships</label>
					<input
						v-model.number="type[ 1 ]"
						:id="'ship-number-' + index"
						type="number"
						min="1">

					<button
						type="button"
						@click="() => handleRemove( index )">X</button>
				</li>
			</ul>
		</div>

		<p><button type="submit">Set settings</button></p>
	</form>
</template>

<script>
	export default {
		data() {
			return {
				size: 10,
				shipTypes: [ [ 1, 4 ], [ 2, 3 ], [ 3, 2 ], [ 4, 1 ] ]
			};
		},

		computed: {
			isVisible() {
				return this.$parent.isVisible;
			}
		},

		methods: {
			handleSubmit( evt ) {
				evt.preventDefault();

				const ships = this.shipTypes.reduce( ( result, value ) => {
					result[ value[ 0 ] ] = value[ 1 ];
					return result;
				}, {} );

				this.$parent.onChange( this.size, ships );
			},

			handleRemove( index ) {
				this.shipTypes.splice( index, 1 );
			},

			handleAdd() {
				this.shipTypes.push( [ 0, 0 ] );
			}
		}
	};
</script>

<style>
	.game-settings {
		position: absolute;
		top: 27px;
		right: 10px;
		text-align: left;
		border: solid 1px #9c9c9c;
		background: #fff;
		max-width: 350px;
		padding: 20px;
	}

	.game-settings > p {
		margin-bottom: 0;
	}

	.game-settings input {
		font-size: 16px;
		width: 40px;
		text-align: center;
	}

	.game-settings ul,
	.game-settings li {
		list-style: none;
		padding: 0;
		margin: 0;
	}
</style>
