<script>
	export default {
		props: {
			size: {
				type: Number,
				default: 0
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
		}
	};
</script>
