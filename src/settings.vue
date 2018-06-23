<template>
	<div :class="[ 'settings', activeClass ]">
		<v-Button
			:tooltip="tooltip"
			:tooltip-position="'toRight'"
			:class-name="'settings-button'"
			:disabled="disabled"
			:execute="handleClick">Settings</v-Button>

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
					<v-Button
						:disabled="disabled"
						:tooltip="tooltip"
						:execute="handleAdd">Add ship type</v-Button>
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

						<v-Button
							:disabled="disabled"
							:tooltip="tooltip"
							:execute="() => handleRemove( index )">X</v-Button>
					</li>
				</ul>
			</div>

			<p>
				<v-Button
					:disabled="disabled"
					:tooltip="tooltip"
					:type="'submit'">Set settings</v-Button>

				<v-Button
					:disabled="disabled"
					:tooltip="tooltip"
					:execute="reset">Reset default</v-Button>
			</p>
		</form>
	</div>
</template>

<script>
	import Button from './button.vue';

	const defaultSettings = {
		size: 10,
		shipsSchema: { 1: 4, 2: 3, 3: 2, 4: 1 }
	};

	export default {
		components: {
			'v-Button': Button
		},

		props: {
			disabled: {
				type: Boolean,
				default: false
			},
			tooltip: {
				type: String,
				default: ''
			},
			settings: {
				type: Object,
				default: () => defaultSettings
			},
			onChange: {
				type: Function,
				default: () => {}
			}
		},

		data() {
			return {
				isOpened: false,
				size: 0,
				shipTypes: [],
			};
		},

		computed: {
			activeClass() {
				return this.isOpened ? 'active' : '';
			},
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

			this.size = this.settings.size;
			this.shipTypes = schemaToTypes( this.settings.shipsSchema );
		},

		methods: {
			handleSubmit( evt ) {
				evt.preventDefault();

				this.onChange( {
					size: this.size,
					shipsSchema: shipsToSchema( this.shipTypes )
				} );

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
			},

			reset() {
				this.size = defaultSettings.size;
				this.shipTypes = schemaToTypes( defaultSettings.shipsSchema );
			}
		}
	};

	function schemaToTypes( shipsSchema ) {
		return Object.keys( shipsSchema ).reduce( ( result, key ) => {
			result.push( [ key, shipsSchema[ key ] ] );

			return result;
		}, [] );
	}

	function shipsToSchema( shipTypes ) {
		return shipTypes.reduce( ( result, value ) => {
			result[ value[ 0 ] ] = value[ 1 ];
			return result;
		}, {} );
	}
</script>

<style>
	.settings {
		position: relative;
		z-index: 10;

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
			background: var( --battleships-background-color );
			padding: 20px;
			outline: 0;
			transform: translateY( -1px );
			box-shadow: rgba(0,0,0,0.3) 0px 5px 15px;

			& > p {
				margin: 20px 0 0;
				display: flex;
				justify-content: space-between;
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
