<script>
	import Player from 'battleships-core/src/player.js';
	import Ship from '../ship.vue';
	import MarkerField from '../markerfield.vue';
	import Field from './field.vue';
	import { toPx } from '../utils.js';

	export default {
		components: {
			Ship,
			MarkerField
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
			player: {
				type: Player,
				default: () => {}
			},
			isActive: {
				type: Boolean,
				default: () => {}
			}
		},

		mounted() {
			this.$watch( 'cellSize', () => ( this.$el.style.backgroundSize = toPx( this.cellSize ) ) );
			this.$el.style.backgroundSize = toPx( this.cellSize );
		}
	};
</script>
