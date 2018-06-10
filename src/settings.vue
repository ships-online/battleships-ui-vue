<template>
	<div :class="[ 'settings', activeClass ]">
		<v-button
			:tooltip="tooltip"
			:class-name="'settings-button'"
			:disabled="disabled"
			:execute="handleClick"
			label="Settings" />

		<form
			v-if="isOpened"
			class="settings-panel"
			tabindex="-1"
			@submit="handleSubmit"
			@keydown="handleKeydown">

			<div>
				<label for="set-size">Battlefield size:</label>
				<input
					id="set-size"
					v-model.number="size"
					:disabled="disabled"
					type="number"
					min="2">
			</div>

			<div>
				<p>
					Ships schema
					<button
						:disabled="disabled"
						type="button"
						@click="handleAdd">Add ship type</button>
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
							:disabled="disabled"
							type="number"
							min="1">

						<label :for="'ship-number-' + index">Number of ships</label>
						<input
							v-model.number="type[ 1 ]"
							:id="'ship-number-' + index"
							:disabled="disabled"
							type="number"
							min="1">

						<button
							:disabled="disabled"
							type="button"
							@click="() => handleRemove( index )">X</button>
					</li>
				</ul>
			</div>

			<p>
				<button
					:disabled="disabled"
					type="submit">Set settings</button>
			</p>
		</form>
	</div>
</template>

<script>
	import Button from './button.vue';

	export default {
		components: {
			'v-button': Button
		},

		data() {
			return {
				isOpened: false,
				size: 10,
				shipTypes: [ [ 1, 4 ], [ 2, 3 ], [ 3, 2 ], [ 4, 1 ] ]
			};
		},

		computed: {
			activeClass() {
				return this.isOpened ? 'active' : '';
			},

			disabled() {
				return this.$parent.disabled;
			},

			tooltip() {
				return this.$parent.tooltip;
			}
		},

		mounted() {
			this.$watch( 'isOpened', value => {
				if ( value ) {
					this.$el.querySelector( 'input' ).focus();
				}
			} );

			document.addEventListener( 'click', evt => {
				if ( !this.$el.contains( evt.target ) ) {
					this.isOpened = false;
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
				this.isOpened = false;
			},

			handleRemove( index ) {
				this.shipTypes.splice( index, 1 );
			},

			handleAdd() {
				this.shipTypes.push( [ 0, 0 ] );
			},

			handleKeydown( evt ) {
				if ( evt.keyCode === 27 ) {
					this.isOpened = false;
				}
			},

			handleClick() {
				this.isOpened = !this.isOpened;
			}
		}
	};
</script>

<style>
	.settings {
		.settings-button {
			position: relative;
			z-index: 1;
		}

		&.active {
			.settings-button {
				border-bottom-left-radius: 0;
				border-bottom-right-radius: 0;
			}
		}

		.settings-panel {
			position: absolute;
			right: 0;
			width: 395px;
			text-align: left;
			border: solid 1px var( --battleships-button-border-color );
			background: #fff;
			padding: 20px;
			outline: 0;
			transform: translateY( -1px );

			& > p {
				margin-bottom: 0;
			}

			input {
				font-size: 14px;
				padding: 2px 5px 3px;
				width: 48px;
				text-align: center;
			}

			button {
				font-size: 14px;
				padding: 2px 5px 3px;
			}

			ul, li {
				list-style: none;
				padding: 0;
				margin: 0;
			}

			li {
				&:not(:first-child) {
					margin-top: 4px;
				}

				input {
					margin-right: 10px;
				}
			}
		}
	}
</style>
