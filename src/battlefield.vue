<script>
	import { getCellSize } from './utils.js';
	import Ship from './ship.vue';

	export default {
		props: {
			size: Number,
			ships: Array,
			rotateShip: Function,
			moveShip: Function
		},

		computed: {
			cellSize() {
				return getCellSize( this.size );
			},

			dimension() {
				return this.size * this.cellSize;
			}
		},

		components: {
			Ship
		}
	}
</script>
