<script>
	import Ship from './ship.vue';
	import { toPx } from './utils.js';

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
			},
			cellSize: {
				type: Number,
				default: 0
			}
		},

		computed: {
			dimension() {
				return this.size * this.cellSize;
			}
		},

		mounted() {
			this.$watch( 'cellSize', () => ( this.$el.style.backgroundSize = toPx( this.cellSize ) ) );
			this.$el.style.backgroundSize = toPx( this.cellSize );
		}
	};
</script>
