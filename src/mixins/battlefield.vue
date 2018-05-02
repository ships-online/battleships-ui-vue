<script>
	import Ship from '../ship.vue';
	import Field from '../field.vue';
	import { toPx } from '../utils.js';

	export default {
		components: {
			Ship,
			Field
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
			cellSize: {
				type: Number,
				default: 0
			}
		},

		computed: {
			dimension() {
				return this.size * this.cellSize;
			},

			markers() {
				return this.fields.filter( field => field.isMissed || field.isHit );
			}
		},

		mounted() {
			this.$watch( 'cellSize', () => ( this.$el.style.backgroundSize = toPx( this.cellSize ) ) );
			this.$el.style.backgroundSize = toPx( this.cellSize );
		}
	};
</script>
