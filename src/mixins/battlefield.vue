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
			this.$watch( 'cellSize', () => ( this.$el.style.backgroundSize = toPx( this.cellSize ) ) );
			this.$el.style.backgroundSize = toPx( this.cellSize );
		}
	};
</script>
