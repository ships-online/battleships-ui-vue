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
				background-position: -1px -1px;
				background-size: ${ toPx( size ) };
				background-image:
					linear-gradient( to right, var( --battleships-field-grid-color ) 1px, transparent 1px ),
					linear-gradient( to bottom, var( --battleships-field-grid-color ) 1px, transparent 1px );
			}
		`;
	}
</script>

<style>
	.battlefield {
		padding: 0 1px 1px 0;
		transition: opacity .5s;

		&.inactive {
			opacity: .2;
		}
	}
</style>
