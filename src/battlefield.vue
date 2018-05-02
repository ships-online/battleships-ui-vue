<script>
	import { getCellSize } from './utils.js';
	import Ship from './ship.vue';

	export default {
		components: {
			Ship
		},

		props: {
			size: {
				type: Number,
				default: 0
			},
			ships: {
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
			}
		},

		computed: {
			cellSize() {
				return getCellSize( this.size );
			},

			dimension() {
				return this.size * this.cellSize;
			}
		}
	};
</script>
