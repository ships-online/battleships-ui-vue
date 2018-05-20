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

<style>
	.field {
		border: solid 1px var(--battleships-field-border-color);
		position: relative;
		padding: 10px;
	}
</style>
