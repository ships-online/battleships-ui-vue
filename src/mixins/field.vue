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

<style rel="stylesheet/postcss">
	.field {
		border: solid 1px var(--battleships-field-border-color);
		background-color: var( --battleships-field-background-color );
		position: relative;
		padding: 10px;
	}
</style>
