<script>
	import Ship from '../ship.vue';
	import Stamp from '../stamp.vue';
	import Field from './field.vue';
	import { toPx } from '../utils.js';

	export default {
		components: {
			Ship,
			Stamp
		},

		mixins: [ Field ],

		props: {
			ships: {
				type: Array,
				default: () => []
			},
			fields: {
				type: Array,
				default: () => []
			},
			rotateShip: {
				type: Function,
				default: () => {}
			},
			moveShip: {
				type: Function,
				default: () => {}
			},
			isActive: {
				type: Boolean,
				default: () => {}
			}
		},

		computed: {
			inactiveClass() {
				return this.isActive ? '' : 'inactive';
			}
		},

		mounted() {
			const style = document.createElement( 'style' );

			style.innerHTML = getStylesDefinition( this.cellSize );
			document.head.appendChild( style );

			this.$watch( 'cellSize', () => ( style.innerHTML = getStylesDefinition( this.cellSize ) ) );
		}
	};

	function getStylesDefinition( size ) {
		return `
			.battleships .battlefield {
				background-size: ${ toPx( size ) } ${ toPx( size ) };
				background-image:
					linear-gradient( to right, var( --battleships-field-grid-color ) 1px, transparent 1px ),
					linear-gradient( to bottom, var( --battleships-field-grid-color ) 1px, transparent 1px );
			}
		`;
	}
</script>

<style rel="stylesheet/postcss">
	.battlefield {
		padding: 0 1px 1px 0;
		transition: opacity .5s;
		background-position: -1px -1px;
	}

	.status-battle {
		.battlefield {
			outline: 1px solid var( --battleships-field-border-color );

			&.inactive {
				opacity: var( --battleships-field-inactive-opacity );
				outline-width: 0;
			}
		}
	}
</style>
