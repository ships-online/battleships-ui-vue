<template>
	<div class="settings">
		<button @click="handleClick">Settings</button>
		<form
			v-if="isVisible"
			class="settings-panel"
			tabindex="-1"
			@submit="handleSubmit"
			@keydown="handleKeydown">
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
	</div>
</template>

<script>
	export default {
		data() {
			return {
				isVisible: false,
				size: 10,
				shipTypes: [ [ 1, 4 ], [ 2, 3 ], [ 3, 2 ], [ 4, 1 ] ]
			};
		},

		mounted() {
			this.$watch( 'isVisible', value => {
				if ( value ) {
					this.$el.querySelector( 'input' ).focus();
				}
			} );
		},

		methods: {
			handleSubmit( evt ) {
				evt.preventDefault();

				const ships = this.shipTypes.reduce( ( result, value ) => {
					result[ value[ 0 ] ] = value[ 1 ];
					return result;
				}, {} );

				this.$parent.onChange( this.size, ships );
				this.isVisible = false;
			},

			handleRemove( index ) {
				this.shipTypes.splice( index, 1 );
			},

			handleAdd() {
				this.shipTypes.push( [ 0, 0 ] );
			},

			handleKeydown( evt ) {
				if ( evt.keyCode === 27 ) {
					this.isVisible = false;
				}
			},

			handleClick() {
				this.isVisible = !this.isVisible;
			}
		}
	};
</script>

<style>
	.settings-panel {
		position: absolute;
		right: 0;
		text-align: left;
		border: solid 1px #9c9c9c;
		background: #fff;
		padding: 20px;
		outline: 0;
		width: 350px;
	}

	.settings-panel > p {
		margin-bottom: 0;
	}

	.settings-panel input {
		font-size: 16px;
		width: 40px;
		text-align: center;
	}

	.settings-panel button {
		font-size: 16px;
	}

	.settings-panel ul,
	.settings-panel li {
		list-style: none;
		padding: 0;
		margin: 0;
	}
</style>
